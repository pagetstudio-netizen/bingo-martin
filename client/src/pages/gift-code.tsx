import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import giftHero from "@assets/70df605a42dc9ac4254ef5fd2de61af4-1_1790115265112.jpg";
import telegramIcon from "@assets/tg-1_1787390593655.png";

const GIFT_RED = "#b10813";

export default function GiftCodePage() {
  const { refreshUser } = useAuth();
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const { data: settings } = useQuery<Record<string, string>>({
    queryKey: ["/api/settings"],
  });
  const groupLabel = settings?.groupLabel || "Groupe Telegram officiel";

  const claimMutation = useMutation({
    mutationFn: async (giftCode: string) => {
      const response = await apiRequest("POST", "/api/gift-codes/claim", { code: giftCode });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erreur");
      }
      return response.json();
    },
    onSuccess: (data) => {
      refreshUser();
      setCode("");
      toast({ title: "Félicitations !", description: data.message });
    },
    onError: (error: any) => {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = () => {
    if (!code.trim()) {
      toast({ title: "Erreur", description: "Veuillez saisir un code", variant: "destructive" });
      return;
    }
    claimMutation.mutate(code.trim());
  };

  return (
    <main className="gift-reference">
      <style>{`
        .gift-reference { min-height: 100dvh; background: #fff5f5; color: #151515; font-family: Arial, sans-serif; }
        .gift-reference *, .gift-reference *::before, .gift-reference *::after { box-sizing: border-box; }
        .gift-reference .gift-screen { width: 100%; max-width: 512px; min-height: 100dvh; margin: 0 auto; background: linear-gradient(180deg, #fff8f8 0%, #fff1f1 100%); }
        .gift-reference .gift-title { height: 60px; display: flex; align-items: center; padding: 0 22px; background: #fff; border-bottom: 1px solid #f0d4d6; }
        .gift-reference .gift-title a { display: grid; width: 36px; height: 36px; place-items: center; color: ${GIFT_RED}; font-size: 38px; line-height: 1; text-decoration: none; }
        .gift-reference .gift-title h1 { flex: 1; margin: 0; color: ${GIFT_RED}; font-size: 21px; font-weight: 700; text-align: center; }
        .gift-reference .gift-hero { display: block; width: 100%; height: auto; aspect-ratio: 600 / 340; object-fit: cover; }
        .gift-reference .gift-description { min-height: 66px; display: flex; align-items: center; padding: 10px 21px; background: #fff0f0; color: #8c5f62; font-size: 17px; }
        .gift-reference .gift-telegram { height: 70px; display: flex; align-items: center; margin: 0 21px; padding: 0 12px; border: 1px solid #c78c91; border-radius: 6px; background: #fff; text-decoration: none; }
        .gift-reference .gift-telegram img { width: 56px; height: 56px; margin-right: 15px; object-fit: contain; }
        .gift-reference .gift-telegram strong { flex: 1; color: #342628; font-size: 19px; font-weight: 500; }
        .gift-reference .gift-telegram svg { width: 22px; height: 22px; color: #a9787d; stroke-width: 2; }
        .gift-reference .gift-form { padding: 20px 21px 0; }
        .gift-reference .gift-label { display: block; margin-bottom: 12px; color: #151515; font-size: 19px; font-weight: 700; }
        .gift-reference .gift-label::first-letter { color: ${GIFT_RED}; }
        .gift-reference .gift-input { display: block; width: 100%; height: 54px; border: 1px solid #bca2a5; border-radius: 0; padding: 0 21px; outline: 0; background: transparent; color: #333; font-size: 16px; }
        .gift-reference .gift-input:focus { border-color: ${GIFT_RED}; box-shadow: 0 0 0 2px rgba(177, 8, 19, .1); }
        .gift-reference .gift-input::placeholder { color: #b3a5a7; opacity: 1; }
        .gift-reference .gift-submit { display: block; width: calc(100% - 152px); min-width: 230px; height: 53px; margin: 22px auto 0; border: 0; border-radius: 28px; background: ${GIFT_RED}; color: white; font-size: 21px; font-weight: 700; box-shadow: 0 8px 18px rgba(177, 8, 19, .18); }
        .gift-reference .gift-submit:active { transform: scale(.98); }
        .gift-reference .gift-submit:disabled { opacity: .7; }
        @media (max-width: 370px) {
          .gift-reference .gift-description { font-size: 15px; }
          .gift-reference .gift-title { height: 56px; }
          .gift-reference .gift-title h1 { font-size: 19px; }
          .gift-reference .gift-telegram { margin-right: 16px; margin-left: 16px; }
          .gift-reference .gift-form { padding-right: 16px; padding-left: 16px; }
          .gift-reference .gift-submit { width: calc(100% - 90px); min-width: 210px; }
        }
      `}</style>
      <div className="gift-screen">
        <header className="gift-title">
          <Link href="/account" aria-label="Retour"><ChevronLeft aria-hidden="true" /></Link>
          <h1>Échanger un cadeau</h1>
        </header>
        <img className="gift-hero" src={giftHero} alt="Produits Bingo" data-testid="img-gift-banner" />
        <p className="gift-description">Vous pouvez obtenir un code cadeau dans le groupe</p>
        <a className="gift-telegram" href={settings?.groupLink || "https://t.me/sybotx"} target="_blank" rel="noreferrer">
          <img src={telegramIcon} alt="" />
          <strong>{groupLabel}</strong>
          <ChevronRight aria-hidden="true" />
        </a>
        <form className="gift-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <label className="gift-label" htmlFor="gift-code-input"><span>* </span>Code cadeau</label>
          <input
            id="gift-code-input"
            className="gift-input"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Veuillez saisir le code cadeau"
            data-testid="input-gift-code"
          />
          <button className="gift-submit" type="submit" disabled={claimMutation.isPending} data-testid="button-submit-code">
            {claimMutation.isPending ? <Loader2 className="mx-auto h-5 w-5 animate-spin" /> : "Confirmer"}
          </button>
        </form>
      </div>
    </main>
  );
}