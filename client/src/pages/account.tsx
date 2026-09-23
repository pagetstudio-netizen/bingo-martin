import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getCountryByCode } from "@/lib/countries";
import {
  Loader2,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ADMIN_PATH } from "@/lib/admin-path";
import bingoLogo from "@assets/logo-1_1790106035177.png";
import historyIcon from "@assets/internet_15229770_1774888657109-DGZrImts_1790119781490.png";
import giftIcon from "@assets/téléchargement_(66)_1790119781578.png";
import securityIcon from "@assets/mine-mod-change-pwd-D4tL_Aft_1790119781601.png";
import bankCardIcon from "@assets/mine-mod-bankcard-CLOhqwHj_1790119781623.png";
import aboutIcon from "@assets/mine-mod-aboutus-xnaBhqOq_1790119781651.png";

const bingoRed = "#ad0b15";

interface DepositRecord {
  amount: string | number;
  status: string;
}

export default function AccountPage() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [showPinModal, setShowPinModal] = useState(false);
  const [adminPin, setAdminPin] = useState("");

  const { data: deposits = [] } = useQuery<DepositRecord[]>({
    queryKey: ["/api/deposits/history"],
  });

  const verifyPinMutation = useMutation({
    mutationFn: async (pin: string) => {
      const res = await apiRequest("POST", "/api/admin/verify-pin", { pin });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Code PIN incorrect");
      }
      return res.json();
    },
    onSuccess: () => {
      setShowPinModal(false);
      setAdminPin("");
      navigate(ADMIN_PATH);
    },
    onError: (error: Error) => toast({ title: error.message, variant: "destructive" }),
  });

  if (!user) return null;

  const country = getCountryByCode(user.country);
  const balance = Number(user.balance || 0);
  const earnings = Number(user.totalEarnings || 0);
  const recharge = deposits
    .filter((deposit) => deposit.status === "approved")
    .reduce((total, deposit) => total + Number(deposit.amount || 0), 0);
  const formatAmount = (amount: number) => amount.toFixed(2);

  const menuItems = [
    { label: "Historique", icon: historyIcon, href: "/history" },
    { label: "Code cadeau", icon: giftIcon, href: "/gift-code" },
    { label: "Gestion de sécurité", icon: securityIcon, href: "/change-password" },
    { label: "Lier un compte bancaire", icon: bankCardIcon, href: "/wallet" },
    { label: "À propos", icon: aboutIcon, href: "/about" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleAdminClick = () => {
    if (user.isAdminPasswordRequired === false) {
      navigate(ADMIN_PATH);
      return;
    }
    setShowPinModal(true);
  };

  return (
    <main className="account-reference">
      <style>{`
        .account-reference {
          min-height: 100dvh;
          padding-bottom: 59px;
          overflow-x: hidden;
          background: #fff6f7;
          color: #1d1d1d;
          font-family: Arial, Helvetica, sans-serif;
        }
        .account-reference * { box-sizing: border-box; }
        .account-reference .account-screen {
          width: min(100%, 512px);
          min-height: calc(100dvh - 59px);
          margin: 0 auto;
          overflow: hidden;
          background: #fff6f7;
        }
        .account-reference .account-hero {
          position: relative;
          height: 267px;
          overflow: hidden;
          background: #790005;
        }
        .account-reference .account-hero::before {
          position: absolute;
          inset: -20px;
          content: "";
          background:
            linear-gradient(90deg, rgba(87, 0, 4, .88), rgba(139, 5, 7, .58)),
            url("/bingo-home-banner.png") center / cover;
          filter: blur(7px);
          transform: scale(1.05);
        }
        .account-reference .account-hero::after {
          position: absolute;
          inset: 0;
          content: "";
          background: rgba(83, 0, 4, .28);
        }
        .account-reference .account-identity {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: flex-start;
          gap: 34px;
          padding: 53px 34px 0;
          color: #fff;
        }
        .account-reference .account-logo {
          display: block;
          width: 104px;
          height: 83px;
          flex: 0 0 auto;
          object-fit: cover;
        }
        .account-reference .account-id {
          margin: 4px 0 9px;
          font-size: 31px;
          font-weight: 700;
          line-height: 1;
          white-space: nowrap;
        }
        .account-reference .vip {
          display: inline-flex;
          min-width: 68px;
          height: 27px;
          align-items: center;
          justify-content: center;
          border: 1px solid #fff;
          border-radius: 6px;
          padding: 0 10px;
          font-size: 16px;
          letter-spacing: 3px;
          line-height: 1;
        }
        .account-reference .account-metrics {
          position: absolute;
          right: 28px;
          bottom: 47px;
          left: 28px;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          color: #fff;
          text-align: center;
        }
        .account-reference .metric-value {
          margin: 0 0 5px;
          font-size: 20px;
          line-height: 1;
        }
        .account-reference .metric-label {
          margin: 0;
          font-size: 15px;
          line-height: 1.15;
        }
        .account-reference .account-menu {
          display: grid;
          gap: 14px;
          padding: 15px 20px 25px;
        }
        .account-reference .account-menu-item {
          display: flex;
          width: 100%;
          min-height: 106px;
          align-items: center;
          gap: 17px;
          border: 0;
          border-radius: 17px;
          padding: 18px 20px;
          background: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, .08);
          color: #242424;
          font-size: 17px;
          text-align: left;
        }
        .account-reference .account-menu-icon {
          display: grid;
          width: 58px;
          height: 58px;
          flex: 0 0 auto;
          place-items: center;
          background: transparent;
        }
        .account-reference .account-menu-icon-image {
          display: block;
          width: 53px;
          height: 53px;
          object-fit: contain;
          filter: brightness(0) saturate(100%) invert(14%) sepia(96%) saturate(5000%) hue-rotate(351deg) brightness(80%) contrast(101%);
        }
        .account-reference .account-menu-label {
          color: ${bingoRed};
          font-weight: 600;
          line-height: 1.25;
        }
        .account-reference .account-footer-actions {
          padding: 0 20px 24px;
        }
        .account-reference .logout,
        .account-reference .admin {
          display: flex;
          width: 100%;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
        }
        .account-reference .logout {
          border: 1px solid ${bingoRed};
          color: ${bingoRed};
          background: #fff;
        }
        .account-reference .admin {
          margin-top: 12px;
          border: 0;
          color: #fff;
          background: ${bingoRed};
        }
        @media (max-width: 380px) {
          .account-reference .account-identity { gap: 22px; padding-right: 24px; padding-left: 24px; }
          .account-reference .account-logo { width: 94px; height: 75px; }
          .account-reference .account-id { font-size: 25px; }
          .account-reference .account-metrics { right: 18px; left: 18px; }
          .account-reference .metric-value { font-size: 18px; }
          .account-reference .metric-label { font-size: 13px; }
          .account-reference .account-menu { padding-right: 16px; padding-left: 16px; }
          .account-reference .account-menu-item { min-height: 96px; padding-right: 16px; padding-left: 16px; }
        }
      `}</style>

      <div className="account-screen">
        <section className="account-hero" aria-label="Résumé du compte">
          <div className="account-identity">
            <img className="account-logo" src={bingoLogo} alt="Bingo" />
            <div>
              <p className="account-id">ID: {user.phone}</p>
              <span className="vip">VIP0</span>
            </div>
          </div>

          <div className="account-metrics">
            <div>
              <p className="metric-value">{formatAmount(balance)}</p>
              <p className="metric-label">Balance</p>
            </div>
            <div>
              <p className="metric-value">{formatAmount(recharge)}</p>
              <p className="metric-label">Recharge</p>
            </div>
            <div>
              <p className="metric-value">{formatAmount(earnings)}</p>
              <p className="metric-label">Total income</p>
            </div>
          </div>
        </section>

        <section className="account-menu" aria-label="Options du compte">
          {menuItems.map(({ label, icon, href }) => (
            <button
              key={href}
              type="button"
              className="account-menu-item"
              onClick={() => navigate(href)}
              data-testid={`account-menu-${href.slice(1)}`}
            >
              <span className="account-menu-icon" aria-hidden="true">
                <img className="account-menu-icon-image" src={icon} alt="" />
              </span>
              <span className="account-menu-label">{label}</span>
            </button>
          ))}
        </section>

        <div className="account-footer-actions">
          <button className="logout" onClick={handleLogout} data-testid="button-logout">
            <LogOut size={20} />
            Déconnexion
          </button>
          {user.isAdmin && (
            <button className="admin" onClick={handleAdminClick} data-testid="button-admin">
              <ShieldCheck size={17} />
              Panel Admin
            </button>
          )}
        </div>
      </div>

      <Dialog open={showPinModal} onOpenChange={setShowPinModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">Code d'accès administrateur</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Entrez votre code PIN pour accéder au panel administrateur
            </p>
            <Input
              type="password"
              value={adminPin}
              onChange={(event) => setAdminPin(event.target.value)}
              placeholder="Code PIN"
              className="text-center text-2xl tracking-widest"
              maxLength={8}
              data-testid="input-admin-pin"
            />
            <Button
              onClick={() => {
                if (adminPin.length < 4) {
                  toast({ title: "Le code PIN doit contenir au moins 4 caractères", variant: "destructive" });
                  return;
                }
                verifyPinMutation.mutate(adminPin);
              }}
              disabled={verifyPinMutation.isPending || adminPin.length < 4}
              className="w-full bg-[#249daf] hover:bg-[#1c8796]"
              data-testid="button-verify-pin"
            >
              {verifyPinMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirmer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}