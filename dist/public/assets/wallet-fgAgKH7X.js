import{a as V,b as Q,u as W,d as B,r as u,j as e,L as C,f as I,q as g,e as b}from"./index-_G7CaTDQ.js";import{u as S}from"./useQuery-DLQ-y9LO.js";import{u as j}from"./useMutation-s0_34tzE.js";import{u as O,t as H,o as U,s as y}from"./types-BV5NpZq9.js";import{a as X}from"./countries-DOninoG6.js";import{e as _}from"./illustration-8_1784762965573-C2eE_S1I.js";import{C as E}from"./chevron-left-CP_PLTOi.js";import{C as $}from"./chevron-right-BnNjuLuw.js";import{X as G}from"./x-CrjC9FQf.js";import{S as J}from"./search-DW9UALVZ.js";import{C as L}from"./check-DSzwAZwS.js";import{P as Y,S as Z,T as ee}from"./trash-2-DZ2_go7B.js";import{C as te}from"./credit-card-D_FSJuUH.js";const ae=U({accountName:y().min(2,"Nom du titulaire requis"),accountNumber:y().min(8,"Numéro requis"),paymentMethod:y().min(2,"Moyen de paiement requis")}),r="#b10813";function we(){const{user:m}=V(),{toast:i}=Q(),[,M]=W(),P=B(),l=new URLSearchParams(P).get("from")==="withdrawal",[F,n]=u.useState(!1),[q,c]=u.useState(!1),[p,f]=u.useState(""),[x,d]=u.useState(""),{data:h,isLoading:T}=S({queryKey:["/api/wallets"]}),{data:z=[]}=S({queryKey:["/api/countries"]}),s=O({resolver:H(ae),defaultValues:{accountName:"",accountNumber:"",paymentMethod:""}}),w=j({mutationFn:async t=>{const a=await b("POST","/api/wallets",{...t,country:m.country});if(!a.ok){const o=await a.json();throw new Error(o.message||"Erreur")}return a.json()},onSuccess:()=>{g.invalidateQueries({queryKey:["/api/wallets"]}),i({title:"Portefeuille ajouté !"}),s.reset(),f(""),n(!1)},onError:t=>{i({title:"Erreur",description:t.message,variant:"destructive"})}}),N=j({mutationFn:async t=>{const a=await b("DELETE",`/api/wallets/${t}`,{});if(!a.ok){const o=await a.json();throw new Error(o.message||"Erreur")}return a.json()},onSuccess:()=>{g.invalidateQueries({queryKey:["/api/wallets"]}),i({title:"Portefeuille supprimé !"})},onError:t=>{i({title:"Erreur",description:t.message,variant:"destructive"})}}),k=j({mutationFn:async t=>{const a=await b("PATCH",`/api/wallets/${t}/default`,{});if(!a.ok){const o=await a.json();throw new Error(o.message||"Erreur")}return a.json()},onSuccess:()=>{g.invalidateQueries({queryKey:["/api/wallets"]})},onError:t=>{i({title:"Erreur",description:t.message,variant:"destructive"})}}),A=t=>{l&&(localStorage.setItem("selectedWalletId",t.id.toString()),M("/withdrawal"))},D=t=>{f(t),s.setValue("paymentMethod",t),d(""),c(!1)},R=()=>{s.handleSubmit(t=>w.mutate(t))()};if(!m)return null;const v=X(m.country,z),K=l?"/withdrawal":"/account";return F?e.jsxs("div",{className:"wallet-page wallet-form-page flex min-h-full flex-col",children:[e.jsx("style",{children:`
          .wallet-form-page {
            min-height: 100dvh;
            background: linear-gradient(180deg, ${r} 0%, #d94b55 24%, #fff1f2 66%, #fff8f8 100%);
            color: #201315;
          }
          .wallet-form-page .wallet-header {
            display: flex;
            height: 60px;
            align-items: center;
            padding: 0 18px;
            background: #fff;
            border-bottom: 1px solid #f0d4d6;
          }
          .wallet-form-page .wallet-back {
            display: grid;
            width: 36px;
            height: 36px;
            place-items: center;
            border: 0;
            border-radius: 50%;
            background: transparent;
            color: ${r};
          }
          .wallet-form-page .wallet-back svg {
            width: 25px;
            height: 25px;
            stroke-width: 2;
          }
          .wallet-form-page .wallet-heading {
            flex: 1;
            margin: 0 36px 0 8px;
            color: ${r};
            font-size: 18px;
            font-weight: 700;
            text-align: center;
          }
          .wallet-form-page .wallet-form-fields {
            display: flex;
            flex: 1;
            flex-direction: column;
            gap: 22px;
            padding: 48px 42px 0;
          }
          .wallet-form-page .wallet-field {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .wallet-form-page .wallet-field-label {
            color: #fff;
            font-size: 17px;
            line-height: 1.2;
          }
          .wallet-form-page .wallet-field-control {
            width: 100%;
            height: 54px;
            border: 1px solid rgba(128, 22, 30, .28);
            border-radius: 0;
            padding: 0 20px;
            outline: 0;
            background: #fff;
            color: #3a2527;
            font-size: 17px;
          }
          .wallet-form-page .wallet-field-control::placeholder {
            color: #9f8e91;
          }
          .wallet-form-page .wallet-field-control:focus {
            border-color: ${r};
            box-shadow: 0 0 0 2px rgba(177, 8, 19, .16);
          }
          .wallet-form-page .wallet-operator-field {
            display: flex;
            width: 100%;
            height: 54px;
            align-items: center;
            justify-content: space-between;
            border: 1px solid rgba(128, 22, 30, .28);
            border-radius: 0;
            padding: 0 20px;
            background: #fff;
            color: ${r};
            font-size: 17px;
            text-align: left;
          }
          .wallet-form-page .wallet-operator-field svg {
            width: 21px;
            height: 21px;
            color: ${r};
          }
          .wallet-form-page .wallet-error {
            color: #fff;
            font-size: 12px;
          }
          .wallet-form-page .wallet-confirm-wrap {
            padding: 24px 42px 42px;
          }
          .wallet-form-page .wallet-confirm {
            display: block;
            width: 100%;
            height: 53px;
            border: 0;
            border-radius: 28px;
            background: ${r};
            color: #fff;
            font-size: 20px;
            font-weight: 700;
            box-shadow: 0 8px 18px rgba(128, 22, 30, .2);
          }
          .wallet-form-page .wallet-confirm:disabled {
            opacity: .55;
          }
          .wallet-form-page .country-picker-search {
            border-color: ${r};
            background: #fff8f8;
          }
          .wallet-form-page .country-picker-search svg,
          .wallet-form-page .country-picker-search input {
            color: ${r};
          }
          .wallet-form-page .country-picker-search input::placeholder {
            color: #b98b90;
          }
          .wallet-form-page .country-picker-row {
            color: ${r};
          }
          .wallet-form-page .country-picker-row.is-selected {
            background: #ffe4e6;
          }
          .wallet-form-page .country-picker-check {
            background: ${r};
          }
          .wallet-form-page .country-picker-empty {
            color: #9a666b;
          }
          @media (max-width: 380px) {
            .wallet-form-page .wallet-form-fields {
              padding-right: 22px;
              padding-left: 22px;
            }
            .wallet-form-page .wallet-confirm-wrap {
              padding-right: 22px;
              padding-left: 22px;
            }
          }
        `}),e.jsxs("div",{className:"wallet-header",children:[e.jsx("button",{onClick:()=>{n(!1),s.reset(),f("")},className:"wallet-back","data-testid":"button-back-form",children:e.jsx(E,{"aria-hidden":"true"})}),e.jsx("h1",{className:"wallet-heading",children:"Ajouter une carte bancaire"})]}),e.jsxs("div",{className:"wallet-form-fields",children:[e.jsxs("div",{className:"wallet-field",children:[e.jsx("label",{className:"wallet-field-label",htmlFor:"wallet-operator-button",children:"* Opérateur"}),e.jsxs("button",{id:"wallet-operator-button",type:"button",onClick:()=>c(!0),className:"wallet-operator-field","data-testid":"button-select-bank",children:[e.jsx("span",{children:p||"Veuillez choisir un opérateur"}),e.jsx($,{"aria-hidden":"true"})]})]}),e.jsxs("div",{className:"wallet-field",children:[e.jsx("label",{className:"wallet-field-label",htmlFor:"input-wallet-name",children:"* Titulaire du compte"}),e.jsx("input",{id:"input-wallet-name",...s.register("accountName"),placeholder:"Nom du titulaire",className:"wallet-field-control","data-testid":"input-wallet-name"}),s.formState.errors.accountName&&e.jsx("p",{className:"wallet-error",children:s.formState.errors.accountName.message})]}),e.jsxs("div",{className:"wallet-field",children:[e.jsx("label",{className:"wallet-field-label",htmlFor:"input-wallet-number",children:"* Numéro de téléphone"}),e.jsx("input",{id:"input-wallet-number",...s.register("accountNumber"),type:"tel",placeholder:"Veuillez saisir le numéro",className:"wallet-field-control","data-testid":"input-wallet-number"}),s.formState.errors.accountNumber&&e.jsx("p",{className:"wallet-error",children:s.formState.errors.accountNumber.message})]})]}),e.jsx("div",{className:"wallet-confirm-wrap",children:e.jsx("button",{onClick:R,disabled:w.isPending,className:"wallet-confirm","data-testid":"button-confirm-wallet",children:w.isPending?e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx(C,{className:"w-4 h-4 animate-spin"}),"Enregistrement..."]}):"Confirmer"})}),q&&e.jsx("div",{className:"country-picker-overlay",onClick:()=>{d(""),c(!1)},children:e.jsxs("section",{className:"country-picker",role:"dialog","aria-modal":"true","aria-label":"Choisir un opérateur",onClick:t=>t.stopPropagation(),children:[e.jsx("button",{className:"country-picker-close",onClick:()=>{d(""),c(!1)},"aria-label":"Fermer",children:e.jsx(G,{"aria-hidden":"true"})}),e.jsxs("div",{className:"country-picker-search",children:[e.jsx(J,{"aria-hidden":"true"}),e.jsx("input",{autoFocus:!0,value:x,onChange:t=>d(t.target.value),placeholder:"Search","aria-label":"Rechercher un opérateur"})]}),e.jsxs("div",{className:"country-picker-list",children:[v.filter(t=>t.toLowerCase().includes(x.trim().toLowerCase())).map(t=>e.jsxs("button",{onClick:()=>D(t),className:`country-picker-row${p===t?" is-selected":""}`,"data-testid":`button-bank-${t}`,children:[e.jsx("span",{children:t}),p===t&&e.jsx("span",{className:"country-picker-check",children:e.jsx(L,{"aria-hidden":"true"})})]},t)),v.filter(t=>t.toLowerCase().includes(x.trim().toLowerCase())).length===0&&e.jsx("p",{className:"country-picker-empty",children:"Aucun opérateur trouvé"})]})]})})]}):e.jsxs("div",{className:"flex flex-col min-h-full bg-gray-50",children:[e.jsxs("div",{className:"flex items-center px-4 py-4",style:{background:"linear-gradient(112deg, #55c9e5 0%, #3174d1 100%)"},children:[e.jsx(I,{href:K,children:e.jsx("button",{className:"w-9 h-9 flex items-center justify-center rounded-full bg-white/20","data-testid":"button-back",children:e.jsx(E,{className:"w-5 h-5 text-white"})})}),e.jsx("h1",{className:"flex-1 text-center text-white font-bold text-base",children:l?"Sélectionner un compte":"Liste des comptes bancaires"}),l?e.jsx("div",{className:"w-9"}):e.jsx("button",{onClick:()=>n(!0),className:"w-9 h-9 flex items-center justify-center rounded-full bg-white/20","data-testid":"button-add-wallet-icon",children:e.jsx(Y,{className:"w-5 h-5 text-white"})})]}),e.jsx("div",{className:"flex-1 px-4 pt-4 pb-28 space-y-3",children:T?e.jsx("div",{className:"flex justify-center py-12",children:e.jsx(C,{className:"w-6 h-6 animate-spin text-[#3174d1]"})}):h&&h.length>0?h.map(t=>e.jsxs("div",{onClick:()=>l&&A(t),className:`bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3 ${l?"cursor-pointer active:opacity-80":""} ${t.isDefault?"border-l-4 border-[#3174d1]":""}`,"data-testid":`wallet-card-${t.id}`,children:[e.jsx("div",{className:"w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0",children:e.jsx(te,{className:"w-5 h-5 text-gray-500"})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("p",{className:"font-bold text-gray-800 text-sm",children:t.paymentMethod}),e.jsx("p",{className:"text-xs text-gray-500 mt-0.5 truncate",children:t.accountName}),e.jsx("p",{className:"text-xs text-gray-400 mt-0.5",children:t.accountNumber}),t.isDefault&&e.jsxs("div",{className:"flex items-center gap-1 mt-1",children:[e.jsx(Z,{className:"w-3 h-3 text-[#3174d1]"}),e.jsx("span",{className:"text-xs text-[#3174d1] font-medium",children:"Par défaut"})]})]}),!l&&e.jsxs("div",{className:"flex items-center gap-1",children:[!t.isDefault&&e.jsx("button",{onClick:()=>k.mutate(t.id),disabled:k.isPending,className:"p-2","data-testid":`button-set-default-${t.id}`,children:e.jsx(L,{className:"w-4 h-4 text-green-500"})}),e.jsx("button",{onClick:()=>N.mutate(t.id),disabled:N.isPending,className:"p-2","data-testid":`button-delete-wallet-${t.id}`,children:e.jsx(ee,{className:"w-4 h-4 text-[#3174d1]"})})]}),l&&e.jsx($,{className:"w-4 h-4 text-gray-300 flex-shrink-0"})]},t.id)):e.jsxs("div",{className:"text-center py-10 flex flex-col items-center gap-2",children:[e.jsx("img",{src:_,alt:"Vide",className:"w-40 h-40 object-contain opacity-90"}),e.jsx("p",{className:"text-gray-500 text-sm",children:"Aucun compte bancaire enregistré"}),e.jsx("p",{className:"text-gray-400 text-xs mt-1",children:"Ajoutez un compte pour effectuer des retraits"})]})}),e.jsx("div",{className:"fixed bottom-0 left-0 right-0 px-4 pb-6 pt-3 bg-gray-50",children:e.jsx("button",{onClick:()=>n(!0),className:"w-full py-4 rounded-full text-white font-bold text-base shadow-md",style:{background:"linear-gradient(112deg, #55c9e5 0%, #3174d1 100%)"},"data-testid":"button-add-wallet",children:"Ajouter une carte"})})]})}export{we as default};
