import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i}from"./assets/vendor-BbbuE1sJ.js";const o=document.querySelector("button"),s=document.querySelector(".form"),r=s.elements.delay,c=s.elements.state;let a,n;function u(e,t){return new Promise((l,m)=>{setTimeout(()=>{t==="fulfilled"?l(e):m(e)},e)})}const d=e=>{e.classList.contains("active")||(e.classList.add("active"),e.disabled=!1)},p=e=>{e.classList.contains("active")&&(e.classList.remove("active"),e.disabled=!0)};s.addEventListener("input",()=>{r.value.trim()&&c.value?d(o):p(o)});s.addEventListener("submit",e=>{e.preventDefault(),a=parseInt(r.value),n=c.value,u(a,n).then(t=>{i.success({message:`✅ Fulfilled promise in ${t}ms`,position:"topRight",color:"green"})}).catch(t=>{i.error({message:`❌ Rejected promise in ${t}ms`,position:"topRight",color:"red"})})});
//# sourceMappingURL=2-snackbar.js.map
