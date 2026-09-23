import{a as q,b as E,G as P,r as l,u as T,j as e,L as k,f as j,e as V}from"./index-CwW_ncts.js";import{u as x}from"./useQuery-CK-f9vTw.js";import{u as $}from"./useMutation-Bx4tAdQ8.js";import{g as D}from"./countries-DOninoG6.js";import{T as O}from"./trending-up-ClyTQoAH.js";import{C as _}from"./chevron-right-Dpxt-tFY.js";const G="/assets/t%C3%A9l%C3%A9chargement_(80)_1787363581764-DIwCG-l1.png",K="/assets/70df605a42dc9ac4254ef5fd2de61af4_1790106066950-ZA0zkBlV.jpg",Q="/assets/internet_15229770_1774888657109-DGZrImts_1790119781490-DGZrImts.png";function te(){const{user:d,refreshUser:z}=q(),{toast:a}=E(),N=P(),[n,u]=l.useState(""),[r,g]=l.useState(null),[,C]=T(),b=(d?D(d.country):null)?.currency||"XOF",h=b==="FCFA"?"XOF":b,{data:s}=x({queryKey:["/api/settings/withdrawal"],staleTime:0,refetchOnMount:!0}),p=s?.minWithdrawal??1500,w=s?.withdrawalFees??18,m=s?.withdrawalStartHour??9,y=s?.withdrawalEndHour??17,I=n?Math.floor(Number(n)*(1-w/100)):0,v=new Date().getHours(),F=v>=m&&v<y,{data:i=[],isLoading:S}=x({queryKey:["/api/wallets"],refetchOnWindowFocus:!0}),{data:L=[]}=x({queryKey:["/api/user/products"]}),W=L.some(t=>t.status==="active");l.useEffect(()=>{const t=localStorage.getItem("selectedWalletId");if(t&&i.length>0){const o=i.find(M=>M.id===parseInt(t));o&&g(o),localStorage.removeItem("selectedWalletId")}},[i]),l.useEffect(()=>{if(!r&&i.length>0){const t=i.find(o=>o.isDefault);t&&g(t)}},[i,r]);const f=$({mutationFn:async t=>(await V("POST","/api/withdrawals",t)).json(),onSuccess:()=>{a({title:"Demande envoyée",description:"Votre demande de retrait a été envoyée."}),z(),N.invalidateQueries({queryKey:["/api/withdrawals"]}),u("")},onError:t=>{a({title:"Retrait échoué",description:t.message||"Impossible d'enregistrer le retrait.",variant:"destructive"})}}),A=()=>{if(!F){a({title:"Horaires de retrait",description:`Les retraits sont disponibles de ${m}h à ${y}h`,variant:"destructive"});return}if(!W){a({title:"Produit requis",description:"Vous devez avoir un produit actif pour effectuer un retrait",variant:"destructive"});return}if(!n||n<p){a({title:"Montant invalide",description:`Le montant minimum est de ${p} ${h}`,variant:"destructive"});return}if(!r){a({title:"Compte requis",description:"Veuillez sélectionner un compte bancaire",variant:"destructive"});return}f.mutate({amount:Number(n),walletId:r.id})};if(S)return e.jsx("div",{className:"min-h-screen bg-white flex items-center justify-center",children:e.jsx(k,{className:"w-8 h-8 animate-spin text-[#c8102e]"})});if(!d)return null;const R=parseFloat(d?.balance||"0"),H=i.length>0,c=h==="XOF"?"FCFA":h;return e.jsxs("main",{className:"withdraw-reference min-h-screen bg-[#f7f4f2]",children:[e.jsx("style",{children:`
        .withdraw-reference {
          color: #151515;
          font-family: Inter, Arial, sans-serif;
        }
        .withdraw-reference .withdraw-screen {
          width: 100%;
          max-width: 500px;
          min-height: 100vh;
          margin: 0 auto;
          overflow: hidden;
          background: #f7f4f2;
        }
        .withdraw-reference .withdraw-hero {
          position: relative;
          height: min(70.7vw, 354px);
          min-height: 283px;
          background: #ffca2b;
        }
        .withdraw-reference .history-button {
          position: absolute;
          z-index: 3;
          top: 14px;
          right: 16px;
          display: grid;
          width: 44px;
          height: 44px;
          place-items: center;
          border: 0;
          border-radius: 12px;
          background: rgba(255,255,255,.24);
        }
        .withdraw-reference .history-icon {
          position: relative;
          width: 30px;
          height: 30px;
          border: 2px solid #3174d1;
          border-radius: 4px;
          background: transparent;
        }
        .withdraw-reference .history-icon::before {
          position: absolute;
          top: 6px;
          left: 5px;
          width: 16px;
          height: 2px;
          content: "";
          background: #3174d1;
          box-shadow: 0 6px 0 #3174d1;
        }
        .withdraw-reference .history-icon::after {
          position: absolute;
          right: -7px;
          bottom: -7px;
          width: 11px;
          height: 11px;
          border: 2px solid #3174d1;
          border-radius: 50%;
          content: "";
          background: #ffcf3e;
        }
        .withdraw-reference .hero-art {
          position: relative;
          width: 100%;
          height: min(36.65vw, 183px);
          overflow: hidden;
        }
        .withdraw-reference .hero-art::before,
        .withdraw-reference .hero-art::after {
          position: absolute;
          content: "";
          border-radius: 42% 58% 52% 48%;
          background: #fdb900;
          transform: rotate(-12deg);
        }
        .withdraw-reference .hero-art::before {
          top: -24px;
          left: -25px;
          width: 168px;
          height: 128px;
          box-shadow:
            84px 23px 0 -20px #fdb900,
            330px 18px 0 5px rgba(255,255,255,.14);
        }
        .withdraw-reference .hero-art::after {
          top: 33px;
          right: 58px;
          width: 121px;
          height: 92px;
          background: rgba(255,255,255,.16);
          transform: rotate(18deg);
        }
        .withdraw-reference .hero-pattern {
          position: absolute;
          top: 10px;
          right: -24px;
          width: 205px;
          height: 145px;
          border-radius: 50%;
          background: rgba(255,255,255,.12);
          transform: rotate(-18deg);
        }
        .withdraw-reference .withdraw-title {
          position: absolute;
          z-index: 2;
          top: 82px;
          right: 0;
          left: 0;
          margin: 0;
          color: #111;
          font-size: 28px;
          font-weight: 500;
          line-height: 1;
          text-align: center;
        }
        .withdraw-reference .receipt-icon {
          position: absolute;
          z-index: 2;
          top: 15px;
          right: 25px;
          width: 25px;
          height: 31px;
          border: 3px solid #40b9cf;
          border-radius: 4px;
          transform: rotate(2deg);
        }
        .withdraw-reference .receipt-icon::before,
        .withdraw-reference .receipt-icon::after {
          position: absolute;
          left: 5px;
          content: "";
          width: 10px;
          height: 3px;
          border-radius: 3px;
          background: #40b9cf;
        }
        .withdraw-reference .receipt-icon::before {
          top: 8px;
          box-shadow: 0 7px 0 #40b9cf;
        }
        .withdraw-reference .receipt-icon::after {
          top: 20px;
          left: 12px;
          width: 6px;
          height: 6px;
          border: 2px solid #40b9cf;
          border-radius: 50%;
          background: transparent;
        }
        .withdraw-reference .withdraw-back {
          position: absolute;
          z-index: 3;
          top: 85px;
          left: 24px;
          width: 40px;
          height: 40px;
          border: 0;
          background: transparent;
        }
        .withdraw-reference .withdraw-back::before {
          position: absolute;
          top: 14px;
          left: 9px;
          width: 14px;
          height: 14px;
          border-bottom: 3px solid #111;
          border-left: 3px solid #111;
          content: "";
          transform: rotate(45deg);
        }
        .withdraw-reference .balance-card {
          position: absolute;
          top: min(36.45vw, 182px);
          right: 16px;
          left: 16px;
          height: 160px;
          overflow: hidden;
          border: 2px solid rgba(255,255,255,.88);
          border-radius: 10px;
          background: linear-gradient(110deg, #ffd45d 0%, #ffe69a 100%);
          box-shadow: 0 1px 2px rgba(202,151,0,.1);
        }
        .withdraw-reference .balance-label {
          margin: 29px 0 0 15px;
          color: #eb7123;
          font-size: 23px;
          font-weight: 800;
          line-height: 1;
        }
        .withdraw-reference .balance-value {
          margin: 20px 0 0 15px;
          color: #f36d17;
          font-size: 43px;
          font-weight: 800;
          line-height: .9;
        }
        .withdraw-reference .balance-value span {
          margin-left: 3px;
          font-size: 28px;
        }
        .withdraw-reference .wallet-mark {
          position: absolute;
          top: 14px;
          right: 14px;
          display: grid;
          width: 109px;
          height: 109px;
          place-items: center;
          border-radius: 50%;
          background: white;
        }
        .withdraw-reference .wallet-mark img {
          width: 67px;
          height: 67px;
          object-fit: contain;
        }
        .withdraw-reference .amount-panel {
          min-height: 154px;
          padding: 25px 35px 16px;
          background: white;
        }
        .withdraw-reference .amount-label {
          margin: 0 0 7px 9px;
          color: #c98e41;
          font-size: 16px;
          font-weight: 400;
        }
        .withdraw-reference .amount-field {
          display: flex;
          height: 54px;
          align-items: center;
          overflow: hidden;
          border-radius: 12px;
          background: #f3f0ee;
        }
        .withdraw-reference .amount-field input {
          width: 100%;
          min-width: 0;
          height: 100%;
          padding: 0 21px;
          border: 0;
          outline: 0;
          background: transparent;
          color: #656565;
          font-size: 19px;
        }
        .withdraw-reference .amount-field input::placeholder { color: #777; opacity: 1; }
        .withdraw-reference .amount-currency {
          padding-right: 20px;
          color: #767676;
          font-size: 24px;
        }
        .withdraw-reference .amount-details {
          display: flex;
          justify-content: space-between;
          margin-top: 14px;
          color: #191919;
          font-size: 14px;
        }
        .withdraw-reference .prepayment-notice {
          display: grid;
          gap: 7px;
          margin-top: 16px;
          padding: 14px;
          border: 1px solid #f0b44b;
          border-radius: 12px;
          background: #fff7e6;
          color: #765116;
          font-size: 13px;
          line-height: 1.45;
        }
        .withdraw-reference .prepayment-notice strong {
          color: #8a4b00;
          font-size: 14px;
        }
        .withdraw-reference .pay-prepayment {
          display: inline-flex;
          min-height: 38px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 0;
          border-radius: 20px;
          background: #f29b16;
          color: white;
          font-weight: 700;
        }
        .withdraw-reference .pay-prepayment:disabled { opacity: .55; }
        .withdraw-reference .wallet-choice {
          display: flex;
          width: calc(100% - 32px);
          height: 53px;
          align-items: center;
          margin: 12px 16px 0;
          padding: 0 17px;
          border-radius: 5px;
          background: linear-gradient(112deg, #d51b3d 0%, #9f1028 100%);
          color: white;
          text-align: left;
          box-shadow: 0 1px 2px rgba(214,153,0,.15);
        }
        .withdraw-reference .wallet-choice img {
          width: 34px;
          height: 34px;
          margin-right: 10px;
          object-fit: contain;
        }
        .withdraw-reference .wallet-choice svg:last-child {
          width: 22px;
          height: 22px;
          margin-left: auto;
        }
        .withdraw-reference .wallet-copy {
          overflow: hidden;
          font-size: 16px;
          font-weight: 400;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .withdraw-reference .instructions {
          padding: 28px 9px 20px;
        }
        .withdraw-reference .instructions-title {
          margin-bottom: 29px;
          font-size: 17px;
          font-weight: 800;
        }
        .withdraw-reference .instructions-title::before {
          content: "💸";
          margin-right: 8px;
          font-size: 17px;
        }
        .withdraw-reference .instruction {
          position: relative;
          margin: 0 0 26px 28px;
          font-size: 17px;
          font-weight: 500;
          line-height: 1.65;
        }
        .withdraw-reference .instruction::before {
          content: "◆";
          position: absolute;
          top: 2px;
          left: -19px;
          color: #579ad8;
          font-size: 9px;
        }
        .withdraw-reference .instruction strong { font-weight: 800; }
        .withdraw-reference .submit {
          display: flex;
          width: calc(100% - 48px);
          min-height: 57px;
          align-items: center;
          justify-content: center;
          margin: 4px 24px 35px;
          border-radius: 29px;
          background: linear-gradient(112deg, #d51b3d 0%, #9f1028 100%);
          color: white;
          font-size: 17px;
          font-weight: 600;
        }
        .withdraw-reference .submit:disabled { opacity: .6; }
        @media (max-width: 360px) {
          .withdraw-reference .balance-card { right: 10px; left: 10px; }
          .withdraw-reference .wallet-mark { transform: scale(.82); transform-origin: top right; }
          .withdraw-reference .balance-label { font-size: 20px; }
          .withdraw-reference .balance-value { font-size: 37px; }
          .withdraw-reference .amount-panel { padding-right: 25px; padding-left: 25px; }
          .withdraw-reference .instruction { font-size: 15px; }
        }

        .withdraw-reference {
          background: #f2f2f2;
          color: #1d1d1d;
          font-family: Arial, Helvetica, sans-serif;
        }
        .withdraw-reference .withdraw-screen {
          max-width: 500px;
          background: #f2f2f2;
        }
        .withdraw-reference .withdraw-hero {
          height: min(54vw, 270px);
          min-height: 250px;
          background: #8e0000;
        }
        .withdraw-reference .hero-art {
          height: 100%;
          background-color: #8e0000;
          background-position: center;
          background-size: cover;
        }
        .withdraw-reference .hero-art::before,
        .withdraw-reference .hero-art::after,
        .withdraw-reference .hero-pattern {
          display: none;
        }
        .withdraw-reference .withdraw-title {
          top: 50%;
          color: #fff;
          font-size: clamp(32px, 8vw, 48px);
          font-weight: 500;
          letter-spacing: 2px;
          text-shadow:
            -1px -1px 0 #16b83b,
            1px -1px 0 #16b83b,
            -1px 1px 0 #16b83b,
            1px 1px 0 #16b83b,
            0 3px 8px rgba(0,0,0,.6);
          transform: translateY(-50%);
        }
        .withdraw-reference .withdraw-back {
          top: 18px;
          left: 15px;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(0,0,0,.25);
        }
        .withdraw-reference .withdraw-back::before {
          top: 13px;
          left: 16px;
          width: 13px;
          height: 13px;
          border-color: #fff;
        }
        .withdraw-reference .history-button {
          top: 18px;
          right: 15px;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255,255,255,.88);
        }
        .withdraw-reference .history-icon {
          width: 25px;
          height: 27px;
          border-color: #222;
        }
        .withdraw-reference .history-icon::before {
          background: #222;
          box-shadow: 0 6px 0 #222;
        }
        .withdraw-reference .history-icon::after {
          border-color: #222;
          background: #fff;
        }
        .withdraw-reference .receipt-icon {
          top: 28px;
          right: 62px;
          border-color: #222;
        }
        .withdraw-reference .receipt-icon::before {
          background: #222;
          box-shadow: 0 7px 0 #222;
        }
        .withdraw-reference .receipt-icon::after {
          border-color: #222;
        }
        .withdraw-reference .balance-card {
          position: relative;
          top: auto;
          right: auto;
          left: auto;
          height: auto;
          min-height: 84px;
          margin: 0;
          padding: 18px 22px;
          border: 0;
          border-radius: 0;
          background: #f2f2f2;
          box-shadow: none;
        }
        .withdraw-reference .balance-label {
          margin: 0 0 14px;
          color: #1d1d1d;
          font-size: 21px;
          font-weight: 400;
        }
        .withdraw-reference .balance-value {
          display: flex;
          min-height: 82px;
          align-items: center;
          justify-content: center;
          margin: 0;
          border-radius: 11px;
          background: #fff;
          color: #c8102e;
          font-size: 29px;
          font-weight: 400;
          line-height: 1;
          box-shadow: 0 1px 2px rgba(0,0,0,.03);
        }
        .withdraw-reference .balance-value::before {
          content: none;
        }
        .withdraw-reference .balance-trend {
          width: 48px;
          height: 48px;
          margin-right: 17px;
          color: #c8102e;
          stroke-width: 1.4;
        }
        .withdraw-reference .balance-value span {
          order: -1;
          margin: 0 8px 0 0;
          font-size: 29px;
        }
        .withdraw-reference .wallet-mark {
          display: none;
        }
        .withdraw-reference .amount-panel {
          display: flex;
          flex-direction: column;
          min-height: 0;
          padding: 0 22px 18px;
          background: #f2f2f2;
        }
        .withdraw-reference .wallet-panel {
          position: relative;
          z-index: 4;
          display: block !important;
          padding-top: 0;
          background: #f2f2f2;
        }
        .withdraw-reference .wallet-label {
          margin: 0 22px 16px;
          color: #1d1d1d;
          font-size: 21px;
        }
        .withdraw-reference .amount-label {
          order: -1;
          margin: 0 0 16px;
          color: #1d1d1d;
          font-size: 21px;
        }
        .withdraw-reference .amount-field {
          height: 54px;
          border: 1px solid #e3e3e3;
          border-radius: 2px;
          background: #f7f7f7;
        }
        .withdraw-reference .amount-field input {
          order: 2;
          padding: 0 16px;
          color: #555;
          font-size: 18px;
        }
        .withdraw-reference .amount-field input::placeholder {
          color: #727883;
          opacity: 1;
        }
        .withdraw-reference .amount-currency {
          order: 1;
          padding: 0 0 0 12px;
          color: #737984;
          font-size: 17px;
        }
        .withdraw-reference .amount-details {
          margin: 12px 10px 0;
          color: #3f3f3f;
          font-size: 14px;
        }
        .withdraw-reference .wallet-choice {
          display: flex !important;
          width: calc(100% - 44px);
          height: 60px;
          margin: 0 22px 22px;
          padding: 0 15px;
          border: 1px solid #e2e2e2;
          border-radius: 9px;
          background: #fff;
          color: #555;
          box-shadow: 0 1px 2px rgba(0,0,0,.03);
        }
        .withdraw-reference .wallet-choice img {
          display: block;
          width: 27px;
          height: 27px;
          margin-right: 16px;
          object-fit: contain;
        }
        .withdraw-reference .wallet-choice::before {
          content: none;
        }
        .withdraw-reference .wallet-choice svg:last-child {
          color: #9a9a9a;
        }
        .withdraw-reference .wallet-choice > svg:first-child {
          display: block;
          width: 27px;
          height: 27px;
          margin-right: 16px;
          color: #696969;
          stroke-width: 2.4;
        }
        .withdraw-reference .wallet-copy {
          font-size: 17px;
        }
        .withdraw-reference .submit {
          width: calc(100% - 150px);
          min-height: 62px;
          margin: 0 auto 12px;
          border-radius: 32px;
          background: #d00000;
          color: #fff;
          font-size: 27px;
          font-weight: 700;
          box-shadow: none;
        }
        .withdraw-reference .instructions {
          padding: 0 22px 28px;
          background: #f2f2f2;
        }
        .withdraw-reference .instructions-title {
          display: none;
        }
        .withdraw-reference .instruction {
          margin: 0 0 5px;
          padding-left: 0;
          color: #444;
          font-size: 15px;
          font-weight: 400;
          line-height: 1.35;
        }
        .withdraw-reference .instruction::before {
          position: static;
          content: none;
        }
        .withdraw-reference .instruction:nth-of-type(1)::before { content: "1. "; }
        .withdraw-reference .instruction:nth-of-type(2)::before { content: "2. "; }
        .withdraw-reference .instruction:nth-of-type(3)::before { content: "3. "; }
        .withdraw-reference .instruction:nth-of-type(4)::before { content: "4. "; }
        .withdraw-reference .instruction:nth-of-type(5)::before { content: "5. "; }
        .withdraw-reference .instruction strong {
          font-weight: 400;
        }
        @media (max-width: 360px) {
          .withdraw-reference .submit { width: calc(100% - 120px); }
          .withdraw-reference .balance-value { font-size: 25px; }
          .withdraw-reference .balance-value span { font-size: 25px; }
        }
      `}),e.jsxs("div",{className:"withdraw-screen",children:[e.jsxs("section",{className:"withdraw-hero","aria-label":"Retrait",children:[e.jsx("div",{className:"hero-art",style:{backgroundImage:`url(${K})`},"aria-hidden":"true",children:e.jsx("span",{className:"receipt-icon"})}),e.jsx("h1",{className:"withdraw-title",children:"RETRAIT"}),e.jsx(j,{href:"/history",children:e.jsx("button",{className:"history-button","aria-label":"Historique des transactions",children:e.jsx("span",{className:"history-icon","aria-hidden":"true"})})}),e.jsx(j,{href:"/account",children:e.jsx("button",{className:"withdraw-back","data-testid":"button-back","aria-label":"Retour"})}),e.jsxs("div",{className:"balance-card",children:[e.jsx("p",{className:"balance-label",children:"Solde du compte"}),e.jsxs("p",{className:"balance-value","data-testid":"text-balance",children:[e.jsx(O,{className:"balance-trend","aria-hidden":"true"}),e.jsx("span",{children:c}),Math.round(R).toLocaleString("fr-FR")]}),e.jsx("div",{className:"wallet-mark","aria-hidden":"true",children:e.jsx("img",{src:G,alt:""})})]})]}),e.jsxs("section",{className:"wallet-panel","aria-label":"Portefeuille de retrait",children:[e.jsx("p",{className:"wallet-label",children:"Veuillez sélectionner votre carte bancaire"}),e.jsxs("button",{onClick:()=>C(H?"/wallet?from=withdrawal":"/wallet"),className:"wallet-choice","data-testid":"button-select-wallet",children:[e.jsx("img",{src:Q,alt:"","aria-hidden":"true"}),e.jsx("span",{className:"wallet-copy",children:r?`${r.accountName} · ${r.accountNumber}`:"Choisissez votre portefeuille"}),e.jsx(_,{"aria-hidden":"true"})]})]}),e.jsxs("section",{className:"amount-panel","aria-label":"Montant de retrait",children:[e.jsx("p",{className:"amount-label",children:"Entrez le montant de retrait"}),e.jsxs("label",{className:"amount-field",children:[e.jsx("span",{className:"amount-currency",children:c}),e.jsx("input",{type:"number",value:n,onChange:t=>u(t.target.value?Number(t.target.value):""),placeholder:"Veuillez saisir le montant de retrait","data-testid":"input-withdrawal-amount","aria-label":"Montant de retrait"})]}),e.jsxs("div",{className:"amount-details",children:[e.jsxs("span",{children:["Montant reçu : ",c," ",I.toLocaleString("fr-FR")]}),e.jsxs("span",{children:["Taux de frais : ",w.toFixed(0),"%"]})]})]}),e.jsx("button",{onClick:A,disabled:f.isPending,className:"submit","data-testid":"button-submit-withdrawal",children:f.isPending?e.jsx(k,{className:"h-5 w-5 animate-spin"}):"Confirmer"}),e.jsxs("section",{className:"instructions","aria-label":"Instructions de retrait",children:[e.jsx("h2",{className:"instructions-title",children:"Instructions de Retrait :"}),e.jsxs("p",{className:"instruction",children:[e.jsx("strong",{children:"Montant minimum de retrait :"})," ",p.toLocaleString("fr-FR")," ",c,"."]}),e.jsx("p",{className:"instruction",children:e.jsxs("strong",{children:["Les frais de retrait s'élèvent à ",w," % du montant retiré."]})}),e.jsxs("p",{className:"instruction",children:[e.jsx("strong",{children:"Vous pouvez effectuer des retraits à tout moment."})," Les retraits sont disponibles sous 2 à 24 heures."]}),e.jsx("p",{className:"instruction",children:"Vérifiez vos informations de portefeuille avant de confirmer."})]})]})]})}export{te as default};
