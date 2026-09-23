import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { getPaymentMethodsForCountry, type ApiCountry } from "@/lib/countries";
import { Loader2, Plus, Trash2, CreditCard, ChevronLeft, ChevronRight, Shield, Check, Search, X } from "lucide-react";
import emptyIllustration from "@assets/illustration-8_1784762965573.png";
import { Link, useLocation, useSearch } from "wouter";
import type { WithdrawalWallet } from "@shared/schema";

const walletSchema = z.object({
  accountName: z.string().min(2, "Nom du titulaire requis"),
  accountNumber: z.string().min(8, "Numéro requis"),
  paymentMethod: z.string().min(2, "Moyen de paiement requis"),
});

type WalletForm = z.infer<typeof walletSchema>;

const WALLET_RED = "#b10813";

export default function WalletPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const selectMode = params.get("from") === "withdrawal";
  const [showForm, setShowForm] = useState(false);
  const [showBankSheet, setShowBankSheet] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [bankSearch, setBankSearch] = useState("");

  const { data: wallets, isLoading } = useQuery<WithdrawalWallet[]>({
    queryKey: ["/api/wallets"],
  });

  const { data: apiCountries = [] } = useQuery<ApiCountry[]>({
    queryKey: ["/api/countries"],
  });

  const form = useForm<WalletForm>({
    resolver: zodResolver(walletSchema),
    defaultValues: { accountName: "", accountNumber: "", paymentMethod: "" },
  });

  const addMutation = useMutation({
    mutationFn: async (data: WalletForm) => {
      const response = await apiRequest("POST", "/api/wallets", {
        ...data,
        country: user!.country,
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Erreur");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wallets"] });
      toast({ title: "Portefeuille ajouté !" });
      form.reset();
      setSelectedMethod("");
      setShowForm(false);
    },
    onError: (error: any) => {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (walletId: number) => {
      const response = await apiRequest("DELETE", `/api/wallets/${walletId}`, {});
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Erreur");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wallets"] });
      toast({ title: "Portefeuille supprimé !" });
    },
    onError: (error: any) => {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    },
  });

  const setDefaultMutation = useMutation({
    mutationFn: async (walletId: number) => {
      const response = await apiRequest("PATCH", `/api/wallets/${walletId}/default`, {});
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Erreur");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wallets"] });
    },
    onError: (error: any) => {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    },
  });

  const handleSelectWallet = (wallet: WithdrawalWallet) => {
    if (selectMode) {
      localStorage.setItem("selectedWalletId", wallet.id.toString());
      navigate("/withdrawal");
    }
  };

  const handleChooseMethod = (method: string) => {
    setSelectedMethod(method);
    form.setValue("paymentMethod", method);
    setBankSearch("");
    setShowBankSheet(false);
  };

  const handleSubmit = () => {
    form.handleSubmit((data) => addMutation.mutate(data))();
  };

  if (!user) return null;

  const paymentMethods = getPaymentMethodsForCountry(user.country, apiCountries);
  const backLink = selectMode ? "/withdrawal" : "/account";

  /* ─── ADD FORM VIEW ─── */
  if (showForm) {
    return (
      <div className="wallet-page wallet-form-page flex min-h-full flex-col">
        <style>{`
          .wallet-form-page {
            min-height: 100dvh;
            background: linear-gradient(180deg, ${WALLET_RED} 0%, #d94b55 24%, #fff1f2 66%, #fff8f8 100%);
            color: #201315;
          }
          .wallet-form-page .wallet-header {
            display: flex;
            height: 60px;
            align-items: center;
            padding: 0 18px;
            background: #fff;
            border-bottom: 1px solid #f0d4d6;
          }
          .wallet-form-page .wallet-back {
            display: grid;
            width: 36px;
            height: 36px;
            place-items: center;
            border: 0;
            border-radius: 50%;
            background: transparent;
            color: ${WALLET_RED};
          }
          .wallet-form-page .wallet-back svg {
            width: 25px;
            height: 25px;
            stroke-width: 2;
          }
          .wallet-form-page .wallet-heading {
            flex: 1;
            margin: 0 36px 0 8px;
            color: ${WALLET_RED};
            font-size: 18px;
            font-weight: 700;
            text-align: center;
          }
          .wallet-form-page .wallet-form-fields {
            display: flex;
            flex: 1;
            flex-direction: column;
            gap: 22px;
            padding: 48px 42px 0;
          }
          .wallet-form-page .wallet-field {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .wallet-form-page .wallet-field-label {
            color: #fff;
            font-size: 17px;
            line-height: 1.2;
          }
          .wallet-form-page .wallet-field-control {
            width: 100%;
            height: 54px;
            border: 1px solid rgba(128, 22, 30, .28);
            border-radius: 0;
            padding: 0 20px;
            outline: 0;
            background: #fff;
            color: #3a2527;
            font-size: 17px;
          }
          .wallet-form-page .wallet-field-control::placeholder {
            color: #9f8e91;
          }
          .wallet-form-page .wallet-field-control:focus {
            border-color: ${WALLET_RED};
            box-shadow: 0 0 0 2px rgba(177, 8, 19, .16);
          }
          .wallet-form-page .wallet-operator-field {
            display: flex;
            width: 100%;
            height: 54px;
            align-items: center;
            justify-content: space-between;
            border: 1px solid rgba(128, 22, 30, .28);
            border-radius: 0;
            padding: 0 20px;
            background: #fff;
            color: ${WALLET_RED};
            font-size: 17px;
            text-align: left;
          }
          .wallet-form-page .wallet-operator-field svg {
            width: 21px;
            height: 21px;
            color: ${WALLET_RED};
          }
          .wallet-form-page .wallet-error {
            color: #fff;
            font-size: 12px;
          }
          .wallet-form-page .wallet-confirm-wrap {
            padding: 24px 42px 42px;
          }
          .wallet-form-page .wallet-confirm {
            display: block;
            width: 100%;
            height: 53px;
            border: 0;
            border-radius: 28px;
            background: ${WALLET_RED};
            color: #fff;
            font-size: 20px;
            font-weight: 700;
            box-shadow: 0 8px 18px rgba(128, 22, 30, .2);
          }
          .wallet-form-page .wallet-confirm:disabled {
            opacity: .55;
          }
          .wallet-form-page .country-picker-search {
            border-color: ${WALLET_RED};
            background: #fff8f8;
          }
          .wallet-form-page .country-picker-search svg,
          .wallet-form-page .country-picker-search input {
            color: ${WALLET_RED};
          }
          .wallet-form-page .country-picker-search input::placeholder {
            color: #b98b90;
          }
          .wallet-form-page .country-picker-row {
            color: ${WALLET_RED};
          }
          .wallet-form-page .country-picker-row.is-selected {
            background: #ffe4e6;
          }
          .wallet-form-page .country-picker-check {
            background: ${WALLET_RED};
          }
          .wallet-form-page .country-picker-empty {
            color: #9a666b;
          }
          @media (max-width: 380px) {
            .wallet-form-page .wallet-form-fields {
              padding-right: 22px;
              padding-left: 22px;
            }
            .wallet-form-page .wallet-confirm-wrap {
              padding-right: 22px;
              padding-left: 22px;
            }
          }
        `}</style>

        {/* Header */}
        <div className="wallet-header">
          <button
            onClick={() => { setShowForm(false); form.reset(); setSelectedMethod(""); }}
            className="wallet-back"
            data-testid="button-back-form"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <h1 className="wallet-heading">Ajouter une carte bancaire</h1>
        </div>

        {/* Form sections */}
        <div className="wallet-form-fields">

          {/* Bank selector */}
          <div className="wallet-field">
            <label className="wallet-field-label" htmlFor="wallet-operator-button">* Opérateur</label>
            <button
              id="wallet-operator-button"
              type="button"
              onClick={() => setShowBankSheet(true)}
              className="wallet-operator-field"
              data-testid="button-select-bank"
            >
              <span>{selectedMethod || "Veuillez choisir un opérateur"}</span>
              <ChevronRight aria-hidden="true" />
            </button>
          </div>

          {/* Account name */}
          <div className="wallet-field">
            <label className="wallet-field-label" htmlFor="input-wallet-name">* Titulaire du compte</label>
            <input
              id="input-wallet-name"
              {...form.register("accountName")}
              placeholder="Nom du titulaire"
              className="wallet-field-control"
              data-testid="input-wallet-name"
            />
            {form.formState.errors.accountName && (
              <p className="wallet-error">{form.formState.errors.accountName.message}</p>
            )}
          </div>

          {/* Account number */}
          <div className="wallet-field">
            <label className="wallet-field-label" htmlFor="input-wallet-number">* Numéro de téléphone</label>
            <input
              id="input-wallet-number"
              {...form.register("accountNumber")}
              type="tel"
              placeholder="Veuillez saisir le numéro"
              className="wallet-field-control"
              data-testid="input-wallet-number"
            />
            {form.formState.errors.accountNumber && (
              <p className="wallet-error">{form.formState.errors.accountNumber.message}</p>
            )}
          </div>
        </div>

        {/* Confirm button */}
        <div className="wallet-confirm-wrap">
          <button
            onClick={handleSubmit}
            disabled={addMutation.isPending}
            className="wallet-confirm"
            data-testid="button-confirm-wallet"
          >
            {addMutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Enregistrement...
              </span>
            ) : (
              "Confirmer"
            )}
          </button>
        </div>

        {/* Bank bottom sheet */}
        {showBankSheet && (
          <div className="country-picker-overlay" onClick={() => { setBankSearch(""); setShowBankSheet(false); }}>
            <section
              className="country-picker"
              role="dialog"
              aria-modal="true"
              aria-label="Choisir un opérateur"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="country-picker-close"
                onClick={() => { setBankSearch(""); setShowBankSheet(false); }}
                aria-label="Fermer"
              >
                <X aria-hidden="true" />
              </button>
              <div className="country-picker-search">
                <Search aria-hidden="true" />
                <input
                  autoFocus
                  value={bankSearch}
                  onChange={(e) => setBankSearch(e.target.value)}
                  placeholder="Search"
                  aria-label="Rechercher un opérateur"
                />
              </div>
              <div className="country-picker-list">
                {paymentMethods
                  .filter((method) => method.toLowerCase().includes(bankSearch.trim().toLowerCase()))
                  .map((method) => (
                  <button
                    key={method}
                    onClick={() => handleChooseMethod(method)}
                    className={`country-picker-row${selectedMethod === method ? " is-selected" : ""}`}
                    data-testid={`button-bank-${method}`}
                  >
                    <span>{method}</span>
                    {selectedMethod === method && (
                      <span className="country-picker-check"><Check aria-hidden="true" /></span>
                    )}
                  </button>
                ))}
                {paymentMethods.filter((method) => method.toLowerCase().includes(bankSearch.trim().toLowerCase())).length === 0 && (
                  <p className="country-picker-empty">Aucun opérateur trouvé</p>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    );
  }

  /* ─── LIST VIEW ─── */
  return (
    <div className="flex flex-col min-h-full bg-gray-50">

      {/* Header */}
      <div
        className="flex items-center px-4 py-4"
        style={{ background: "linear-gradient(112deg, #55c9e5 0%, #3174d1 100%)" }}
      >
        <Link href={backLink}>
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20" data-testid="button-back">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
        </Link>
        <h1 className="flex-1 text-center text-white font-bold text-base">
          {selectMode ? "Sélectionner un compte" : "Liste des comptes bancaires"}
        </h1>
        {!selectMode ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20"
            data-testid="button-add-wallet-icon"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        ) : (
          <div className="w-9" />
        )}
      </div>

      {/* Wallet list */}
      <div className="flex-1 px-4 pt-4 pb-28 space-y-3">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-[#3174d1]" />
          </div>
        ) : wallets && wallets.length > 0 ? (
          wallets.map((wallet) => (
            <div
              key={wallet.id}
              onClick={() => selectMode && handleSelectWallet(wallet)}
              className={`bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3 ${
                selectMode ? "cursor-pointer active:opacity-80" : ""
              } ${wallet.isDefault ? "border-l-4 border-[#3174d1]" : ""}`}
              data-testid={`wallet-card-${wallet.id}`}
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5 text-gray-500" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-800 text-sm">{wallet.paymentMethod}</p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{wallet.accountName}</p>
                <p className="text-xs text-gray-400 mt-0.5">{wallet.accountNumber}</p>
                {wallet.isDefault && (
                  <div className="flex items-center gap-1 mt-1">
                    <Shield className="w-3 h-3 text-[#3174d1]" />
                    <span className="text-xs text-[#3174d1] font-medium">Par défaut</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              {!selectMode && (
                <div className="flex items-center gap-1">
                  {!wallet.isDefault && (
                    <button
                      onClick={() => setDefaultMutation.mutate(wallet.id)}
                      disabled={setDefaultMutation.isPending}
                      className="p-2"
                      data-testid={`button-set-default-${wallet.id}`}
                    >
                      <Check className="w-4 h-4 text-green-500" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteMutation.mutate(wallet.id)}
                    disabled={deleteMutation.isPending}
                    className="p-2"
                    data-testid={`button-delete-wallet-${wallet.id}`}
                  >
                    <Trash2 className="w-4 h-4 text-[#3174d1]" />
                  </button>
                </div>
              )}

              {selectMode && (
                <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-10 flex flex-col items-center gap-2">
            <img src={emptyIllustration} alt="Vide" className="w-40 h-40 object-contain opacity-90" />
            <p className="text-gray-500 text-sm">Aucun compte bancaire enregistré</p>
            <p className="text-gray-400 text-xs mt-1">Ajoutez un compte pour effectuer des retraits</p>
          </div>
        )}
      </div>

      {/* Bottom add button */}
      <div className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-3 bg-gray-50">
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-4 rounded-full text-white font-bold text-base shadow-md"
           style={{ background: "linear-gradient(112deg, #55c9e5 0%, #3174d1 100%)" }}
          data-testid="button-add-wallet"
        >
          Ajouter une carte
        </button>
      </div>
    </div>
  );
}
