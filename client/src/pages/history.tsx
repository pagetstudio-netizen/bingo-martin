import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCountryByCode } from "@/lib/countries";
import { ChevronLeft, Globe2, Loader2, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

import nodataImg from "@assets/nodata-da225bbb_(1)_1783249133513.png";
import transactionIcon from "@assets/statss_1790115079661.png";

interface Deposit {
  id: number;
  userId: number;
  amount: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
  soleaspayReference?: string;
  soleaspayOrderId?: string;
  omnipayId?: string;
  omnipayReference?: string;
  sendavapayReference?: string;
}

interface Withdrawal {
  id: number;
  userId: number;
  amount: string;
  netAmount: string;
  status: string;
  createdAt: string;
  sendavapayReference?: string;
}

interface Transaction {
  id: number;
  userId: number;
  type: string;
  amount: string;
  description: string;
  createdAt: string;
}

type ActiveTab = "balance" | "deposits" | "withdrawals";

const HISTORY_RED = "#b10813";
const CARD_BACKGROUND = "#fff";

const makeRef = (prefix: "D" | "W", id: number, date: string) => {
  const d = new Date(date);
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  const seq = String(id).padStart(4, "0");
  return `sdk${yy}${mm}${dd}${hh}${min}${prefix}${seq}`;
};

const getDepositRef = (deposit: Deposit) => {
  const reference =
    deposit.sendavapayReference ||
    deposit.omnipayReference ||
    deposit.omnipayId ||
    deposit.soleaspayReference ||
    deposit.soleaspayOrderId;
  if (reference) return reference.startsWith("sdk") ? reference : `sdk${reference}`;
  return makeRef("D", deposit.id, deposit.createdAt);
};

const getWithdrawalRef = (withdrawal: Withdrawal) => {
  const reference = withdrawal.sendavapayReference;
  if (reference) return reference.startsWith("sdk") ? reference : `sdk${reference}`;
  return makeRef("W", withdrawal.id, withdrawal.createdAt);
};

const maskRef = (reference: string) =>
  reference.length <= 6 ? reference : `${reference.slice(0, 2)}****${reference.slice(-4)}`;

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`;
};

const getStatusInfo = (status: string) => {
  switch (status) {
    case "completed":
    case "approved":
      return { label: "Approuvé", color: HISTORY_RED };
    case "rejected":
      return { label: "Rejeté", color: "#b10813" };
    case "processing":
      return { label: "En traitement", color: "#b10813" };
    default:
      return { label: "En attente", color: HISTORY_RED };
  }
};

const getBalanceTypeLabel = (transaction: Transaction) => {
  switch (transaction.type) {
    case "bonus":
      return transaction.description === "Bonus quotidien"
        ? "Bonus quotidien"
        : transaction.description;
    case "signup_bonus":
      return "Bonus d'inscription";
    case "task_reward":
      return "Récompense";
    case "commission":
      return "Commission";
    case "deposit":
      return "Dépôt";
    default:
      return transaction.description;
  }
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="history-row">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

const Status = ({ label, color }: { label: string; color: string }) => (
  <span className="history-status" style={{ backgroundColor: color }}>
    {label}
  </span>
);

const TransactionIcon = () => (
  <span className="history-card-icon" aria-hidden="true">
    <img src={transactionIcon} alt="" />
  </span>
);

export default function HistoryPage() {
  const { user, refreshUser } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<ActiveTab>("withdrawals");
  const [verifyingId, setVerifyingId] = useState<number | null>(null);

  const isAdmin = !!(user as any)?.isAdmin;
  const countryInfo = user ? getCountryByCode(user.country) : null;
  const currency = countryInfo?.currency === "XOF" || countryInfo?.currency === "XAF"
    ? "FCFA"
    : countryInfo?.currency || "FCFA";

  const { data: deposits = [], isLoading: depositsLoading } = useQuery<Deposit[]>({
    queryKey: ["/api/deposits/history"],
  });

  const { data: withdrawals = [], isLoading: withdrawalsLoading } = useQuery<Withdrawal[]>({
    queryKey: ["/api/withdrawals/history"],
  });

  const { data: transactions = [], isLoading: transactionsLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  const isPendingDeposit = (deposit: Deposit) =>
    (deposit.status === "pending" || deposit.status === "processing") &&
    Boolean(
      deposit.soleaspayReference ||
      deposit.soleaspayOrderId ||
      deposit.omnipayId ||
      deposit.omnipayReference ||
      deposit.sendavapayReference,
    );

  const handleVerify = async (depositId: number) => {
    setVerifyingId(depositId);
    try {
      const response = await fetch(`/api/deposits/${depositId}/verify`, { credentials: "include" });
      const data = await response.json();
      if (data.status === "approved") {
        toast({ title: "Paiement confirmé", description: "Votre compte a été crédité" });
        refreshUser();
        queryClient.invalidateQueries({ queryKey: ["/api/deposits/history"] });
      } else if (data.status === "rejected") {
        toast({ title: "Paiement échoué", description: "Le paiement a été refusé", variant: "destructive" });
        queryClient.invalidateQueries({ queryKey: ["/api/deposits/history"] });
      } else {
        toast({ title: "En cours", description: "Le paiement est toujours en attente" });
      }
    } catch {
      toast({ title: "Erreur", description: "Impossible de vérifier le paiement", variant: "destructive" });
    } finally {
      setVerifyingId(null);
    }
  };

  if (!user) return null;

  const balanceEntries: Transaction[] = [
    ...transactions,
    {
      id: -1,
      userId: user.id,
      type: "registration",
      amount: "0",
      description: "Inscription",
      createdAt: user.createdAt,
    },
  ].sort((first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime());

  const isLoading =
    activeTab === "balance"
      ? transactionsLoading
      : activeTab === "deposits"
        ? depositsLoading
        : withdrawalsLoading;

  return (
    <main className="history-page">
      <style>{`
        .history-page {
          width: 100%;
          min-height: 100dvh;
          overflow-x: hidden;
          background: #fff8f8;
          color: #101010;
          font-family: Arial, sans-serif;
        }
        .history-page *,
        .history-page *::before,
        .history-page *::after {
          box-sizing: border-box;
        }
        .history-screen {
          width: 100%;
          max-width: 500px;
          min-height: 100dvh;
          margin: 0 auto;
          background: #fff8f8;
        }
        .history-header {
          position: relative;
          display: flex;
          height: 78px;
          align-items: center;
          padding: 8px 20px 0;
          background: #fff8f8;
        }
        .history-back {
          display: grid;
          width: 32px;
          height: 32px;
          place-items: center;
          border: 0;
          padding: 0;
          background: transparent;
          color: ${HISTORY_RED};
        }
        .history-back svg {
          width: 25px;
          height: 25px;
          stroke-width: 1.9;
        }
        .history-title {
          position: absolute;
          right: 55px;
          left: 55px;
          margin: 0;
          color: ${HISTORY_RED};
          font-size: 20px;
          font-weight: 600;
          line-height: 1;
          text-align: center;
        }
        .history-globe {
          position: absolute;
          top: 26px;
          right: 18px;
          width: 25px;
          height: 25px;
          color: ${HISTORY_RED};
          stroke-width: 1.7;
        }
        .history-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          align-items: center;
          min-height: 58px;
          padding: 0 18px;
          border-bottom: 1px solid #f1d8da;
          background: #fff8f8;
        }
        .history-tab {
          display: flex;
          min-width: 0;
          height: 52px;
          align-items: center;
          justify-content: center;
          gap: 4px;
          border: 0;
          border-radius: 0;
          padding: 0 7px;
          background: transparent;
          color: #8f7779;
          font-size: 15px;
          font-weight: 400;
          line-height: 1;
          white-space: nowrap;
        }
        .history-tab.active {
          border-bottom: 3px solid ${HISTORY_RED};
          color: ${HISTORY_RED};
          font-weight: 700;
        }
        .history-tab-arrow {
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 7px solid ${HISTORY_RED};
        }
        .history-tab-arrow.right {
          border-left-color: ${HISTORY_RED};
        }
        .history-tab-arrow.left {
          transform: rotate(180deg);
        }
        .history-content {
          min-height: calc(100dvh - 127px);
          padding: 18px 18px 40px;
          background: #fff8f8;
        }
        .history-list {
          display: grid;
          gap: 16px;
        }
        .history-card {
          width: 100%;
          min-height: 142px;
          overflow: hidden;
          border: 1px solid #f7eeee;
          border-radius: 14px;
          padding: 15px 17px 14px;
          background: ${CARD_BACKGROUND};
          box-shadow: 0 2px 10px rgba(177, 8, 19, .06);
        }
        .history-card-top {
          display: grid;
          grid-template-columns: 48px minmax(0, 1fr) auto;
          min-height: 48px;
          align-items: flex-start;
          gap: 12px;
        }
        .history-card-icon {
          display: grid;
          width: 48px;
          height: 48px;
          place-items: center;
          overflow: hidden;
          border-radius: 12px;
          background: #fff1f2;
        }
        .history-card-icon img {
          width: 34px;
          height: 34px;
          object-fit: contain;
          filter: hue-rotate(-120deg) saturate(4) brightness(.85);
        }
        .history-amount {
          margin: 0;
          color: #111;
          font-size: 19px;
          font-weight: 500;
          line-height: 1.15;
        }
        .history-card-label {
          margin: 5px 0 0;
          color: #333;
          font-size: 15px;
          line-height: 1.15;
        }
        .history-status {
          display: inline-flex;
          min-height: 30px;
          align-items: center;
          flex: 0 0 auto;
          border-radius: 15px;
          padding: 0 9px;
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          line-height: 1;
          white-space: nowrap;
        }
        .history-divider {
          height: 1px;
          margin: 13px 0 7px 60px;
          background: #f0dfe0;
        }
        .history-row {
          display: flex;
          min-height: 21px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: #413638;
          font-size: 13px;
          line-height: 1.2;
        }
        .history-row > span:last-child {
          text-align: right;
          white-space: nowrap;
        }
        .history-empty {
          display: flex;
          min-height: 280px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #999;
          font-size: 14px;
        }
        .history-empty img {
          width: 112px;
          height: 112px;
          object-fit: contain;
        }
        .history-verify {
          width: 100%;
          margin-top: 10px;
          border: 0;
          border-radius: 18px;
          padding: 9px 12px;
          background: ${HISTORY_RED};
          color: #fff;
          font-size: 12px;
          font-weight: 700;
        }
        @media (max-width: 370px) {
          .history-header { height: 70px; padding-top: 6px; }
          .history-title { font-size: 19px; }
          .history-tabs { min-height: 54px; padding-right: 12px; padding-left: 12px; }
          .history-tab { font-size: 13px; }
          .history-content { min-height: calc(100dvh - 120px); padding-right: 14px; padding-left: 14px; }
          .history-card { padding-right: 14px; padding-left: 14px; }
          .history-card-label { font-size: 15px; }
          .history-status { font-size: 12px; padding-right: 8px; padding-left: 8px; }
          .history-row { font-size: 13px; }
        }
      `}</style>

      <div className="history-screen">
        <header className="history-header">
          <Link href="/account">
            <button className="history-back" data-testid="button-back" aria-label="Retour">
              <ChevronLeft aria-hidden="true" />
            </button>
          </Link>
          <h1 className="history-title">Informations du compte</h1>
          <Globe2 className="history-globe" aria-hidden="true" />
        </header>

        <nav className="history-tabs" aria-label="Type d'enregistrement">
          <button
            className={`history-tab ${activeTab === "deposits" ? "active" : ""}`}
            onClick={() => setActiveTab("deposits")}
            data-testid="tab-deposits"
          >
            Recharge Historique
          </button>
          <button
            className={`history-tab ${activeTab === "withdrawals" ? "active" : ""}`}
            onClick={() => setActiveTab("withdrawals")}
            data-testid="tab-withdrawals"
          >
            Compte de retrait
          </button>
        </nav>

        <section className="history-content" aria-live="polite">
          {isLoading ? (
            <div className="history-empty">
              <Loader2 className="animate-spin" />
            </div>
          ) : activeTab === "balance" ? (
            balanceEntries.length > 0 ? (
              <div className="history-list">
                {balanceEntries.map((transaction) => {
                  const amount = Number.parseFloat(transaction.amount || "0");
                  const isRegistration = transaction.type === "registration";
                  return (
                    <article className="history-card" key={`${transaction.type}-${transaction.id}`} data-testid={`balance-item-${transaction.id}`}>
                      <div className="history-card-top">
                        <TransactionIcon />
                        <div>
                          <p className="history-amount">
                            {isRegistration ? "—" : `+${currency} ${amount.toLocaleString("fr-FR")}`}
                          </p>
                           <p className="history-card-label">{transaction.type === "deposit" ? "Dépôt" : transaction.description}</p>
                        </div>
                        <Status label="Approuvé" color={HISTORY_RED} />
                      </div>
                      <div className="history-divider" />
                      <Row label="Type :" value={isRegistration ? "Inscription" : getBalanceTypeLabel(transaction)} />
                      <Row label="Heure :" value={formatDateTime(transaction.createdAt)} />
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="history-empty">
                <img src={nodataImg} alt="Aucune donnée" />
                <span>Plus de données</span>
              </div>
            )
          ) : activeTab === "deposits" ? (
            deposits.length > 0 ? (
              <div className="history-list">
                {deposits.map((deposit) => {
                  const { label, color } = getStatusInfo(deposit.status);
                  const amount = Number.parseFloat(deposit.amount);
                  const reference = isAdmin ? getDepositRef(deposit) : maskRef(getDepositRef(deposit));
                  return (
                    <article className="history-card" key={deposit.id} data-testid={`deposit-item-${deposit.id}`}>
                      <div className="history-card-top">
                        <TransactionIcon />
                        <div>
                          <p className="history-amount">{amount.toLocaleString("fr-FR")} {currency}</p>
                          <p className="history-card-label">{formatDateTime(deposit.createdAt)}</p>
                        </div>
                        <Status label={label} color={color} />
                      </div>
                      <div className="history-divider" />
                      <Row label="Numéro de guichet automatique :" value={reference} />
                      {isPendingDeposit(deposit) && !deposit.sendavapayReference ? (
                        <button
                          className="history-verify"
                          onClick={() => handleVerify(deposit.id)}
                          disabled={verifyingId === deposit.id}
                          data-testid={`button-verify-${deposit.id}`}
                        >
                          {verifyingId === deposit.id ? <Loader2 className="inline animate-spin" /> : <RefreshCw className="mr-1 inline h-3 w-3" />}
                          Vérifier la transaction
                        </button>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="history-empty">
                <img src={nodataImg} alt="Aucune donnée" />
                <span>Plus de données</span>
              </div>
            )
          ) : withdrawals.length > 0 ? (
            <div className="history-list">
              {withdrawals.map((withdrawal) => {
                const { label, color } = getStatusInfo(withdrawal.status);
                const gross = Number.parseFloat(withdrawal.amount);
                const net = Number.parseFloat(withdrawal.netAmount || withdrawal.amount);
                return (
                  <article className="history-card" key={withdrawal.id} data-testid={`withdrawal-item-${withdrawal.id}`}>
                    <div className="history-card-top">
                      <TransactionIcon />
                      <div>
                        <p className="history-amount">{gross.toLocaleString("fr-FR")} {currency}</p>
                        <p className="history-card-label">{formatDateTime(withdrawal.createdAt)}</p>
                      </div>
                      <Status label={label} color={color} />
                    </div>
                    <div className="history-divider" />
                    <Row label="Numéro de guichet automatique :" value={getWithdrawalRef(withdrawal)} />
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="history-empty">
              <img src={nodataImg} alt="Aucune donnée" />
              <span>Plus de données</span>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}