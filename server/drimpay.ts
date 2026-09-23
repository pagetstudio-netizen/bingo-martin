const DRIMPAY_API_BASE_URL = "https://drimpay.com/api/v2";

export const DRIMPAY_COUNTRY_OPERATORS: Record<string, string[]> = {
  TG: ["TMoney", "Moov Money"],
  BJ: ["MTN Mobile Money", "Moov Money"],
  CM: ["MTN MoMo", "Orange Money"],
  BF: ["Orange Money", "Moov Money"],
  ML: ["Orange Money", "Moov Money"],
  SN: ["Orange Money", "Wave"],
  CI: ["MTN", "Orange Money", "Wave", "Moov Money"],
};

const DRIMPAY_PAYOUT_OPERATOR_SLUGS: Record<string, string> = {
  tmoney: "tmoney",
  "t-money": "tmoney",
  togocel: "tmoney",
  "moov money": "moov",
  moov: "moov",
  "moov africa": "moov",
  "moov africa togo": "moov",
  "moov africa benin": "moov",
  "moov africa burkina": "moov",
  "mtn mobile money": "mtn",
  "mtn momo": "mtn",
  mtn: "mtn",
  "orange money": "orange",
  orange: "orange",
  wave: "wave",
  wizall: "wizall",
  vodacom: "vodacom",
  airtel: "airtel",
};

const DRIMPAY_PAYOUT_OPERATOR_NAMES: Record<string, string> = {
  tmoney: "TMoney",
  moov: "Moov Money",
  mtn: "MTN",
  orange: "Orange Money",
  wave: "Wave",
  wizall: "Wizall",
  vodacom: "Vodacom",
  airtel: "Airtel",
};

const DRIMPAY_COUNTRY_PHONE_PREFIXES: Record<string, string> = {
  TG: "228",
  BJ: "229",
  CM: "237",
  BF: "226",
  ML: "223",
  SN: "221",
  CI: "225",
};

export type DrimPaySettings = Record<string, string | undefined>;

export function isDrimPayConfigured(): boolean {
  return Boolean(process.env.DRIMPAY_API_KEY || process.env.DRIMPAY_LIVE_API_KEY);
}

export function getDrimPayApiKey(): string {
  return process.env.DRIMPAY_API_KEY || process.env.DRIMPAY_LIVE_API_KEY || "";
}

export function isDrimPayCountryEnabled(country: string, settings: DrimPaySettings): boolean {
  if (settings.drimpayEnabled !== "true") return false;
  const normalizedCountry = country.trim().toUpperCase();
  if (!DRIMPAY_COUNTRY_OPERATORS[normalizedCountry]) return false;
  const configuredCountries = (settings.drimpayCountries || "")
    .split(",")
    .map((value) => value.trim().toUpperCase())
    .filter(Boolean);
  return configuredCountries.length === 0 || configuredCountries.includes(normalizedCountry);
}

export function normalizeDrimPayStatus(status: unknown): string {
  return String(status || "").trim().toLowerCase().replace(/[\s-]+/g, "_");
}

export function mapDrimPayStatus(status: unknown): "approved" | "rejected" | "processing" {
  const normalized = normalizeDrimPayStatus(status);
  if (["success", "successful", "completed", "complete", "paid", "approved"].includes(normalized)) {
    return "approved";
  }
  if (["failed", "failure", "expired", "cancelled", "canceled", "reversed", "rejected"].includes(normalized)) {
    return "rejected";
  }
  return "processing";
}

export function toDrimPayPayoutOperator(operator: string): string {
  const normalized = operator.trim().toLowerCase().replace(/\s+/g, " ");
  const slug = DRIMPAY_PAYOUT_OPERATOR_SLUGS[normalized];
  if (!slug) {
    throw new Error(`Opérateur DrimPay non supporté pour le payout: ${operator}`);
  }
  return DRIMPAY_PAYOUT_OPERATOR_NAMES[slug];
}

export function toDrimPayPayoutPhone(phone: string, countryCode: string): string {
  const digits = phone.trim().replace(/\D/g, "");
  if (!digits) {
    throw new Error("Numéro du portefeuille invalide");
  }
  const prefix = DRIMPAY_COUNTRY_PHONE_PREFIXES[countryCode.trim().toUpperCase()];
  if (!prefix) {
    throw new Error(`Pays DrimPay non supporté pour le numéro: ${countryCode}`);
  }
  if (digits.startsWith(prefix)) return `+${digits}`;
  if (digits.startsWith("0")) return `+${prefix}${digits.slice(1)}`;
  return `+${prefix}${digits}`;
}

export function toDrimPayPayinOperator(operator: string): string {
  const normalized = operator.trim().toLowerCase().replace(/\s+/g, " ");
  const slug = DRIMPAY_PAYOUT_OPERATOR_SLUGS[normalized];
  if (!slug) {
    throw new Error(`Opérateur DrimPay non supporté pour le pay-in: ${operator}`);
  }
  return slug;
}

async function drimPayRequest(path: string, init: RequestInit = {}) {
  const apiKey = getDrimPayApiKey();
  if (!apiKey) {
    throw new Error("DrimPay n'est pas configuré : la clé API serveur est manquante");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    const response = await fetch(`${DRIMPAY_API_BASE_URL}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        ...(init.headers || {}),
      },
    });
    const raw = await response.text();
    let body: any = {};
    try {
      body = raw ? JSON.parse(raw) : {};
    } catch {
      body = { message: raw };
    }
    if (!response.ok) {
      throw new Error(body?.message || body?.error || `DrimPay a répondu avec HTTP ${response.status}`);
    }
    if (body?.success === false) {
      throw new Error(body.message || body.error || "DrimPay a refusé la demande");
    }
    return body;
  } finally {
    clearTimeout(timeout);
  }
}

function getPayloadData(body: any): any {
  return body?.data && typeof body.data === "object" ? body.data : body;
}

export async function initiateDrimPayPayin(params: {
  amount: number;
  currency: string;
  countryCode: string;
  operator: string;
  phone: string;
  orderId: string;
  webhookUrl: string;
  description: string;
  expiresInMinutes?: number;
}) {
  const operatorSlug = toDrimPayPayinOperator(params.operator);
  const body = await drimPayRequest("/payin/initiate", {
    method: "POST",
    body: JSON.stringify({
      amount: params.amount,
      currency: params.currency,
      country_code: params.countryCode,
      operator: operatorSlug,
      phone: params.phone,
      order_id: params.orderId,
      webhook_url: params.webhookUrl,
      description: params.description,
      expires_in_minutes: params.expiresInMinutes ?? 5,
    }),
  });
  const data = getPayloadData(body);
  const reference = String(
    data?.reference ??
    data?.payment_reference ??
    data?.transaction_reference ??
    data?.payment_id ??
    body?.reference ??
    "",
  ).trim();
  const paymentUrl = String(
    data?.checkout_url ??
    data?.payment_url ??
    data?.redirect_url ??
    data?.authorization_url ??
    data?.url ??
    body?.checkout_url ??
    body?.payment_url ??
    "",
  ).trim();
  if (!reference) {
    throw new Error("Référence DrimPay absente dans la réponse du fournisseur");
  }
  return {
    reference,
    paymentUrl: paymentUrl || null,
    status: data?.status ?? body?.status ?? "pending",
    message: data?.message ?? body?.message ?? null,
  };
}

export async function getDrimPayPayin(reference: string) {
  const body = await drimPayRequest(`/payin/${encodeURIComponent(reference)}`);
  const data = getPayloadData(body);
  return {
    status: data?.status ?? body?.status ?? "",
    reference: String(data?.reference ?? body?.reference ?? reference),
    message: data?.message ?? body?.message ?? null,
  };
}

export async function initiateDrimPayPayout(params: {
  amount: number;
  currency: string;
  countryCode: string;
  operator: string;
  phone: string;
  orderId: string;
  webhookUrl: string;
  description: string;
}) {
  const body = await drimPayRequest("/payout/initiate", {
    method: "POST",
    body: JSON.stringify({
      amount: params.amount,
      currency: params.currency,
      country_code: params.countryCode,
      operator: toDrimPayPayoutOperator(params.operator),
      phone: toDrimPayPayoutPhone(params.phone, params.countryCode),
      external_ref: params.orderId,
      webhook_url: params.webhookUrl,
      description: params.description,
    }),
  });
  const data = getPayloadData(body);
  const reference = String(
    data?.reference ??
    data?.payout_reference ??
    data?.transaction_reference ??
    body?.reference ??
    "",
  ).trim();
  if (!reference) {
    throw new Error("Référence payout DrimPay absente dans la réponse du fournisseur");
  }
  return {
    reference,
    orderId: String(data?.order_id ?? body?.order_id ?? params.orderId),
    status: data?.status ?? body?.status ?? "pending",
    gatewayReference: String(
      data?.gateway_reference ??
      data?.mno_reference ??
      body?.gateway_reference ??
      "",
    ).trim() || null,
    message: data?.message ?? body?.message ?? null,
  };
}

export async function getDrimPayPayout(reference: string) {
  const body = await drimPayRequest(`/payout/${encodeURIComponent(reference)}`);
  const data = getPayloadData(body);
  return {
    status: data?.status ?? body?.status ?? "",
    reference: String(data?.reference ?? body?.reference ?? reference),
    orderId: String(data?.order_id ?? body?.order_id ?? ""),
    gatewayReference: String(
      data?.gateway_reference ??
      data?.mno_reference ??
      body?.gateway_reference ??
      "",
    ).trim() || null,
    message: data?.message ?? body?.message ?? null,
  };
}