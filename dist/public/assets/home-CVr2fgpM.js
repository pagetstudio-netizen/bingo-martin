import{c as T,j as e,L as $,a as _,u as Q,b as B,r as h,q as b,e as v}from"./index-IWO-0GZ9.js";import{u as f}from"./useQuery-CQ9u_26K.js";import{u as k}from"./useMutation-BniFcgVK.js";import{p as K}from"./70df605a42dc9ac4254ef5fd2de61af4_1790106066950-BcpDJ99p.js";import{p as H,a as V,b as W,c as D,d as G,e as J}from"./a61f6f9a0bd34ce80a06f7b1c72059bd_1790106066849-mubT9n_B.js";import{p as O}from"./9c7951043ab6fc2cbf52f3d7867b910c_1790106066758-CcZwlytQ.js";import{e as U}from"./05b94578-92ae-48a6-b863-59d59ee49423_1790114751100-BgIRbjFg.js";import{b as X}from"./logo-1_1790106035177-BcMb50Rj.js";import{X as Y}from"./x-B-D_H2Kz.js";const Z=T("CalendarCheck2",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8",key:"bce9hv"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"m16 20 2 2 4-4",key:"13tcca"}]]);function N(n,s){return`${Number(n||0).toLocaleString("fr-FR")} ${s}`}function ee({product:n,currency:s="FCFA",pending:d=!1,onCancel:c,onConfirm:a}){return e.jsx("div",{className:"fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-5",role:"presentation",onClick:c,children:e.jsxs("div",{className:"w-full max-w-[428px] overflow-hidden rounded-[5px] bg-white shadow-2xl",role:"dialog","aria-modal":"true","aria-labelledby":"purchase-confirm-title",onClick:l=>l.stopPropagation(),children:[e.jsx("h2",{id:"purchase-confirm-title",className:"border-b border-[#ece8e4] px-5 py-5 text-center text-[23px] font-bold leading-tight text-[#1e1e1e]",children:n.name}),e.jsxs("div",{className:"px-7 py-7",children:[e.jsx("p",{className:"text-[18px] leading-[1.55] text-[#302d2d]",children:"Êtes-vous sûr de vouloir acheter ce produit ?"}),e.jsxs("ul",{className:"mt-5 space-y-4 text-[18px] leading-none text-[#302d2d]",children:[e.jsxs("li",{className:"flex items-center gap-3",children:[e.jsx("span",{"aria-hidden":"true",className:"text-[22px] leading-none",children:"•"}),e.jsxs("span",{children:["Prix :"," ",e.jsx("strong",{className:"font-bold text-[#ad0b15]",children:N(n.price,s)})]})]}),e.jsxs("li",{className:"flex items-center gap-3",children:[e.jsx("span",{"aria-hidden":"true",className:"text-[22px] leading-none",children:"•"}),e.jsxs("span",{children:["Total profit :"," ",e.jsx("strong",{className:"font-bold text-[#ad0b15]",children:N(n.totalReturn,s)})]})]})]})]}),e.jsxs("div",{className:"flex h-[70px] border-t border-[#ece8e4]",children:[e.jsx("button",{type:"button",className:"flex-1 border-r border-[#ece8e4] text-[20px] font-semibold text-[#252525] transition-colors hover:bg-[#faf7f7] active:bg-[#f3eeee]",onClick:c,"data-testid":"button-cancel-home-purchase",children:"Annuler"}),e.jsx("button",{type:"button",className:"flex-1 text-[20px] font-bold text-[#ad0b15] transition-colors hover:bg-[#fff7f7] active:bg-[#fbeaea] disabled:cursor-not-allowed disabled:opacity-60",onClick:a,disabled:d,"data-testid":"button-confirm-home-purchase",children:d?e.jsx($,{className:"mx-auto h-5 w-5 animate-spin"}):"Confirmer"})]})]})})}const oe="/assets/icon_1_1790113934821-QPC_AXQK.png",te="/assets/icon_2_1790113934863-5P0dCuiG.png",ie="/assets/icon_3-1_1790113934921-Cfp6Mbtn.png",i="#ad0b15",ae="/bingo-home-banner.png",ne=[{label:"Dépôt",href:"/deposit",image:oe},{label:"Retrait",href:"/withdrawal",image:te},{label:"Check-in",href:"/checkin",icon:Z},{label:"Service client",href:"/service",image:ie,round:!0}],C=[K,H,V,W,D,G,O,J];function w(n){return`${Number(n||0).toLocaleString("fr-FR")} FCFA`}function xe(){const{user:n,refreshUser:s}=_(),[,d]=Q(),{toast:c}=B(),[a,l]=h.useState("available"),[g,p]=h.useState(null),{data:P,isLoading:L}=f({queryKey:["/api/products"]}),{data:z,isLoading:F}=f({queryKey:["/api/user/products"]}),{data:u}=f({queryKey:["/api/settings/links"]}),[A,m]=h.useState(!1);h.useEffect(()=>{const o=()=>m(!0);return o(),window.addEventListener("home-tab-clicked",o),()=>window.removeEventListener("home-tab-clicked",o)},[]);const j=k({mutationFn:async o=>{const t=await v("POST",`/api/products/${o}/purchase`,{});if(!t.ok){const r=await t.json();throw new Error(r.message||"Erreur lors de l'achat")}return t.json()},onSuccess:()=>{b.invalidateQueries({queryKey:["/api/products"]}),b.invalidateQueries({queryKey:["/api/user/products"]}),s(),p(null),c({title:"Produit acheté !",description:"Vous commencerez à recevoir des gains demain."})},onError:o=>{p(null),c({title:"Erreur",description:o.message,variant:"destructive"})}}),I=k({mutationFn:async o=>{const t=await v("POST",`/api/products/${o}/claim-free`,{});if(!t.ok){const r=await t.json();throw new Error(r.message||"Impossible de réclamer ce produit")}return t.json()},onSuccess:()=>{b.invalidateQueries({queryKey:["/api/products"]}),s(),c({title:"Bonus réclamé",description:"Le bonus gratuit a été ajouté à votre compte."})},onError:o=>{c({title:"Erreur",description:o.message,variant:"destructive"})}});if(!n)return null;const E=(z||[]).map(o=>o.product).filter(o=>!!o),y=a==="available"?P||[]:E,q=a==="available"?L:F,S=(o,t)=>{if(o==="Service client"){const r=u?.supportLink?.trim();r&&window.open(r,"_blank","noopener,noreferrer");return}d(t)};return e.jsxs("main",{className:"bingo-home",children:[e.jsx("style",{children:`
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
          color: ${i};
          font-size: 14px;
          font-weight: 400;
          line-height: 1;
        }
        .bingo-home .action-icon {
          display: grid;
          width: 38px;
          height: 38px;
          place-items: center;
          border: 2px solid ${i};
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
          background: ${i};
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
          color: ${i};
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
          color: ${i};
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
          background: ${i};
          color: #fff;
          font-size: 15px;
          font-weight: 400;
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
          color: ${i};
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
          color: ${i};
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
          color: ${i};
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
          background: ${i};
        }
        .bingo-home .welcome-notice {
          min-height: 0;
          flex: 1;
          overflow-y: auto;
          margin: 0;
          color: ${i};
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
          background: ${i};
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
          .bingo-home .welcome-content { padding-right: 20px; padding-left: 20px; }
          .bingo-home .welcome-title { font-size: 21px; }
          .bingo-home .welcome-notice { font-size: 16px; }
        }
      `}),e.jsxs("div",{className:"home-screen",children:[e.jsxs("section",{className:"hero","aria-label":"Produits Bingo",children:[e.jsx("img",{src:ae,alt:"Gamme de chips Bingo"}),e.jsxs("div",{className:"hero-dots","aria-hidden":"true",children:[e.jsx("span",{className:"hero-dot"}),e.jsx("span",{className:"hero-dot muted"}),e.jsx("span",{className:"hero-dot muted"})]})]}),e.jsx("section",{className:"action-panel","aria-label":"Actions rapides",children:ne.map(({label:o,href:t,icon:r,image:x,round:R},M)=>e.jsxs("button",{type:"button",className:"action-button",onClick:()=>S(o,t),"data-testid":`home-action-${M}`,children:[e.jsx("span",{className:`action-icon ${R?"round":""}`,children:x?e.jsx("span",{className:"action-icon-image","aria-hidden":"true",style:{backgroundColor:"currentColor",WebkitMaskImage:`url("${x}")`,maskImage:`url("${x}")`}}):r?e.jsx(r,{"aria-hidden":"true"}):null}),e.jsx("span",{children:o})]},o))}),e.jsxs("section",{className:"plan-switch","aria-label":"Produits Bingo",children:[e.jsx("button",{type:"button",className:`plan-button ${a==="available"?"active":""}`,onClick:()=>l("available"),"data-testid":"button-view-products",children:"Voir les produits"}),e.jsx("button",{type:"button",className:`plan-button ${a==="owned"?"active":""}`,onClick:()=>l("owned"),"data-testid":"button-view-purchased-products",children:"Produits achetés"})]}),e.jsx("section",{className:"product-grid","aria-label":a==="available"?"Produits disponibles":"Produits achetés",children:q?e.jsxs("div",{className:"empty-products",children:[e.jsx($,{className:"loader","aria-label":"Chargement"}),e.jsx("p",{children:"Chargement des produits..."})]}):y.length===0?e.jsx("div",{className:`empty-products ${a==="owned"?"empty-owned":""}`,children:a==="owned"?e.jsx("img",{src:U,alt:"Aucun produit acheté"}):e.jsx("p",{children:"Aucun produit disponible."})}):y.map((o,t)=>e.jsxs("article",{className:"product-card",children:[e.jsx("img",{className:"product-image",src:o.imageUrl||C[t%C.length],alt:o.name}),e.jsxs("div",{className:"product-body",children:[e.jsx("h2",{className:"product-name",children:o.name}),e.jsxs("div",{className:"product-stat",children:[e.jsx("span",{children:"Prix :"}),e.jsx("strong",{children:w(o.price)})]}),e.jsxs("div",{className:"product-stat",children:[e.jsx("span",{children:"Quotidien :"}),e.jsx("strong",{children:w(o.dailyEarnings)})]}),e.jsxs("div",{className:"product-stat",children:[e.jsx("span",{children:"Jours :"}),e.jsx("strong",{children:o.cycleDays})]}),e.jsxs("div",{className:"product-stat",children:[e.jsx("span",{children:"Total :"}),e.jsx("strong",{children:w(o.totalReturn)})]}),a==="available"?e.jsx("button",{type:"button",className:"product-cta",onClick:()=>{o.isFree?I.mutate(o.id):p(o)},disabled:o.isFree&&!o.canClaimFree,"data-testid":`button-home-product-${o.id}`,children:o.isFree?o.canClaimFree?"Réclamer":"Déjà réclamé":"Acheter"}):e.jsx("button",{type:"button",className:"product-cta",onClick:()=>d("/my-products"),"data-testid":`button-home-owned-product-${o.id}`,children:"Voir le produit"})]})]},`${o.id}-${t}`))})]}),A&&u?.groupLink&&e.jsx("div",{className:"welcome-overlay",role:"presentation",onClick:()=>m(!1),children:e.jsxs("section",{className:"welcome-modal",role:"dialog","aria-modal":"true","aria-labelledby":"welcome-popup-title",onClick:o=>o.stopPropagation(),children:[e.jsx("img",{className:"welcome-logo",src:X,alt:"Bingo"}),e.jsx("button",{type:"button",className:"welcome-close",onClick:()=>m(!1),"aria-label":"Fermer","data-testid":"button-close-welcome-popup",children:e.jsx(Y,{"aria-hidden":"true"})}),e.jsxs("div",{className:"welcome-content",children:[e.jsx("h2",{id:"welcome-popup-title",className:"welcome-title",children:"Welcome to Bingo!"}),e.jsx("div",{className:"welcome-divider","aria-hidden":"true"}),e.jsx("p",{className:"welcome-notice",children:`The app that lets you earn 500F upon registration

Login bonus: 50F
Invite your friends to earn

Level 1: 25%
Level 2: 3%
Level 3: 2%`}),e.jsx("button",{type:"button",className:"welcome-group-button",onClick:()=>{window.open(u.groupLink,"_blank","noopener,noreferrer"),m(!1)},"data-testid":"button-welcome-group",children:"Join the group"})]})]})}),g&&e.jsx(ee,{product:g,currency:"FCFA",pending:j.isPending,onCancel:()=>p(null),onConfirm:()=>j.mutate(g.id)})]})}export{xe as default};
