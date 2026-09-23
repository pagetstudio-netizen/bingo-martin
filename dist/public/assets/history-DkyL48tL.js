import{c as T,a as P,G as M,b as K,r as S,j as e,f as O,L as R}from"./index-BmPiDcAZ.js";import{u as f}from"./useQuery-DlIi2Jzu.js";import{g as V}from"./countries-DOninoG6.js";import{C as Q}from"./chevron-left-B0B5Js9Y.js";import{R as X}from"./refresh-cw-zZrJkohP.js";const Y=T("Earth",[["path",{d:"M21.54 15H17a2 2 0 0 0-2 2v4.54",key:"1djwo0"}],["path",{d:"M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17",key:"1tzkfa"}],["path",{d:"M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05",key:"14pb5j"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]),b="/assets/nodata-da225bbb_(1)_1783249133513-DaJAjPYJ.png",U="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAxCAMAAABEQrEuAAAAKlBMVEX////O/13///9MaXH////U/3LT/3Pm/6r////Z/4HR/2T////O/1v////pazHSAAAADHRSTlMZ48EAUXBvMw1QqIVIl4R7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAdElEQVR4nO2WwQ6AIAxDC1XHYP7/7xqDHkmY4SDRd+mlL1l2Kkgm9JJIgoQHEj4BIPpPqnj7PyPQnLO6jNXMtk8bwSy8wFBV9RmhVn4jzPorEZEr7sRslNiiNIy4t4jDjKXJfB+eluTu+3fJg+3j2Ffp3FcHKWoKE5qO4BgAAAAASUVORK5CYII=",r="#b10813",W="#fff",E=(s,i,c)=>{const a=new Date(c),n=String(a.getFullYear()).slice(2),l=String(a.getMonth()+1).padStart(2,"0"),h=String(a.getDate()).padStart(2,"0"),p=String(a.getHours()).padStart(2,"0"),u=String(a.getMinutes()).padStart(2,"0"),g=String(i).padStart(4,"0");return`sdk${n}${l}${h}${p}${u}${s}${g}`},$=s=>{const i=s.sendavapayReference||s.omnipayReference||s.omnipayId||s.soleaspayReference||s.soleaspayOrderId;return i?i.startsWith("sdk")?i:`sdk${i}`:E("D",s.id,s.createdAt)},J=s=>{const i=s.sendavapayReference;return i?i.startsWith("sdk")?i:`sdk${i}`:E("W",s.id,s.createdAt)},_=s=>s.length<=6?s:`${s.slice(0,2)}****${s.slice(-4)}`,j=s=>{const i=new Date(s),c=String(i.getDate()).padStart(2,"0"),a=String(i.getMonth()+1).padStart(2,"0"),n=i.getFullYear(),l=String(i.getHours()).padStart(2,"0"),h=String(i.getMinutes()).padStart(2,"0"),p=String(i.getSeconds()).padStart(2,"0");return`${c}/${a}/${n} ${l}:${h}:${p}`},I=s=>{switch(s){case"completed":case"approved":return{label:"Approuvé",color:r};case"rejected":return{label:"Rejeté",color:"#b10813"};case"processing":return{label:"En traitement",color:"#b10813"};default:return{label:"En attente",color:r}}},G=s=>{switch(s.type){case"bonus":return s.description==="Bonus quotidien"?"Bonus quotidien":s.description;case"signup_bonus":return"Bonus d'inscription";case"task_reward":return"Récompense";case"commission":return"Commission";case"deposit":return"Dépôt";default:return s.description}},m=({label:s,value:i})=>e.jsxs("div",{className:"history-row",children:[e.jsx("span",{children:s}),e.jsx("span",{children:i})]}),A=({label:s,color:i})=>e.jsx("span",{className:"history-status",style:{backgroundColor:i},children:s}),v=()=>e.jsx("span",{className:"history-card-icon","aria-hidden":"true",children:e.jsx("img",{src:U,alt:""})});function ae(){const{user:s,refreshUser:i}=P(),c=M(),{toast:a}=K(),[n,l]=S.useState("withdrawals"),[h,p]=S.useState(null),u=!!s?.isAdmin,g=s?V(s.country):null,x=g?.currency==="XOF"||g?.currency==="XAF"?"FCFA":g?.currency||"FCFA",{data:w=[],isLoading:D}=f({queryKey:["/api/deposits/history"]}),{data:N=[],isLoading:C}=f({queryKey:["/api/withdrawals/history"]}),{data:L=[],isLoading:F}=f({queryKey:["/api/transactions"]}),z=t=>(t.status==="pending"||t.status==="processing")&&!!(t.soleaspayReference||t.soleaspayOrderId||t.omnipayId||t.omnipayReference||t.sendavapayReference),q=async t=>{p(t);try{const o=await(await fetch(`/api/deposits/${t}/verify`,{credentials:"include"})).json();o.status==="approved"?(a({title:"Paiement confirmé",description:"Votre compte a été crédité"}),i(),c.invalidateQueries({queryKey:["/api/deposits/history"]})):o.status==="rejected"?(a({title:"Paiement échoué",description:"Le paiement a été refusé",variant:"destructive"}),c.invalidateQueries({queryKey:["/api/deposits/history"]})):a({title:"En cours",description:"Le paiement est toujours en attente"})}catch{a({title:"Erreur",description:"Impossible de vérifier le paiement",variant:"destructive"})}finally{p(null)}};if(!s)return null;const k=[...L,{id:-1,userId:s.id,type:"registration",amount:"0",description:"Inscription",createdAt:new Date(s.createdAt).toISOString()}].sort((t,d)=>new Date(d.createdAt).getTime()-new Date(t.createdAt).getTime()),B=n==="balance"?F:n==="deposits"?D:C;return e.jsxs("main",{className:"history-page",children:[e.jsx("style",{children:`
        .history-page {
          width: 100%;
          min-height: 100dvh;
          overflow-x: hidden;
          background: #fff8f8;
          color: #101010;
          font-family: Arial, sans-serif;
        }
        .history-page *,
        .history-page *::before,
        .history-page *::after {
          box-sizing: border-box;
        }
        .history-screen {
          width: 100%;
          max-width: 500px;
          min-height: 100dvh;
          margin: 0 auto;
          background: #fff8f8;
        }
        .history-header {
          position: relative;
          display: flex;
          height: 78px;
          align-items: center;
          padding: 8px 20px 0;
          background: #fff8f8;
        }
        .history-back {
          display: grid;
          width: 32px;
          height: 32px;
          place-items: center;
          border: 0;
          padding: 0;
          background: transparent;
          color: ${r};
        }
        .history-back svg {
          width: 25px;
          height: 25px;
          stroke-width: 1.9;
        }
        .history-title {
          position: absolute;
          right: 55px;
          left: 55px;
          margin: 0;
          color: ${r};
          font-size: 20px;
          font-weight: 600;
          line-height: 1;
          text-align: center;
        }
        .history-globe {
          position: absolute;
          top: 26px;
          right: 18px;
          width: 25px;
          height: 25px;
          color: ${r};
          stroke-width: 1.7;
        }
        .history-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          align-items: center;
          min-height: 58px;
          padding: 0 18px;
          border-bottom: 1px solid #f1d8da;
          background: #fff8f8;
        }
        .history-tab {
          display: flex;
          min-width: 0;
          height: 52px;
          align-items: center;
          justify-content: center;
          gap: 4px;
          border: 0;
          border-radius: 0;
          padding: 0 7px;
          background: transparent;
          color: #8f7779;
          font-size: 15px;
          font-weight: 400;
          line-height: 1;
          white-space: nowrap;
        }
        .history-tab.active {
          border-bottom: 3px solid ${r};
          color: ${r};
          font-weight: 700;
        }
        .history-tab-arrow {
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 7px solid ${r};
        }
        .history-tab-arrow.right {
          border-left-color: ${r};
        }
        .history-tab-arrow.left {
          transform: rotate(180deg);
        }
        .history-content {
          min-height: calc(100dvh - 127px);
          padding: 18px 18px 40px;
          background: #fff8f8;
        }
        .history-list {
          display: grid;
          gap: 16px;
        }
        .history-card {
          width: 100%;
          min-height: 142px;
          overflow: hidden;
          border: 1px solid #f7eeee;
          border-radius: 14px;
          padding: 15px 17px 14px;
          background: ${W};
          box-shadow: 0 2px 10px rgba(177, 8, 19, .06);
        }
        .history-card-top {
          display: grid;
          grid-template-columns: 48px minmax(0, 1fr) auto;
          min-height: 48px;
          align-items: flex-start;
          gap: 12px;
        }
        .history-card-icon {
          display: grid;
          width: 48px;
          height: 48px;
          place-items: center;
          overflow: hidden;
          border-radius: 12px;
          background: #fff1f2;
        }
        .history-card-icon img {
          width: 34px;
          height: 34px;
          object-fit: contain;
          filter: hue-rotate(-120deg) saturate(4) brightness(.85);
        }
        .history-amount {
          margin: 0;
          color: #111;
          font-size: 19px;
          font-weight: 500;
          line-height: 1.15;
        }
        .history-card-label {
          margin: 5px 0 0;
          color: #333;
          font-size: 15px;
          line-height: 1.15;
        }
        .history-status {
          display: inline-flex;
          min-height: 30px;
          align-items: center;
          flex: 0 0 auto;
          border-radius: 15px;
          padding: 0 9px;
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          line-height: 1;
          white-space: nowrap;
        }
        .history-divider {
          height: 1px;
          margin: 13px 0 7px 60px;
          background: #f0dfe0;
        }
        .history-row {
          display: flex;
          min-height: 21px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: #413638;
          font-size: 13px;
          line-height: 1.2;
        }
        .history-row > span:last-child {
          text-align: right;
          white-space: nowrap;
        }
        .history-empty {
          display: flex;
          min-height: 280px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #999;
          font-size: 14px;
        }
        .history-empty img {
          width: 112px;
          height: 112px;
          object-fit: contain;
        }
        .history-verify {
          width: 100%;
          margin-top: 10px;
          border: 0;
          border-radius: 18px;
          padding: 9px 12px;
          background: ${r};
          color: #fff;
          font-size: 12px;
          font-weight: 700;
        }
        @media (max-width: 370px) {
          .history-header { height: 70px; padding-top: 6px; }
          .history-title { font-size: 19px; }
          .history-tabs { min-height: 54px; padding-right: 12px; padding-left: 12px; }
          .history-tab { font-size: 13px; }
          .history-content { min-height: calc(100dvh - 120px); padding-right: 14px; padding-left: 14px; }
          .history-card { padding-right: 14px; padding-left: 14px; }
          .history-card-label { font-size: 15px; }
          .history-status { font-size: 12px; padding-right: 8px; padding-left: 8px; }
          .history-row { font-size: 13px; }
        }
      `}),e.jsxs("div",{className:"history-screen",children:[e.jsxs("header",{className:"history-header",children:[e.jsx(O,{href:"/account",children:e.jsx("button",{className:"history-back","data-testid":"button-back","aria-label":"Retour",children:e.jsx(Q,{"aria-hidden":"true"})})}),e.jsx("h1",{className:"history-title",children:"Informations du compte"}),e.jsx(Y,{className:"history-globe","aria-hidden":"true"})]}),e.jsxs("nav",{className:"history-tabs","aria-label":"Type d'enregistrement",children:[e.jsx("button",{className:`history-tab ${n==="deposits"?"active":""}`,onClick:()=>l("deposits"),"data-testid":"tab-deposits",children:"Recharge Historique"}),e.jsx("button",{className:`history-tab ${n==="withdrawals"?"active":""}`,onClick:()=>l("withdrawals"),"data-testid":"tab-withdrawals",children:"Compte de retrait"})]}),e.jsx("section",{className:"history-content","aria-live":"polite",children:B?e.jsx("div",{className:"history-empty",children:e.jsx(R,{className:"animate-spin"})}):n==="balance"?k.length>0?e.jsx("div",{className:"history-list",children:k.map(t=>{const d=Number.parseFloat(t.amount||"0"),o=t.type==="registration";return e.jsxs("article",{className:"history-card","data-testid":`balance-item-${t.id}`,children:[e.jsxs("div",{className:"history-card-top",children:[e.jsx(v,{}),e.jsxs("div",{children:[e.jsx("p",{className:"history-amount",children:o?"—":`+${x} ${d.toLocaleString("fr-FR")}`}),e.jsx("p",{className:"history-card-label",children:t.type==="deposit"?"Dépôt":t.description})]}),e.jsx(A,{label:"Approuvé",color:r})]}),e.jsx("div",{className:"history-divider"}),e.jsx(m,{label:"Type :",value:o?"Inscription":G(t)}),e.jsx(m,{label:"Heure :",value:j(t.createdAt)})]},`${t.type}-${t.id}`)})}):e.jsxs("div",{className:"history-empty",children:[e.jsx("img",{src:b,alt:"Aucune donnée"}),e.jsx("span",{children:"Plus de données"})]}):n==="deposits"?w.length>0?e.jsx("div",{className:"history-list",children:w.map(t=>{const{label:d,color:o}=I(t.status),y=Number.parseFloat(t.amount),H=u?$(t):_($(t));return e.jsxs("article",{className:"history-card","data-testid":`deposit-item-${t.id}`,children:[e.jsxs("div",{className:"history-card-top",children:[e.jsx(v,{}),e.jsxs("div",{children:[e.jsxs("p",{className:"history-amount",children:[y.toLocaleString("fr-FR")," ",x]}),e.jsx("p",{className:"history-card-label",children:j(t.createdAt)})]}),e.jsx(A,{label:d,color:o})]}),e.jsx("div",{className:"history-divider"}),e.jsx(m,{label:"Numéro de guichet automatique :",value:H}),z(t)&&!t.sendavapayReference?e.jsxs("button",{className:"history-verify",onClick:()=>q(t.id),disabled:h===t.id,"data-testid":`button-verify-${t.id}`,children:[h===t.id?e.jsx(R,{className:"inline animate-spin"}):e.jsx(X,{className:"mr-1 inline h-3 w-3"}),"Vérifier la transaction"]}):null]},t.id)})}):e.jsxs("div",{className:"history-empty",children:[e.jsx("img",{src:b,alt:"Aucune donnée"}),e.jsx("span",{children:"Plus de données"})]}):N.length>0?e.jsx("div",{className:"history-list",children:N.map(t=>{const{label:d,color:o}=I(t.status),y=Number.parseFloat(t.amount);return Number.parseFloat(t.netAmount||t.amount),e.jsxs("article",{className:"history-card","data-testid":`withdrawal-item-${t.id}`,children:[e.jsxs("div",{className:"history-card-top",children:[e.jsx(v,{}),e.jsxs("div",{children:[e.jsxs("p",{className:"history-amount",children:[y.toLocaleString("fr-FR")," ",x]}),e.jsx("p",{className:"history-card-label",children:j(t.createdAt)})]}),e.jsx(A,{label:d,color:o})]}),e.jsx("div",{className:"history-divider"}),e.jsx(m,{label:"Numéro de guichet automatique :",value:J(t)})]},t.id)})}):e.jsxs("div",{className:"history-empty",children:[e.jsx("img",{src:b,alt:"Aucune donnée"}),e.jsx("span",{children:"Plus de données"})]})})]})]})}export{ae as default};
