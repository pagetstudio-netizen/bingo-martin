import { useAuth } from "@/lib/auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { getCountryByCode } from "@/lib/countries";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useLocation } from "wouter";
import bingoRewardImage from "@assets/70df605a42dc9ac4254ef5fd2de61af4-1_1790117106086.jpg";
import bingoPromoImage from "@assets/1f04fee38bcef670138153670bbc6645_1790117106119.jpg";

interface BonusStatus {
  canClaim: boolean;
  hoursRemaining: number;
  totalBonusClaimed: number;
  daysPointed: number;
}

export default function CheckinPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const { data: bonusStatus } = useQuery<BonusStatus>({
    queryKey: ["/api/daily-bonus-status"],
    refetchInterval: 60000,
  });

  const claimMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/claim-daily-bonus", {});
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erreur");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/daily-bonus-status"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({ title: "Bonus reçu !", description: "50 FCFA ajoutés à votre solde" });
    },
    onError: (error: Error) => {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    },
  });

  if (!user) return null;

  const country = getCountryByCode(user.country);
  const currency = country?.currency || "XOF";
  const totalBonusClaimed = bonusStatus?.totalBonusClaimed || 0;
  const canClaim = Boolean(bonusStatus?.canClaim);
  const formatAmount = (amount: number) => `${Math.round(amount).toLocaleString("fr-FR")} ${currency}`;

  return (
    <main className="checkin-reference min-h-full bg-[#fff7f8] pb-20">
      <style>{`
        .checkin-reference {
          color: #2b2021;
          font-family: Inter, Arial, sans-serif;
        }
        .checkin-reference .checkin-screen {
          width: 100%;
          max-width: 500px;
          min-height: 100dvh;
          margin: 0 auto;
          overflow: hidden;
          background: #fff7f8;
        }
        .checkin-reference .topbar {
          display: flex;
          height: 60px;
          align-items: center;
          background: #b10813;
          color: white;
        }
        .checkin-reference .back {
          display: grid;
          width: 54px;
          height: 54px;
          flex: none;
          place-items: center;
          border: 0;
          background: transparent;
          color: white;
        }
        .checkin-reference .back svg {
          width: 29px;
          height: 29px;
          stroke-width: 2.5;
        }
        .checkin-reference .topbar-title {
          flex: 1;
          margin-right: 54px;
          font-size: 20px;
          font-weight: 700;
          text-align: center;
        }
        .checkin-reference .content {
          padding: 16px 18px 34px;
        }
        .checkin-reference .reward-card {
          position: relative;
          width: 100%;
          aspect-ratio: 600 / 336;
          height: auto;
          margin: 0 auto;
          overflow: hidden;
          border-radius: 10px;
          background: #c52330;
          box-shadow: 0 3px 10px rgba(177, 8, 19, .14);
        }
        .checkin-reference .reward-card img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          pointer-events: none;
        }
        .checkin-reference .reward-card::after {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(111, 0, 8, .78), rgba(177, 8, 19, .18));
          content: "";
          pointer-events: none;
        }
        .checkin-reference .reward-copy {
          position: absolute;
          z-index: 1;
          inset: 20px 16px;
          color: white;
        }
        .checkin-reference .reward-label {
          margin: 0;
          font-size: 23px;
          font-weight: 400;
          line-height: 1.15;
        }
        .checkin-reference .reward-total {
          margin: 20px 0 0;
          font-size: 42px;
          font-weight: 800;
          line-height: 1;
        }
        .checkin-reference .earnings-card {
          margin-top: 20px;
          padding: 20px;
          border: 1px solid #f2d9dc;
          border-radius: 8px;
          background: white;
          box-shadow: 0 4px 14px rgba(73, 20, 24, .06);
        }
        .checkin-reference .earnings-heading {
          margin: 0;
          color: #2b2021;
          font-size: 18px;
          font-weight: 600;
        }
        .checkin-reference .earnings-subheading {
          margin: 10px 0 0;
          color: #6e5d5f;
          font-size: 15px;
          line-height: 1.3;
        }
        .checkin-reference .claim {
          display: inline-flex;
          min-width: 91px;
          height: 50px;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
          border: 0;
          border-radius: 28px;
          background: #b10813;
          color: white;
          font-size: 17px;
          font-weight: 400;
          box-shadow: 0 5px 10px rgba(177, 8, 19, .2);
        }
        .checkin-reference .claim:disabled {
          background: #d7b4b7;
          color: white;
          box-shadow: none;
        }
        .checkin-reference .claim svg {
          width: 22px;
          height: 22px;
        }
        .checkin-reference .claim-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .checkin-reference .reward-pill {
          display: flex;
          height: 42px;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
          border: 1px dashed #b10813;
          border-radius: 24px;
          color: #b10813;
          font-size: 23px;
          font-weight: 600;
        }
        .checkin-reference .claim-prompt {
          margin: 20px 0 2px;
          color: #4c3d3f;
          font-size: 16px;
          line-height: 1.3;
          text-align: center;
        }
        .checkin-reference .next-claim {
          margin: 8px 0 0;
          color: #9c7478;
          font-size: 12px;
          text-align: center;
        }
        .checkin-reference .promo {
          position: relative;
          height: 108px;
          margin-top: 24px;
          overflow: hidden;
          border: 2px solid #b10813;
          border-radius: 8px;
          background: #b10813;
          box-shadow: 0 3px 10px rgba(177, 8, 19, .16);
        }
        .checkin-reference .promo img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: .72;
          pointer-events: none;
        }
        .checkin-reference .promo::after {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(80, 0, 6, .7), rgba(177, 8, 19, .18));
          content: "";
        }
        .checkin-reference .promo-copy {
          position: absolute;
          z-index: 1;
          top: 20px;
          right: 16px;
          color: white;
          text-align: right;
        }
        .checkin-reference .promo-title {
          margin: 0;
          font-size: 25px;
          font-weight: 500;
          line-height: 1;
        }
        .checkin-reference .promo-subtitle {
          margin: 10px 0 0;
          font-size: 14px;
        }
        .checkin-reference .instructions {
          margin: 34px 0 0;
          padding-left: 21px;
          color: #5a484a;
          font-size: 14px;
          line-height: 2.1;
        }
        .checkin-reference .instructions strong {
          color: #b10813;
        }
        @media (max-width: 360px) {
          .checkin-reference .content {
            padding-right: 14px;
            padding-left: 14px;
          }
          .checkin-reference .reward-label { font-size: 20px; }
          .checkin-reference .reward-total { font-size: 36px; }
          .checkin-reference .earnings-card { padding: 16px; }
          .checkin-reference .promo-title { font-size: 22px; }
          .checkin-reference .instructions { font-size: 13px; }
        }
      `}</style>

      <div className="checkin-screen">
        <header className="topbar">
          <button className="back" onClick={() => navigate("/")} aria-label="Retour">
            <ChevronLeft aria-hidden="true" />
          </button>
          <h1 className="topbar-title">Pointage</h1>
        </header>

        <div className="content">
          <section className="reward-card" aria-label="Récompenses cumulées">
            <img src={bingoRewardImage} alt="" />
            <div className="reward-copy">
              <p className="reward-label">Récompenses cumulées</p>
              <p className="reward-total">{formatAmount(totalBonusClaimed)}</p>
            </div>
          </section>

          <section className="earnings-card" aria-label="Pointage quotidien">
            <div className="claim-row">
              <div>
                <p className="earnings-heading">Pointer maintenant</p>
                <p className="earnings-subheading">Pointage pendant 0 jours consécutifs</p>
              </div>
              <button
                className="claim"
                onClick={() => claimMutation.mutate()}
                disabled={!canClaim || claimMutation.isPending}
                data-testid="button-pointer"
              >
                {claimMutation.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : canClaim ? (
                  "Pointer"
                ) : (
                  `${bonusStatus?.hoursRemaining || 0}h`
                )}
              </button>
            </div>
            <div className="reward-pill">50 {currency}</div>
            <p className="claim-prompt">Pointez aujourd'hui et obtenez une récompense</p>
            {!canClaim && bonusStatus?.hoursRemaining ? (
              <p className="next-claim">Prochain pointage dans {bonusStatus.hoursRemaining}h</p>
            ) : null}
          </section>

          <section className="promo" aria-label="Récompenses quotidiennes">
            <img src={bingoPromoImage} alt="" />
            <div className="promo-copy">
              <p className="promo-title">Aller au pointage</p>
              <p className="promo-subtitle">Recevez vos récompenses quotidiennes</p>
            </div>
          </section>

          <ol className="instructions">
            <li>Récompense de connexion quotidienne : <strong>50 {currency}</strong>.</li>
            <li>Connectez-vous une fois par jour.</li>
            <li>Connectez-vous à nouveau après minuit chaque jour.</li>
          </ol>
        </div>
      </div>
    </main>
  );
}