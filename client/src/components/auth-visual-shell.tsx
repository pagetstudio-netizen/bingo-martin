import type { ReactNode } from "react";
import bingoLogo from "@assets/logo-1_1790106035177.png";

interface AuthVisualShellProps {
  activeTab: "login" | "register";
  onLogin: () => void;
  onRegister: () => void;
  children: ReactNode;
}

export function AuthVisualShell({
  activeTab,
  onLogin,
  onRegister,
  children,
}: AuthVisualShellProps) {
  return (
    <main className="bingo-auth-page">
      <style>{`
        .bingo-auth-page {
          min-height: 100dvh;
          overflow-x: hidden;
          background: #bd0713;
          color: #171717;
          font-family: Arial, Helvetica, sans-serif;
        }
        .bingo-auth-page *,
        .bingo-auth-page *::before,
        .bingo-auth-page *::after {
          box-sizing: border-box;
        }
        .bingo-auth-screen {
          width: 100%;
          max-width: 512px;
          min-height: 100dvh;
          margin: 0 auto;
          padding-bottom: 36px;
          background: #bd0713;
        }
        .bingo-auth-hero {
          position: relative;
          height: 190px;
          overflow: visible;
          background: #bd0713;
        }
        .bingo-auth-hero-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: fill;
          object-position: center;
        }
        .bingo-auth-logo {
          position: absolute;
          z-index: 2;
          bottom: 12px;
          left: 50%;
          width: 82px;
          height: 82px;
          overflow: hidden;
          border: 2px solid rgba(255, 255, 255, .2);
          border-radius: 50%;
          background: #ffc20d;
          box-shadow: 0 4px 9px rgba(92, 0, 6, .24);
          transform: translateX(-50%);
        }
        .bingo-auth-logo img {
          display: block;
          width: 160%;
          height: 160%;
          max-width: none;
          transform: translate(-28%, -26%);
        }
        .bingo-auth-card {
          position: relative;
          z-index: 10;
          width: calc(100% - 68px);
          min-height: 390px;
          margin: 28px auto 0;
          padding: 24px 28px 28px;
          border-radius: 20px;
          background: #fff;
          box-shadow: 0 4px 10px rgba(77, 0, 8, .08);
        }
        .bingo-auth-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: end;
          margin-bottom: 18px;
        }
        .bingo-auth-tab {
          position: relative;
          height: 40px;
          border: 0;
          padding: 0 0 9px;
          background: transparent;
          color: #161616;
          font-size: 24px;
          font-weight: 400;
          line-height: 1;
        }
        .bingo-auth-tab.active::after {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          height: 4px;
          border-radius: 3px;
          background: #a90813;
          content: "";
        }
        .bingo-auth-content form {
          width: 100%;
        }
        .bingo-auth-fields {
          display: grid;
          gap: 12px;
        }
        .bingo-auth-field {
          display: flex;
          width: 100%;
          min-width: 0;
          height: 56px;
          align-items: center;
          border: 0;
          border-radius: 34px;
          padding: 0 17px;
          background: #f2f2f2;
        }
        .bingo-auth-field.phone {
          border: 2px solid #a90813;
          background: #fafafa;
        }
        .bingo-auth-field input {
          width: 0;
          min-width: 0;
          flex: 1 1 auto;
          border: 0;
          outline: 0;
          background: transparent;
          color: #262626;
          font-size: 17px;
          font-weight: 400;
        }
        .bingo-auth-field input::placeholder {
          color: #777;
          opacity: 1;
        }
        .bingo-auth-prefix {
          display: flex;
          flex: none;
          height: 30px;
          align-items: center;
          gap: 10px;
          margin-right: 12px;
          border: 0;
          border-right: 1px solid #89909c;
          padding: 0 12px 0 0;
          background: transparent;
          color: #1d1d1d;
          font-size: 17px;
          white-space: nowrap;
        }
        .bingo-auth-prefix::after {
          display: block;
          margin-left: 2px;
          color: #8d95a4;
          content: "›";
          font-size: 25px;
          line-height: 1;
        }
        .bingo-auth-prefix svg {
          display: none;
        }
        .bingo-auth-prefix .prefix-chevron {
          display: block;
          width: 17px;
          height: 17px;
          margin-left: -8px;
          color: #8d95a4;
          stroke-width: 2;
        }
        .bingo-auth-field-icon {
          width: 22px;
          height: 22px;
          flex: none;
          margin-left: 2px;
          margin-right: 13px;
          color: #9ba3b2;
          stroke-width: 2;
        }
        .bingo-auth-eye {
          display: grid;
          width: 28px;
          height: 30px;
          flex: none;
          place-items: center;
          margin-left: 8px;
          border: 0;
          padding: 0;
          background: transparent;
          color: #9ba3b2;
        }
        .bingo-auth-eye svg {
          width: 21px;
          height: 21px;
        }
        .bingo-auth-error {
          margin: -10px 8px -4px;
          color: #b10813;
          font-size: 12px;
        }
        .bingo-auth-submit {
          display: grid;
          width: 100%;
          height: 58px;
          place-items: center;
          margin-top: 18px;
          border: 0;
          border-radius: 36px;
          background: #b10813;
          color: #fff;
          font-size: 21px;
          font-weight: 400;
          box-shadow: 0 10px 18px rgba(177, 8, 19, .22);
          transition: transform .12s ease, opacity .12s ease;
        }
        .bingo-auth-submit:active {
          transform: scale(.98);
        }
        .bingo-auth-submit:disabled {
          opacity: .65;
        }
        .bingo-auth-switch {
          display: block;
          width: fit-content;
          margin: 16px auto 0;
          border: 0;
          padding: 0;
          background: transparent;
          color: #171717;
          font-size: 16px;
          line-height: 1.35;
          text-align: center;
        }
        @media (max-width: 380px) {
          .bingo-auth-hero { height: 175px; }
          .bingo-auth-logo { width: 76px; height: 76px; bottom: 10px; }
          .bingo-auth-card {
            width: calc(100% - 36px);
            margin-top: 22px;
            padding: 20px 22px 24px;
          }
          .bingo-auth-tab { font-size: 22px; }
          .bingo-auth-field input,
          .bingo-auth-prefix { font-size: 17px; }
        }
      `}</style>

      <div className="bingo-auth-screen">
        <div className="bingo-auth-hero">
          <img
            className="bingo-auth-hero-image"
            src="/bingo-home-banner.png"
            alt="Bingo Original Style"
          />
          <div className="bingo-auth-logo" aria-hidden="true">
            <img src={bingoLogo} alt="" />
          </div>
        </div>

        <section className="bingo-auth-card">
          <nav className="bingo-auth-tabs" aria-label="Authentication">
            <button
              type="button"
              className={`bingo-auth-tab ${activeTab === "login" ? "active" : ""}`}
              onClick={onLogin}
              data-testid="tab-login"
            >
              Login
            </button>
            <button
              type="button"
              className={`bingo-auth-tab ${activeTab === "register" ? "active" : ""}`}
              onClick={onRegister}
              data-testid="tab-register"
            >
              Register
            </button>
          </nav>
          <div className="bingo-auth-content">{children}</div>
        </section>
      </div>
    </main>
  );
}