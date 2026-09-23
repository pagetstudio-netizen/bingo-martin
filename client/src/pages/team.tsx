import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import bingoLogo from "@assets/logo-1_1790106035177.png";
import emptyStateImage from "@assets/05b94578-92ae-48a6-b863-59d59ee49423_1790114751100.png";

interface TeamStats {
  level1Count: number;
  level2Count: number;
  level3Count: number;
  totalCommission: number;
  teamRecharge: number;
}

interface TeamMember {
  id: number;
  fullName: string;
  phone: string;
  country: string;
  createdAt: string;
  hasActiveProduct: boolean;
  hasPurchasedProduct: boolean;
  totalDeposited: number;
  totalWithdrawn: number;
}

interface TeamDetails {
  level1: TeamMember[];
  level2: TeamMember[];
  level3: TeamMember[];
}

const levelLabels = ["LV:1", "LV:2", "LV:3"] as const;

function formatFcfa(value: number | string | null | undefined) {
  return `${Number(value || 0).toLocaleString("fr-FR")} FCFA`;
}

function maskPhone(phone: string) {
  if (phone.length <= 4) return phone;
  if (phone.length > 8) return `${phone.slice(0, 3)}*****${phone.slice(-6)}`;
  return `${phone.slice(0, 2)}****${phone.slice(-2)}`;
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TeamPage() {
  const { user } = useAuth();
  const [activeLevel, setActiveLevel] = useState<0 | 1 | 2>(0);

  const { data: stats, isLoading: statsLoading } = useQuery<TeamStats>({
    queryKey: ["/api/team/stats"],
  });

  const { data: details, isLoading: detailsLoading } = useQuery<TeamDetails>({
    queryKey: ["/api/team/details"],
  });

  if (!user) return null;

  const members = [
    details?.level1 || [],
    details?.level2 || [],
    details?.level3 || [],
  ][activeLevel];
  const teamSize =
    (stats?.level1Count || 0) +
    (stats?.level2Count || 0) +
    (stats?.level3Count || 0);
  const isLoading = statsLoading || detailsLoading;

  return (
    <main className="team-mobile">
      <style>{`
        .team-mobile {
          min-height: 100dvh;
          padding-bottom: 59px;
          overflow-x: hidden;
          background: #f7f7f7;
          color: #232323;
          font-family: Arial, Helvetica, sans-serif;
        }
        .team-mobile * { box-sizing: border-box; }
        .team-mobile .team-screen {
          width: min(100%, 512px);
          min-height: calc(100dvh - 59px);
          margin: 0 auto;
          background: #f7f7f7;
        }
        .team-mobile .team-appbar {
          display: grid;
          height: 50px;
          place-items: center;
          background: #b10813;
          color: #fff;
          font-size: 23px;
          font-weight: 400;
        }
        .team-mobile .team-hero {
          position: relative;
          height: 285px;
          overflow: hidden;
          background: #b10813;
        }
        .team-mobile .team-hero-art {
          display: block;
          width: 100%;
          height: 209px;
          object-fit: cover;
          object-position: center;
        }
        .team-mobile .team-stat-panel {
          position: absolute;
          right: 20px;
          bottom: 0;
          left: 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 108px;
          border-radius: 0 0 5px 5px;
          background: #b10813;
          color: white;
          text-align: center;
        }
        .team-mobile .team-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 18px;
        }
        .team-mobile .team-stat-label {
          font-size: 17px;
          line-height: 1;
        }
        .team-mobile .team-stat-value {
          font-size: 20px;
          font-weight: 700;
          line-height: 1;
        }
        .team-mobile .level-switch {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          height: 57px;
          margin: 13px 20px 24px;
          padding: 5px;
          border: 1px solid #b10813;
          border-radius: 15px;
          background: #b10813;
        }
        .team-mobile .level-button {
          border: 0;
          border-radius: 10px;
          background: transparent;
          color: #fff;
          font-size: 18px;
          font-weight: 400;
        }
        .team-mobile .level-button.active {
          background: #fff;
          color: #a30812;
        }
        .team-mobile .members {
          min-height: 450px;
          padding: 0 18px 20px;
        }
        .team-mobile .member-card {
          display: grid;
          grid-template-columns: 58px minmax(0, 1fr) auto;
          align-items: center;
          gap: 13px;
          min-height: 142px;
          margin-bottom: 14px;
          padding: 15px 14px;
          border-radius: 13px;
          background: #fff;
          box-shadow: 0 1px 6px rgba(0,0,0,.12);
        }
        .team-mobile .member-logo {
          display: grid;
          width: 55px;
          height: 55px;
          place-items: center;
          overflow: hidden;
          border-radius: 50%;
          background: #ffe100;
        }
        .team-mobile .member-logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .team-mobile .member-info { min-width: 0; }
        .team-mobile .member-phone {
          overflow: hidden;
          color: #202020;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.25;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .team-mobile .member-row {
          display: flex;
          flex-wrap: wrap;
          gap: 4px 12px;
          margin-top: 9px;
          color: #8b8b8b;
          font-size: 14px;
          line-height: 1.25;
        }
        .team-mobile .member-time {
          margin-top: 6px;
          color: #8b8b8b;
          font-size: 13px;
          line-height: 1.25;
        }
        .team-mobile .member-status {
          min-width: 76px;
          padding: 11px 8px;
          border-radius: 5px;
          background: #1dbb4b;
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          text-align: center;
        }
        .team-mobile .no-data {
          display: flex;
          min-height: 340px;
          align-items: center;
          justify-content: center;
        }
        .team-mobile .no-data img {
          width: 190px;
          height: 190px;
          object-fit: contain;
        }
        .team-mobile .loading {
          display: grid;
          min-height: 340px;
          place-items: center;
          color: #b10813;
        }
        .team-mobile .loading svg { width: 32px; height: 32px; }
        @media (max-width: 380px) {
          .team-mobile .team-stat-panel { right: 14px; left: 14px; }
          .team-mobile .team-stat-label { font-size: 15px; }
          .team-mobile .team-stat-value { font-size: 18px; }
          .team-mobile .level-switch { margin-right: 14px; margin-left: 14px; }
          .team-mobile .members { padding-right: 14px; padding-left: 14px; }
          .team-mobile .member-card { grid-template-columns: 48px minmax(0, 1fr) auto; gap: 9px; padding-right: 9px; padding-left: 9px; }
          .team-mobile .member-logo { width: 47px; height: 47px; }
          .team-mobile .member-phone { font-size: 13px; }
          .team-mobile .member-row, .team-mobile .member-time { font-size: 11px; }
          .team-mobile .member-status { min-width: 64px; padding-right: 4px; padding-left: 4px; font-size: 11px; }
          .team-mobile .no-data { font-size: 33px; }
        }
      `}</style>

      <div className="team-screen">
        <header className="team-appbar">Team</header>

        <section className="team-hero" aria-label="Statistiques de l'équipe">
          <img className="team-hero-art" src="/bingo-home-banner.png" alt="" />
          <div className="team-stat-panel">
            <div className="team-stat">
              <span className="team-stat-label">Team Recharge</span>
              <strong className="team-stat-value">{formatFcfa(stats?.teamRecharge)}</strong>
            </div>
            <div className="team-stat">
              <span className="team-stat-label">Team size</span>
              <strong className="team-stat-value">{teamSize}</strong>
            </div>
          </div>
        </section>

        <section className="level-switch" aria-label="Niveaux des filleuls">
          {levelLabels.map((label, index) => (
            <button
              key={label}
              type="button"
              className={`level-button ${activeLevel === index ? "active" : ""}`}
              onClick={() => setActiveLevel(index as 0 | 1 | 2)}
              data-testid={`team-level-${index + 1}`}
            >
              {label}
            </button>
          ))}
        </section>

        <section className="members" aria-label={`Filleuls ${levelLabels[activeLevel]}`}>
          {isLoading ? (
            <div className="loading">
              <Loader2 className="animate-spin" aria-label="Chargement" />
            </div>
          ) : members.length === 0 ? (
            <div className="no-data">
              <img src={emptyStateImage} alt="Aucune donnée disponible" />
            </div>
          ) : (
            members.map((member) => (
              <article className="member-card" key={member.id}>
                <div className="member-logo">
                  <img src={bingoLogo} alt="" />
                </div>
                <div className="member-info">
                  <p className="member-phone">Téléphone mobile : {maskPhone(member.phone)}</p>
                  <div className="member-row">
                    <span>Dépôt : {formatFcfa(member.totalDeposited)}</span>
                    <span>Retrait : {formatFcfa(member.totalWithdrawn)}</span>
                  </div>
                  <p className="member-time">Heure : {formatDate(member.createdAt)}</p>
                </div>
                {member.hasPurchasedProduct && (
                  <span className="member-status">Acheté</span>
                )}
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}