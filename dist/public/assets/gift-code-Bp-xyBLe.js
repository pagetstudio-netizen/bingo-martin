import{a as p,b as x,r as h,j as e,f as m,L as u,e as b}from"./index-QIFCPOZ8.js";import{u as j}from"./useQuery-BR0COp6B.js";import{u as w}from"./useMutation-DVBnge2q.js";import{C as y}from"./chevron-left-DQ-dAVE1.js";import{C as k}from"./chevron-right-BABMGmVV.js";const v="/assets/70df605a42dc9ac4254ef5fd2de61af4_1790106066950-ZA0zkBlV.jpg",z="/assets/tg-1_1787390593655-7lN49whF.png",i="#b10813";function P(){const{refreshUser:c}=p(),{toast:r}=x(),[a,o]=h.useState(""),{data:f}=j({queryKey:["/api/settings"]}),g=f?.groupLabel||"Groupe Telegram officiel",n=w({mutationFn:async t=>{const s=await b("POST","/api/gift-codes/claim",{code:t});if(!s.ok){const l=await s.json();throw new Error(l.message||"Erreur")}return s.json()},onSuccess:t=>{c(),o(""),r({title:"Félicitations !",description:t.message})},onError:t=>{r({title:"Erreur",description:t.message,variant:"destructive"})}}),d=()=>{if(!a.trim()){r({title:"Erreur",description:"Veuillez saisir un code",variant:"destructive"});return}n.mutate(a.trim())};return e.jsxs("main",{className:"gift-reference",children:[e.jsx("style",{children:`
        .gift-reference { min-height: 100dvh; background: #fff5f5; color: #151515; font-family: Arial, sans-serif; }
        .gift-reference *, .gift-reference *::before, .gift-reference *::after { box-sizing: border-box; }
        .gift-reference .gift-screen { width: 100%; max-width: 512px; min-height: 100dvh; margin: 0 auto; background: linear-gradient(180deg, #fff8f8 0%, #fff1f1 100%); }
        .gift-reference .gift-title { height: 60px; display: flex; align-items: center; padding: 0 22px; background: #fff; border-bottom: 1px solid #f0d4d6; }
        .gift-reference .gift-title a { display: grid; width: 36px; height: 36px; place-items: center; color: ${i}; font-size: 38px; line-height: 1; text-decoration: none; }
        .gift-reference .gift-title h1 { flex: 1; margin: 0; color: ${i}; font-size: 21px; font-weight: 700; text-align: center; }
        .gift-reference .gift-hero { display: block; width: 100%; height: auto; aspect-ratio: 600 / 340; object-fit: cover; }
        .gift-reference .gift-description { min-height: 66px; display: flex; align-items: center; padding: 10px 21px; background: #fff0f0; color: #8c5f62; font-size: 17px; }
        .gift-reference .gift-telegram { height: 70px; display: flex; align-items: center; margin: 0 21px; padding: 0 12px; border: 1px solid #c78c91; border-radius: 6px; background: #fff; text-decoration: none; }
        .gift-reference .gift-telegram img { width: 56px; height: 56px; margin-right: 15px; object-fit: contain; }
        .gift-reference .gift-telegram strong { flex: 1; color: #342628; font-size: 19px; font-weight: 500; }
        .gift-reference .gift-telegram svg { width: 22px; height: 22px; color: #a9787d; stroke-width: 2; }
        .gift-reference .gift-form { padding: 20px 21px 0; }
        .gift-reference .gift-label { display: block; margin-bottom: 12px; color: #151515; font-size: 19px; font-weight: 700; }
        .gift-reference .gift-label::first-letter { color: ${i}; }
        .gift-reference .gift-input { display: block; width: 100%; height: 54px; border: 1px solid #bca2a5; border-radius: 0; padding: 0 21px; outline: 0; background: transparent; color: #333; font-size: 16px; }
        .gift-reference .gift-input:focus { border-color: ${i}; box-shadow: 0 0 0 2px rgba(177, 8, 19, .1); }
        .gift-reference .gift-input::placeholder { color: #b3a5a7; opacity: 1; }
        .gift-reference .gift-submit { display: block; width: calc(100% - 152px); min-width: 230px; height: 53px; margin: 22px auto 0; border: 0; border-radius: 28px; background: ${i}; color: white; font-size: 21px; font-weight: 700; box-shadow: 0 8px 18px rgba(177, 8, 19, .18); }
        .gift-reference .gift-submit:active { transform: scale(.98); }
        .gift-reference .gift-submit:disabled { opacity: .7; }
        @media (max-width: 370px) {
          .gift-reference .gift-description { font-size: 15px; }
          .gift-reference .gift-title { height: 56px; }
          .gift-reference .gift-title h1 { font-size: 19px; }
          .gift-reference .gift-telegram { margin-right: 16px; margin-left: 16px; }
          .gift-reference .gift-form { padding-right: 16px; padding-left: 16px; }
          .gift-reference .gift-submit { width: calc(100% - 90px); min-width: 210px; }
        }
      `}),e.jsxs("div",{className:"gift-screen",children:[e.jsxs("header",{className:"gift-title",children:[e.jsx(m,{href:"/account","aria-label":"Retour",children:e.jsx(y,{"aria-hidden":"true"})}),e.jsx("h1",{children:"Échanger un cadeau"})]}),e.jsx("img",{className:"gift-hero",src:v,alt:"Produits Bingo","data-testid":"img-gift-banner"}),e.jsx("p",{className:"gift-description",children:"Vous pouvez obtenir un code cadeau dans le groupe"}),e.jsxs("a",{className:"gift-telegram",href:f?.groupLink||"https://t.me/sybotx",target:"_blank",rel:"noreferrer",children:[e.jsx("img",{src:z,alt:""}),e.jsx("strong",{children:g}),e.jsx(k,{"aria-hidden":"true"})]}),e.jsxs("form",{className:"gift-form",onSubmit:t=>{t.preventDefault(),d()},children:[e.jsxs("label",{className:"gift-label",htmlFor:"gift-code-input",children:[e.jsx("span",{children:"* "}),"Code cadeau"]}),e.jsx("input",{id:"gift-code-input",className:"gift-input",type:"text",value:a,onChange:t=>o(t.target.value.toUpperCase()),placeholder:"Veuillez saisir le code cadeau","data-testid":"input-gift-code"}),e.jsx("button",{className:"gift-submit",type:"submit",disabled:n.isPending,"data-testid":"button-submit-code",children:n.isPending?e.jsx(u,{className:"mx-auto h-5 w-5 animate-spin"}):"Confirmer"})]})]})]})}export{P as default};
