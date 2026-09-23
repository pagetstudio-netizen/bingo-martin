import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

import bingoShareArt from "@assets/logo-1_1790106035177.png";

export default function SharePage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: settings } = useQuery<Record<string, string>>({
    queryKey: ["/api/settings"],
  });

  if (!user) return null;

  const referralCode = user.referralCode;
  const referralLink = `${window.location.origin}/invitation?code=${encodeURIComponent(referralCode)}`;
  const rates = [
    settings?.level1Commission || "25",
    settings?.level2Commission || "3",
    settings?.level3Commission || "2",
  ];

  const copyValue = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast({ title: `${label} copié` });
    } catch {
      toast({ title: "Copie impossible", description: "Sélectionnez le texte pour le copier." });
    }
  };

  return (
    <main className="share-mobile">
      <style>{`
        .share-mobile {
          min-height: 100dvh;
          padding-bottom: 59px;
          overflow-x: hidden;
          background: #f6f6f6;
          color: #161616;
          font-family: Arial, Helvetica, sans-serif;
        }
        .share-mobile * { box-sizing: border-box; }
        .share-mobile .share-screen {
          width: min(100%, 512px);
          min-height: calc(100dvh - 59px);
          margin: 0 auto;
          background: #f6f6f6;
        }
        .share-mobile .share-appbar {
          display: grid;
          height: 59px;
          place-items: center;
          background: #ad0b15;
          color: #fff;
          font-size: 24px;
          font-weight: 400;
        }
        .share-mobile .share-hero {
          display: block;
          width: 100%;
          height: 275px;
          object-fit: cover;
          object-position: center;
          background: #ffc20e;
        }
        .share-mobile .share-card {
          margin: 21px 26px 26px;
          padding: 46px 51px 40px;
          border: 2px solid #ad0b15;
          border-radius: 17px 17px 0 0;
          background: #fff;
        }
        .share-mobile .share-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 76px;
          align-items: center;
          gap: 15px;
          margin-bottom: 49px;
        }
        .share-mobile .share-value {
          min-width: 0;
          color: #151515;
          font-size: 23px;
          line-height: 1.35;
          overflow-wrap: anywhere;
        }
        .share-mobile .share-link {
          font-size: 14px;
          line-height: 1.35;
        }
        .share-mobile .share-code {
          font-size: 27px;
          line-height: 1;
        }
        .share-mobile .copy-button {
          display: inline-flex;
          height: 38px;
          align-items: center;
          justify-content: center;
          gap: 5px;
          border: 0;
          border-radius: 8px;
          background: #ad0b15;
          color: #fff;
          font-size: 16px;
          font-weight: 400;
        }
        .share-mobile .copy-button svg { width: 14px; height: 14px; }
        .share-mobile .commission-title {
          margin: 0 0 51px;
          text-align: center;
          font-size: 24px;
          font-weight: 700;
          line-height: 1;
        }
        .share-mobile .commission-list {
          display: grid;
          gap: 24px;
          padding: 0 18px;
        }
        .share-mobile .commission-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.25;
        }
        .share-mobile .commission-row strong { color: #ad0b15; }
        @media (max-width: 380px) {
          .share-mobile .share-card { margin-right: 16px; margin-left: 16px; padding-right: 29px; padding-left: 29px; }
           .share-mobile .share-value { font-size: 19px; }
           .share-mobile .share-link { font-size: 12px; }
          .share-mobile .share-code { font-size: 24px; }
          .share-mobile .commission-row { font-size: 18px; }
        }
      `}</style>

      <div className="share-screen">
        <header className="share-appbar">Share</header>
        <img className="share-hero" src={bingoShareArt} alt="Bingo" />

        <section className="share-card" aria-label="Code et lien de parrainage">
          <div className="share-row">
            <p className="share-value share-link" data-testid="text-share-link">{referralLink}</p>
            <button
              type="button"
              className="copy-button"
              onClick={() => copyValue(referralLink, "Lien")}
              data-testid="button-copy-share-link"
            >
              <Copy aria-hidden="true" /> Copy
            </button>
          </div>

          <div className="share-row">
            <p className="share-value share-code" data-testid="text-share-code">{referralCode}</p>
            <button
              type="button"
              className="copy-button"
              onClick={() => copyValue(referralCode, "Code")}
              data-testid="button-copy-share-code"
            >
              <Copy aria-hidden="true" /> Copy
            </button>
          </div>

          <h1 className="commission-title">Invite Commission</h1>
          <div className="commission-list">
            {rates.map((rate, index) => (
              <div className="commission-row" key={index}>
                <span>Level {index + 1} =</span>
                <strong>{rate}%</strong>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}