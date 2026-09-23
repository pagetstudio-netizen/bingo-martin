import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { CalendarCheck2, Loader2, X } from "lucide-react";
import type { Product } from "@shared/schema";

import PurchaseConfirmModal from "@/components/purchase-confirm-modal";
import productImg1 from "@assets/70df605a42dc9ac4254ef5fd2de61af4_1790106066950.jpg";
import productImg2 from "@assets/1f04fee38bcef670138153670bbc6645_1790106066785.jpg";
import productImg3 from "@assets/0aef04f74f076c944fb41bfe3cc60210_1790106066732.jpg";
import productImg4 from "@assets/2e505d765fe0a4dd0426740fa1786cdd_1790106066882.jpg";
import productImg5 from "@assets/475067be610be1a3b8c67004bb66bbaa_1790106066605.jpg";
import productImg6 from "@assets/754cea8fd53bf742b0f23b500c16d799_1790106066917.jpg";
import productImg7 from "@assets/9c7951043ab6fc2cbf52f3d7867b910c_1790106066758.jpg";
import productImg8 from "@assets/a61f6f9a0bd34ce80a06f7b1c72059bd_1790106066849.jpg";
import depositActionIcon from "@assets/icon_1_1790113934821.png";
import withdrawalActionIcon from "@assets/icon_2_1790113934863.png";
import supportActionIcon from "@assets/icon_3-1_1790113934921.png";
import emptyStateImage from "@assets/05b94578-92ae-48a6-b863-59d59ee49423_1790114751100.png";
import bingoLogo from "@assets/logo-1_1790106035177.png";

type HomeProduct = Product & {
  isOwned?: boolean;
  ownedCount?: number;
  canClaimFree?: boolean;
};

type PurchasedProduct = {
  id: number;
  productId: number;
  purchasedAt: string;
  lastEarningDate: string | null;
  daysRemaining: number;
  totalEarned: string;
  status: "active" | "completed";
  product?: HomeProduct;
};

interface ServiceLinks {
  supportLink?: string;
  groupLink?: string;
  noticeText?: string;
  popupButtonLabel?: string;
}

const ACCENT = "#ad0b15";
const bingoHero = "/bingo-home-banner.png";

const quickActions = [
  { label: "Dépôt", href: "/deposit", image: depositActionIcon },
  { label: "Retrait", href: "/withdrawal", image: withdrawalActionIcon },
  { label: "Check-in", href: "/checkin", icon: CalendarCheck2 },
  { label: "Service client", href: "/service", image: supportActionIcon, round: true },
];

const productImages = [
  productImg1,
  productImg2,
  productImg3,
  productImg4,
  productImg5,
  productImg6,
  productImg7,
  productImg8,
];

function formatFcfa(value: number | string | null | undefined) {
  return `${Number(value || 0).toLocaleString("fr-FR")} FCFA`;
}

function formatDateTime(value: string | Date | null | undefined) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getNextEarningDate(lastEarningDate: string | null, purchasedAt: string) {
  const baseDate = new Date(lastEarningDate || purchasedAt);
  if (Number.isNaN(baseDate.getTime())) return null;

  return new Date(baseDate.getTime() + 24 * 60 * 60 * 1000);
}

export default function HomePage() {
  const { user, refreshUser } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [productTab, setProductTab] = useState<"available" | "owned">("available");
  const [confirmProduct, setConfirmProduct] = useState<HomeProduct | null>(null);

  const { data: products, isLoading: productsLoading } = useQuery<HomeProduct[]>({
    queryKey: ["/api/products"],
  });

  const { data: userProducts, isLoading: ownedLoading } = useQuery<PurchasedProduct[]>({
    queryKey: ["/api/user/products"],
  });

  const { data: serviceLinks } = useQuery<ServiceLinks>({
    queryKey: ["/api/settings/links"],
  });
  const [welcomePopupRequested, setWelcomePopupRequested] = useState(false);

  useEffect(() => {
    const openWelcomePopup = () => setWelcomePopupRequested(true);
    openWelcomePopup();
    window.addEventListener("home-tab-clicked", openWelcomePopup);
    return () => window.removeEventListener("home-tab-clicked", openWelcomePopup);
  }, []);

  const purchaseMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await apiRequest("POST", `/api/products/${productId}/purchase`, {});
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erreur lors de l'achat");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user/products"] });
      refreshUser();
      setConfirmProduct(null);
      toast({
        title: "Produit acheté !",
        description: "Vous commencerez à recevoir des gains demain.",
      });
    },
    onError: (error: Error) => {
      setConfirmProduct(null);
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    },
  });

  const claimFreeMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await apiRequest("POST", `/api/products/${productId}/claim-free`, {});
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Impossible de réclamer ce produit");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      refreshUser();
      toast({ title: "Bonus réclamé", description: "Le bonus gratuit a été ajouté à votre compte." });
    },
    onError: (error: Error) => {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    },
  });

  if (!user) return null;

  const visibleProducts = products || [];
  const isLoading = productTab === "available" ? productsLoading : ownedLoading;
  const handleQuickAction = (label: string, href: string) => {
    if (label === "Service client") {
      const supportLink = serviceLinks?.supportLink?.trim();
      if (supportLink) {
        window.open(supportLink, "_blank", "noopener,noreferrer");
      }
      return;
    }
    navigate(href);
  };
  const welcomeNotice = `The app that lets you earn 500F upon registration

Login bonus: 50F
Invite your friends to earn

Level 1: 25%
Level 2: 3%
Level 3: 2%`;

  return (
    <main className="bingo-home">
      <style>{`
        .bingo-home {
          min-height: 100dvh;
          padding: 22px 0 76px;
          overflow-x: hidden;
          background: #f5f5f5;
          color: #232323;
          font-family: Arial, Helvetica, sans-serif;
        }
        .bingo-home * { box-sizing: border-box; }
        .bingo-home .home-screen {
          width: min(100%, 512px);
          margin: 0 auto;
        }
        .bingo-home .hero {
          position: relative;
          height: 184px;
          margin: 0 20px;
          overflow: hidden;
          border-radius: 5px;
          background: #8c0710;
        }
        .bingo-home .hero img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .bingo-home .hero-dots {
          position: absolute;
          right: 0;
          bottom: 12px;
          left: 0;
          display: flex;
          justify-content: center;
          gap: 5px;
        }
        .bingo-home .hero-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #151515;
        }
        .bingo-home .hero-dot.muted { opacity: .3; }
        .bingo-home .action-panel {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          height: 88px;
          margin: 14px 20px 0;
          padding: 11px 3px 8px;
          border-radius: 15px;
          background: #fff;
          box-shadow: 0 1px 5px rgba(0, 0, 0, .02);
        }
        .bingo-home .action-button {
          display: flex;
          min-width: 0;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          border: 0;
          padding: 0;
          background: transparent;
          color: ${ACCENT};
          font-size: 14px;
          font-weight: 400;
          line-height: 1;
        }
        .bingo-home .action-icon {
          display: grid;
          width: 38px;
          height: 38px;
          place-items: center;
          border: 2px solid ${ACCENT};
          border-radius: 6px;
        }
        .bingo-home .action-icon.round {
          border-radius: 50%;
        }
        .bingo-home .action-icon svg {
          width: 27px;
          height: 27px;
          stroke-width: 1.8;
        }
        .bingo-home .action-icon.round svg { width: 27px; height: 27px; }
        .bingo-home .action-icon-image {
          display: block;
          width: 29px;
          height: 29px;
          background: currentColor;
          -webkit-mask-position: center;
          mask-position: center;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-size: contain;
          mask-size: contain;
          -webkit-mask-mode: alpha;
          mask-mode: alpha;
        }
        .bingo-home .plan-switch {
          display: grid;
          grid-template-columns: 1.26fr 1fr;
          gap: 5px;
          height: 50px;
          margin: 17px 20px 16px;
        }
        .bingo-home .plan-button {
          border: 0;
          border-radius: 18px;
          background: #fff;
          color: #747474;
          font-size: 15px;
          font-weight: 400;
          box-shadow: 0 1px 3px rgba(0, 0, 0, .01);
        }
        .bingo-home .plan-button.active {
          background: ${ACCENT};
          color: #fff;
          font-weight: 700;
        }
        .bingo-home .product-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin: 0 20px;
        }
        .bingo-home .product-card {
          min-width: 0;
          overflow: hidden;
          border-radius: 8px 8px 0 0;
          background: #fff;
          box-shadow: 0 1px 2px rgba(0, 0, 0, .03);
        }
        .bingo-home .product-image {
          display: block;
          width: 100%;
          height: 185px;
          object-fit: cover;
          object-position: center;
          background: #211f20;
        }
        .bingo-home .product-body {
          min-height: 226px;
          padding: 13px 13px 14px;
        }
        .bingo-home .product-name {
          min-height: 36px;
          margin: 0 0 12px;
          color: ${ACCENT};
          font-size: 15px;
          font-weight: 700;
          line-height: 1.25;
          text-align: center;
        }
        .bingo-home .product-stat {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 8px;
          margin-top: 11px;
          font-size: 14px;
          line-height: 1.1;
        }
        .bingo-home .product-stat span:first-child { color: #202020; }
        .bingo-home .product-stat strong {
          color: ${ACCENT};
          font-size: 13px;
          font-weight: 700;
          text-align: right;
          white-space: nowrap;
        }
        .bingo-home .product-cta {
          width: 100%;
          height: 43px;
          margin-top: 17px;
          border: 0;
          border-radius: 7px;
          background: ${ACCENT};
          color: #fff;
          font-size: 15px;
          font-weight: 400;
        }
        .bingo-home .owned-product-card {
          display: flex;
          grid-column: 1 / -1;
          min-width: 0;
          gap: 14px;
          padding: 12px;
          border-radius: 8px;
          background: #fff;
          box-shadow: 0 1px 2px rgba(0, 0, 0, .03);
        }
        .bingo-home .owned-product-image {
          display: block;
          width: 112px;
          height: 112px;
          flex: none;
          border-radius: 7px;
          object-fit: cover;
          object-position: center;
          background: #211f20;
        }
        .bingo-home .owned-product-info {
          min-width: 0;
          flex: 1;
        }
        .bingo-home .owned-product-name {
          margin: 1px 0 9px;
          color: ${ACCENT};
          font-size: 15px;
          font-weight: 700;
          line-height: 1.25;
        }
        .bingo-home .owned-product-stat {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 10px;
          margin-top: 5px;
          color: #444;
          font-size: 12px;
          line-height: 1.25;
        }
        .bingo-home .owned-product-stat strong {
          color: #252525;
          font-size: 12px;
          font-weight: 700;
          text-align: right;
        }
        .bingo-home .owned-product-cta {
          height: 32px;
          margin-top: 10px;
          padding: 0 14px;
          border: 0;
          border-radius: 6px;
          background: ${ACCENT};
          color: #fff;
          font-size: 12px;
          font-weight: 700;
        }
        .bingo-home .empty-products {
          grid-column: 1 / -1;
          padding: 48px 20px;
          border-radius: 8px;
          background: #fff;
          color: #777;
          text-align: center;
        }
        .bingo-home .empty-products p { margin: 0; }
        .bingo-home .empty-products.empty-owned {
          min-height: 300px;
        }
        .bingo-home .empty-products.empty-owned img {
          display: block;
          width: 190px;
          height: 190px;
          margin: 0 auto;
          object-fit: contain;
        }
        .bingo-home .empty-products .loader {
          width: 28px;
          height: 28px;
          margin: 0 auto 12px;
          animation: bingo-spin 1s linear infinite;
          color: ${ACCENT};
        }
        @keyframes bingo-spin { to { transform: rotate(360deg); } }
        .bingo-home .welcome-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          background: rgba(20, 20, 20, .58);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
        }
        .bingo-home .welcome-modal {
          position: relative;
          display: flex;
          width: min(100%, 370px);
          height: min(520px, calc(100dvh - 80px));
          flex-direction: column;
          overflow: visible;
          border: 1px solid rgba(173, 11, 21, .08);
          border-radius: 24px;
          background: #fbfbff;
          box-shadow: 0 18px 45px rgba(0, 0, 0, .24);
        }
        .bingo-home .welcome-logo {
          position: absolute;
          top: 0;
          left: 50%;
          z-index: 2;
          width: 82px;
          height: 82px;
          border: 4px solid #fff;
          border-radius: 50%;
          object-fit: cover;
          background: #f26a20;
          box-shadow: 0 4px 10px rgba(0, 0, 0, .18);
          transform: translate(-50%, -50%);
        }
        .bingo-home .welcome-close {
          position: absolute;
          top: -16px;
          right: -1px;
          z-index: 3;
          display: grid;
          width: 44px;
          height: 44px;
          place-items: center;
          border: 4px solid #fff;
          border-radius: 50%;
          background: #fbfbff;
          color: ${ACCENT};
          box-shadow: 0 3px 8px rgba(0, 0, 0, .12);
        }
        .bingo-home .welcome-close svg {
          width: 24px;
          height: 24px;
          stroke-width: 1.7;
        }
        .bingo-home .welcome-content {
          display: flex;
          min-height: 0;
          flex: 1;
          flex-direction: column;
          padding: 66px 24px 24px;
        }
        .bingo-home .welcome-title {
          min-height: 58px;
          margin: 0;
          color: ${ACCENT};
          font-size: 23px;
          font-weight: 700;
          line-height: 1.35;
          text-align: center;
        }
        .bingo-home .welcome-divider {
          width: 52px;
          height: 4px;
          flex: none;
          margin: 6px auto 16px;
          border-radius: 2px;
          background: ${ACCENT};
        }
        .bingo-home .welcome-notice {
          min-height: 0;
          flex: 1;
          overflow-y: auto;
          margin: 0;
          color: ${ACCENT};
          font-size: 18px;
          font-weight: 400;
          line-height: 1.55;
          text-align: center;
          white-space: pre-line;
          scrollbar-width: thin;
        }
        .bingo-home .welcome-group-button {
          display: flex;
          width: 100%;
          height: 58px;
          flex: none;
          align-items: center;
          justify-content: center;
          margin-top: 14px;
          border: 0;
          border-radius: 34px;
          background: ${ACCENT};
          color: #fff;
          font-size: 19px;
          font-weight: 700;
          box-shadow: 0 5px 12px rgba(173, 11, 21, .2);
        }
        @media (max-width: 380px) {
          .bingo-home .hero { margin-right: 16px; margin-left: 16px; }
          .bingo-home .action-panel { margin-right: 16px; margin-left: 16px; }
          .bingo-home .plan-switch { margin-right: 16px; margin-left: 16px; }
          .bingo-home .product-grid { gap: 10px; margin-right: 16px; margin-left: 16px; }
          .bingo-home .product-image { height: 160px; }
          .bingo-home .product-body { padding-right: 10px; padding-left: 10px; }
          .bingo-home .product-stat { font-size: 12px; }
          .bingo-home .product-stat strong { font-size: 11px; }
          .bingo-home .owned-product-card { gap: 10px; padding: 10px; }
          .bingo-home .owned-product-image { width: 92px; height: 92px; }
          .bingo-home .owned-product-name { font-size: 14px; }
          .bingo-home .owned-product-stat,
          .bingo-home .owned-product-stat strong { font-size: 11px; }
          .bingo-home .welcome-content { padding-right: 20px; padding-left: 20px; }
          .bingo-home .welcome-title { font-size: 21px; }
          .bingo-home .welcome-notice { font-size: 16px; }
        }
      `}</style>

      <div className="home-screen">
        <section className="hero" aria-label="Produits Bingo">
          <img src={bingoHero} alt="Gamme de chips Bingo" />
          <div className="hero-dots" aria-hidden="true">
            <span className="hero-dot" />
            <span className="hero-dot muted" />
            <span className="hero-dot muted" />
          </div>
        </section>

        <section className="action-panel" aria-label="Actions rapides">
          {quickActions.map(({ label, href, icon: Icon, image, round }, index) => (
            <button
              key={label}
              type="button"
              className="action-button"
              onClick={() => handleQuickAction(label, href)}
              data-testid={`home-action-${index}`}
            >
              <span className={`action-icon ${round ? "round" : ""}`}>
                {image ? (
                  <span
                    className="action-icon-image"
                    aria-hidden="true"
                    style={{
                      backgroundColor: "currentColor",
                      WebkitMaskImage: `url("${image}")`,
                      maskImage: `url("${image}")`,
                    }}
                  />
                ) : Icon ? (
                  <Icon aria-hidden="true" />
                ) : null}
              </span>
              <span>{label}</span>
            </button>
          ))}
        </section>

        <section className="plan-switch" aria-label="Produits Bingo">
          <button
            type="button"
            className={`plan-button ${productTab === "available" ? "active" : ""}`}
            onClick={() => setProductTab("available")}
            data-testid="button-view-products"
          >
            Voir les produits
          </button>
          <button
            type="button"
            className={`plan-button ${productTab === "owned" ? "active" : ""}`}
            onClick={() => setProductTab("owned")}
            data-testid="button-view-purchased-products"
          >
            Produits achetés
          </button>
        </section>

        <section className="product-grid" aria-label={productTab === "available" ? "Produits disponibles" : "Produits achetés"}>
          {isLoading ? (
            <div className="empty-products">
              <Loader2 className="loader" aria-label="Chargement" />
              <p>Chargement des produits...</p>
            </div>
          ) : visibleProducts.length === 0 ? (
            <div className={`empty-products ${productTab === "owned" ? "empty-owned" : ""}`}>
              {productTab === "owned" ? (
                <img src={emptyStateImage} alt="Aucun produit acheté" />
              ) : (
                <p>Aucun produit disponible.</p>
              )}
            </div>
          ) : productTab === "owned" ? (
            (userProducts || []).map((purchase, index) => {
              const product = purchase.product;
              if (!product) return null;

              const cycleDays = Number(product.cycleDays || 0);
              const daysRemaining = Number(purchase.daysRemaining || 0);
              const daysCompleted = Math.max(0, cycleDays - daysRemaining);
              const nextEarningDate = getNextEarningDate(
                purchase.lastEarningDate,
                purchase.purchasedAt,
              );

              return (
                <article
                  className="owned-product-card"
                  key={purchase.id}
                  data-testid={`home-owned-product-card-${purchase.id}`}
                >
                  <img
                    className="owned-product-image"
                    src={product.imageUrl || productImages[index % productImages.length]}
                    alt={product.name}
                  />
                  <div className="owned-product-info">
                    <h2 className="owned-product-name">{product.name}</h2>
                    <div className="owned-product-stat">
                      <span>Jours restants :</span>
                      <strong>{daysRemaining}</strong>
                    </div>
                    <div className="owned-product-stat">
                      <span>Jours d'exécution :</span>
                      <strong>{daysCompleted} / {cycleDays}</strong>
                    </div>
                    <div className="owned-product-stat">
                      <span>Achat :</span>
                      <strong>{formatDateTime(purchase.purchasedAt)}</strong>
                    </div>
                    <div className="owned-product-stat">
                      <span>Prochain gain :</span>
                      <strong>{formatDateTime(nextEarningDate)}</strong>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            visibleProducts.map((product, index) => (
              <article className="product-card" key={`${product.id}-${index}`}>
                <img
                  className="product-image"
                  src={product.imageUrl || productImages[index % productImages.length]}
                  alt={product.name}
                />
                <div className="product-body">
                  <h2 className="product-name">{product.name}</h2>
                  <div className="product-stat">
                    <span>Prix :</span>
                    <strong>{formatFcfa(product.price)}</strong>
                  </div>
                  <div className="product-stat">
                    <span>Quotidien :</span>
                    <strong>{formatFcfa(product.dailyEarnings)}</strong>
                  </div>
                  <div className="product-stat">
                    <span>Jours :</span>
                    <strong>{product.cycleDays}</strong>
                  </div>
                  <div className="product-stat">
                    <span>Total :</span>
                    <strong>{formatFcfa(product.totalReturn)}</strong>
                  </div>
                  <button
                    type="button"
                    className="product-cta"
                    onClick={() => {
                      if (product.isFree) {
                        claimFreeMutation.mutate(product.id);
                      } else {
                        setConfirmProduct(product);
                      }
                    }}
                    disabled={product.isFree && !product.canClaimFree}
                    data-testid={`button-home-product-${product.id}`}
                  >
                    {product.isFree
                      ? product.canClaimFree ? "Réclamer" : "Déjà réclamé"
                      : "Acheter"}
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </div>

      {welcomePopupRequested && serviceLinks?.groupLink && (
        <div
          className="welcome-overlay"
          role="presentation"
          onClick={() => setWelcomePopupRequested(false)}
        >
          <section
            className="welcome-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-popup-title"
            onClick={(event) => event.stopPropagation()}
          >
            <img className="welcome-logo" src={bingoLogo} alt="Bingo" />
            <button
              type="button"
              className="welcome-close"
              onClick={() => setWelcomePopupRequested(false)}
              aria-label="Fermer"
              data-testid="button-close-welcome-popup"
            >
              <X aria-hidden="true" />
            </button>
            <div className="welcome-content">
              <h2 id="welcome-popup-title" className="welcome-title">
                Welcome to Bingo!
              </h2>
              <div className="welcome-divider" aria-hidden="true" />
              <p className="welcome-notice">
                {welcomeNotice}
              </p>
              <button
                type="button"
                className="welcome-group-button"
                onClick={() => {
                  window.open(serviceLinks.groupLink, "_blank", "noopener,noreferrer");
                  setWelcomePopupRequested(false);
                }}
                data-testid="button-welcome-group"
              >
                Join the group
              </button>
            </div>
          </section>
        </div>
      )}

      {confirmProduct && (
        <PurchaseConfirmModal
          product={confirmProduct}
          currency="FCFA"
          pending={purchaseMutation.isPending}
          onCancel={() => setConfirmProduct(null)}
          onConfirm={() => purchaseMutation.mutate(confirmProduct.id)}
        />
      )}
    </main>
  );
}