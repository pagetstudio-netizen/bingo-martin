import{a as d,b as p,j as e}from"./index-QIFCPOZ8.js";import{u as m}from"./useQuery-BR0COp6B.js";import{b as x}from"./logo-1_1790106035177-BcMb50Rj.js";import{C as h}from"./copy-DYZpY1QN.js";function y(){const{user:r}=d(),{toast:t}=p(),{data:s}=m({queryKey:["/api/settings"]});if(!r)return null;const a=r.referralCode,n=`${window.location.origin}/ddddd/#/pages/login/reset?inviteCode=${encodeURIComponent(a)}`,c=[s?.level1Commission||"25",s?.level2Commission||"3",s?.level3Commission||"2"],l=async(o,i)=>{try{await navigator.clipboard.writeText(o),t({title:`${i} copié`})}catch{t({title:"Copie impossible",description:"Sélectionnez le texte pour le copier."})}};return e.jsxs("main",{className:"share-mobile",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"share-screen",children:[e.jsx("header",{className:"share-appbar",children:"Share"}),e.jsx("img",{className:"share-hero",src:x,alt:"Bingo"}),e.jsxs("section",{className:"share-card","aria-label":"Code et lien de parrainage",children:[e.jsxs("div",{className:"share-row",children:[e.jsx("p",{className:"share-value share-link","data-testid":"text-share-link",children:n}),e.jsxs("button",{type:"button",className:"copy-button",onClick:()=>l(n,"Lien"),"data-testid":"button-copy-share-link",children:[e.jsx(h,{"aria-hidden":"true"})," Copy"]})]}),e.jsxs("div",{className:"share-row",children:[e.jsx("p",{className:"share-value share-code","data-testid":"text-share-code",children:a}),e.jsxs("button",{type:"button",className:"copy-button",onClick:()=>l(a,"Code"),"data-testid":"button-copy-share-code",children:[e.jsx(h,{"aria-hidden":"true"})," Copy"]})]}),e.jsx("h1",{className:"commission-title",children:"Invite Commission"}),e.jsx("div",{className:"commission-list",children:c.map((o,i)=>e.jsxs("div",{className:"commission-row",children:[e.jsxs("span",{children:["Level ",i+1," ="]}),e.jsxs("strong",{children:[o,"%"]})]},i))})]})]})]})}export{y as default};
