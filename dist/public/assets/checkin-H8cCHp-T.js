import{a as x,b as g,u,j as e,L as m,q as s,e as f}from"./index-DchUCKwv.js";import{u as b}from"./useQuery-BaGGPzFw.js";import{u as k}from"./useMutation-C9fXPjt-.js";import{g as w}from"./countries-DOninoG6.js";import{C as j}from"./chevron-left-UdCvj_tU.js";const y="/assets/70df605a42dc9ac4254ef5fd2de61af4_1790106066950-ZA0zkBlV.jpg",v="/assets/1f04fee38bcef670138153670bbc6645_1790106066785-DVnJMtnv.jpg";function A(){const{user:a}=x(),{toast:o}=g(),[,l]=u(),{data:i}=b({queryKey:["/api/daily-bonus-status"],refetchInterval:6e4}),r=k({mutationFn:async()=>{const n=await f("POST","/api/claim-daily-bonus",{});if(!n.ok){const h=await n.json();throw new Error(h.message||"Erreur")}return n.json()},onSuccess:()=>{s.invalidateQueries({queryKey:["/api/daily-bonus-status"]}),s.invalidateQueries({queryKey:["/api/user"]}),o({title:"Bonus reçu !",description:"50 FCFA ajoutés à votre solde"})},onError:n=>{o({title:"Erreur",description:n.message,variant:"destructive"})}});if(!a)return null;const t=w(a.country)?.currency||"XOF",d=i?.totalBonusClaimed||0,c=!!i?.canClaim,p=n=>`${Math.round(n).toLocaleString("fr-FR")} ${t}`;return e.jsxs("main",{className:"checkin-reference min-h-full bg-[#fff7f8] pb-20",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"checkin-screen",children:[e.jsxs("header",{className:"topbar",children:[e.jsx("button",{className:"back",onClick:()=>l("/"),"aria-label":"Retour",children:e.jsx(j,{"aria-hidden":"true"})}),e.jsx("h1",{className:"topbar-title",children:"Pointage"})]}),e.jsxs("div",{className:"content",children:[e.jsxs("section",{className:"reward-card","aria-label":"Récompenses cumulées",children:[e.jsx("img",{src:y,alt:""}),e.jsxs("div",{className:"reward-copy",children:[e.jsx("p",{className:"reward-label",children:"Récompenses cumulées"}),e.jsx("p",{className:"reward-total",children:p(d)})]})]}),e.jsxs("section",{className:"earnings-card","aria-label":"Pointage quotidien",children:[e.jsxs("div",{className:"claim-row",children:[e.jsxs("div",{children:[e.jsx("p",{className:"earnings-heading",children:"Pointer maintenant"}),e.jsx("p",{className:"earnings-subheading",children:"Pointage pendant 0 jours consécutifs"})]}),e.jsx("button",{className:"claim",onClick:()=>r.mutate(),disabled:!c||r.isPending,"data-testid":"button-pointer",children:r.isPending?e.jsx(m,{className:"animate-spin"}):c?"Pointer":`${i?.hoursRemaining||0}h`})]}),e.jsxs("div",{className:"reward-pill",children:["50 ",t]}),e.jsx("p",{className:"claim-prompt",children:"Pointez aujourd'hui et obtenez une récompense"}),!c&&i?.hoursRemaining?e.jsxs("p",{className:"next-claim",children:["Prochain pointage dans ",i.hoursRemaining,"h"]}):null]}),e.jsxs("section",{className:"promo","aria-label":"Récompenses quotidiennes",children:[e.jsx("img",{src:v,alt:""}),e.jsxs("div",{className:"promo-copy",children:[e.jsx("p",{className:"promo-title",children:"Aller au pointage"}),e.jsx("p",{className:"promo-subtitle",children:"Recevez vos récompenses quotidiennes"})]})]}),e.jsxs("ol",{className:"instructions",children:[e.jsxs("li",{children:["Récompense de connexion quotidienne : ",e.jsxs("strong",{children:["50 ",t]}),"."]}),e.jsx("li",{children:"Connectez-vous une fois par jour."}),e.jsx("li",{children:"Connectez-vous à nouveau après minuit chaque jour."})]})]})]})]})}export{A as default};
