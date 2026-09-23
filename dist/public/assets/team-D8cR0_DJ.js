import{a as h,r as f,j as e,L as u}from"./index-BLgOzGZ5.js";import{u as n}from"./useQuery-CSB8Rq80.js";import{b as v}from"./logo-1_1790106035177-BcMb50Rj.js";const j="/assets/05b94578-92ae-48a6-b863-59d59ee49423_1790114751100-B5e5EGjW.png",d=["LV:1","LV:2","LV:3"];function o(t){return`${Number(t||0).toLocaleString("fr-FR")} FCFA`}function w(t){return t.length<=4?t:t.length>8?`${t.slice(0,3)}*****${t.slice(-6)}`:`${t.slice(0,2)}****${t.slice(-2)}`}function N(t){const i=new Date(t);return Number.isNaN(i.getTime())?"-":i.toLocaleString("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function k(){const{user:t}=h(),[i,c]=f.useState(0),{data:s,isLoading:p}=n({queryKey:["/api/team/stats"]}),{data:l,isLoading:b}=n({queryKey:["/api/team/details"]});if(!t)return null;const r=[l?.level1||[],l?.level2||[],l?.level3||[]][i],x=(s?.level1Count||0)+(s?.level2Count||0)+(s?.level3Count||0),g=p||b;return e.jsxs("main",{className:"team-mobile",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"team-screen",children:[e.jsx("header",{className:"team-appbar",children:"Team"}),e.jsxs("section",{className:"team-hero","aria-label":"Statistiques de l'équipe",children:[e.jsx("img",{className:"team-hero-art",src:"/bingo-home-banner.png",alt:""}),e.jsxs("div",{className:"team-stat-panel",children:[e.jsxs("div",{className:"team-stat",children:[e.jsx("span",{className:"team-stat-label",children:"Team Recharge"}),e.jsx("strong",{className:"team-stat-value",children:o(s?.teamRecharge)})]}),e.jsxs("div",{className:"team-stat",children:[e.jsx("span",{className:"team-stat-label",children:"Team size"}),e.jsx("strong",{className:"team-stat-value",children:x})]})]})]}),e.jsx("section",{className:"level-switch","aria-label":"Niveaux des filleuls",children:d.map((a,m)=>e.jsx("button",{type:"button",className:`level-button ${i===m?"active":""}`,onClick:()=>c(m),"data-testid":`team-level-${m+1}`,children:a},a))}),e.jsx("section",{className:"members","aria-label":`Filleuls ${d[i]}`,children:g?e.jsx("div",{className:"loading",children:e.jsx(u,{className:"animate-spin","aria-label":"Chargement"})}):r.length===0?e.jsx("div",{className:"no-data",children:e.jsx("img",{src:j,alt:"Aucune donnée disponible"})}):r.map(a=>e.jsxs("article",{className:"member-card",children:[e.jsx("div",{className:"member-logo",children:e.jsx("img",{src:v,alt:""})}),e.jsxs("div",{className:"member-info",children:[e.jsxs("p",{className:"member-phone",children:["Téléphone mobile : ",w(a.phone)]}),e.jsxs("div",{className:"member-row",children:[e.jsxs("span",{children:["Dépôt : ",o(a.totalDeposited)]}),e.jsxs("span",{children:["Retrait : ",o(a.totalWithdrawn)]})]}),e.jsxs("p",{className:"member-time",children:["Heure : ",N(a.createdAt)]})]}),a.hasPurchasedProduct&&e.jsx("span",{className:"member-status",children:"Acheté"})]},a.id))})]})]})}export{k as default};
