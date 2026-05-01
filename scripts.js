let _0x1a=null,_0x1b=!1,_0x1c=1,_0x1d="5581989301530",_0x1e=99.76,_0x1f="",_0x20=0;
let pedidosGenero=[];

function addGenero(tipo){
pedidosGenero.push(tipo);
renderGenero();
}

function removerGenero(index){
pedidosGenero.splice(index,1);
renderGenero();
}

function renderGenero(){
const box=document.getElementById("listaGenero");
box.innerHTML="";

pedidosGenero.forEach((item,index)=>{
box.innerHTML+=`
<div class="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
<span class="font-bold uppercase">
${index+1}. ${item}
</span>

<button onclick="removerGenero(${index})"
class="text-red-400 font-black text-xl">
×
</button>
</div>
`;
});

_0x1c=pedidosGenero.length;
document.getElementById("qtyDisplay").innerText=_0x1c;
}

function _0x21(){
if(!_0x1a||_0x1b)return;
_0x1a.volume=.35;
_0x1a.play().then(()=>{_0x1b=!0}).catch(()=>{});
}

window.addEventListener("load",()=>{
_0x1a=document.getElementById("bgMusic");
_0x21();
});

document.addEventListener("click",()=>{_0x21()},{once:true});
document.addEventListener("touchstart",()=>{_0x21()},{once:true});

function _0x22(){
const ctx=new(window.AudioContext||window.webkitAudioContext)(),
osc=ctx.createOscillator(),
gain=ctx.createGain();

osc.type="triangle";
osc.frequency.value=650;
gain.gain.value=.02;

osc.connect(gain);
gain.connect(ctx.destination);

osc.start();
osc.stop(ctx.currentTime+.05);
}

document.addEventListener("click",e=>{
if(e.target.closest("button,label"))_0x22();
});

function mascaraCEP(e){
let v=e.value.replace(/\D/g,"").slice(0,8);
if(v.length>5)v=v.slice(0,5)+"-"+v.slice(5);
e.value=v;
}

function buscarCEPauto(){
let v=document.getElementById("cep").value.replace(/\D/g,"");
if(v.length===8)buscarCEP();
}

function buscarCEP(){
let v=document.getElementById("cep").value.replace(/\D/g,"");

fetch(`https://viacep.com.br/ws/${v}/json/`)
.then(r=>r.json())
.then(d=>{
if(d.erro)return;

document.getElementById("rua").value=d.logradouro||"";
document.getElementById("bairro").value=d.bairro||"";
document.getElementById("numero").focus();

_0x1f=d.uf||"";
_0x20=calcularFrete(_0x1f);
});
}

function calcularFrete(v){
if(["SP","RJ","MG","ES"].includes(v))return 19.9;
if(["PR","SC","RS"].includes(v))return 24.9;
if(["BA","PE","CE","PB","RN","AL","SE","PI","MA"].includes(v))return 29.9;
if(["GO","DF","MT","MS","TO"].includes(v))return 27.9;
if(["AM","PA","RO","RR","AP","AC"].includes(v))return 39.9;
return 29.9;
}

function goToStep2(){

if(pedidosGenero.length===0){
alert("Selecione pelo menos uma camisa.");
return;
}

const c=document.getElementById("itemsContainer");
c.innerHTML="";

for(let i=1;i<=_0x1c;i++){

c.innerHTML+=`
<div class="glass-card p-6 border-l-4 border-l-yellow-500">

<h3 class="text-lg font-black italic uppercase mb-5">
Camisa ${pedidosGenero[i-1]==="Masculino"?"Masculino":"Feminina"}
</h3>

<p class="text-xs font-bold uppercase text-yellow-400 mb-3 tracking-widest">
Escolha o tamanho
</p>

<div class="grid grid-cols-5 gap-2 mb-6">

${["PP","P","M","G","GG"].map(t=>`
<label>
<input
type="radio"
name="tamanho_${i}"
value="${t}"
class="hidden peer"
${t==="M"?"checked":""}
>

<div class="peer-checked:bg-yellow-500 peer-checked:text-black border border-white/10 py-3 text-center rounded-xl font-black text-sm">
${t}
</div>
</label>
`).join("")}

</div>

<p class="text-xs font-bold uppercase text-yellow-400 mb-3 tracking-widest">
Nome
</p>

<input
type="text"
id="personalizacao_${i}"
placeholder="Digite o nome"
class="input-field w-full p-4 rounded-xl text-sm font-bold uppercase mb-6"
>

<p class="text-xs font-bold uppercase text-yellow-400 mb-3 tracking-widest">
Escolha o número
</p>

<div class="grid grid-cols-5 gap-4">

${Array.from({length:11},(_,n)=>n+1).map(num=>`
<label class="cursor-pointer">

<input
type="radio"
name="numero_${i}"
value="${num}"
class="hidden peer"
${num===10?"checked":""}
>

<div class="transition-all duration-200 peer-checked:scale-110 peer-checked:brightness-125">

<img 
  src="${num}.png" 
  class="w-full h-[70px] object-contain mx-auto filter drop-shadow-sm"
>

</div>

</label>
`).join("")}

</div>
`;
}

switchStep("step1","step2");
}

function goToStep3(){switchStep("step2","step3")}
function goToStep4(){switchStep("step3","step4")}
function backToStep1(){switchStep("step2","step1")}
function backToStep2(){switchStep("step3","step2")}
function backToStep3(){switchStep("step4","step3")}

function switchStep(a,b){
document.getElementById(a).classList.remove("active");
document.getElementById(b).classList.add("active");
window.scrollTo({top:0,behavior:"smooth"});
}

function finalizarPedido(){

const n=document.getElementById("cliente_nome").value,
c=document.getElementById("cliente_cpf").value,
t=document.getElementById("cliente_tel").value;

if(!n||!c||!t){
alert("Preencha Nome, CPF e WhatsApp.");
return;
}

if(_0x20===0){
alert("Digite um CEP válido.");
return;
}

let s=_0x1e*_0x1c,
z=s+_0x20,
r=`*NOVO PEDIDO - MONTZZON 🇧🇷*\n\n`;

r+=`*Nome:* ${n}\n`;
r+=`*CPF:* ${c}\n`;
r+=`*WhatsApp:* ${t}\n\n`;

r+=`*ITENS PEDIDO*\n`;

for(let i=1;i<=_0x1c;i++){

const genero=pedidosGenero[i-1]==="Masculino"?"Masculino":"Feminina";
const tm=document.querySelector(`input[name="tamanho_${i}"]:checked`).value;
const nm=document.getElementById(`personalizacao_${i}`).value||"Sem nome";
const nr=document.querySelector(`input[name="numero_${i}"]:checked`).value;

r+=`Item ${i}: ${genero} | Tam ${tm} | ${nm} | Nº ${nr}\n`;
}

r+=`\n*ENDEREÇO*\n`;
r+=`${document.getElementById("rua").value}, ${document.getElementById("numero").value}\n`;
r+=`${document.getElementById("bairro").value}\n`;
r+=`CEP: ${document.getElementById("cep").value}\n`;
r+=`UF: ${_0x1f}\n`;

r+=`\n*RESUMO PAGAMENTO*\n`;
r+=`Camisas: R$ ${s.toFixed(2).replace(".",",")}\n`;
r+=`Frete: R$ ${_0x20.toFixed(2).replace(".",",")}\n`;
r+=`*TOTAL: R$ ${z.toFixed(2).replace(".",",")}*`;

if(_0x1a)_0x1a.pause();

window.open(`https://wa.me/${_0x1d}?text=${encodeURIComponent(r)}`,"_blank");
}
