let _0x1a=null,_0x1b=!1,_0x1c=1,_0x1d="5581989349868",_0x1e=129.9,_0x1f="",_0x20=0;

function _0x21(){
if(!_0x1a||_0x1b)return;
_0x1a.volume=.35;
_0x1a.play().then(()=>{_0x1b=!0}).catch(()=>{});
}

window.addEventListener("load",()=>{
_0x1a=document.getElementById("bgMusic");
_0x21();
});

document.addEventListener("click",()=>{_0x21()},{once:!0});
document.addEventListener("touchstart",()=>{_0x21()},{once:!0});

function _0x22(){
const _0x23=new(window.AudioContext||window.webkitAudioContext)(),
_0x24=_0x23.createOscillator(),
_0x25=_0x23.createGain();

_0x24.type="triangle";
_0x24.frequency.value=650;
_0x25.gain.value=.02;

_0x24.connect(_0x25);
_0x25.connect(_0x23.destination);

_0x24.start();
_0x24.stop(_0x23.currentTime+.05);
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

function changeQty(v){
_0x1c=Math.max(1,_0x1c+v);
document.getElementById("qtyDisplay").innerText=_0x1c;
}

function goToStep2(){
const c=document.getElementById("itemsContainer");
c.innerHTML="";

for(let i=1;i<=_0x1c;i++){
c.innerHTML+=`
<div class="glass-card p-6 border-l-4 border-l-yellow-500">
<h3 class="text-lg font-black italic uppercase mb-4">Camisa #${i}</h3>

<div class="grid grid-cols-4 gap-2 mb-4">
${["P","M","G","GG"].map(t=>`
<label>
<input type="radio" name="tamanho_${i}" value="${t}" class="hidden peer" ${t==="M"?"checked":""}>
<div class="peer-checked:bg-yellow-500 peer-checked:text-black border border-white/10 py-3 text-center rounded-xl font-black text-sm">${t}</div>
</label>`).join("")}
</div>

<input type="text" id="personalizacao_${i}" placeholder="NOME E NÚMERO (OPCIONAL)" class="input-field w-full p-4 rounded-xl text-sm font-bold uppercase">
</div>`;
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

if(!n||!c||!t){alert("Preencha Nome, CPF e WhatsApp.");return}
if(_0x20===0){alert("Digite um CEP válido.");return}

let s=_0x1e*_0x1c,
z=s+_0x20,
r=`*NOVO PEDIDO - MONTZZON 🇧🇷*\n\n`;

r+=`*Nome:* ${n}\n`;
r+=`*CPF:* ${c}\n`;
r+=`*WhatsApp:* ${t}\n\n`;
r+=`*ITENS PEDIDO*\n`;

for(let i=1;i<=_0x1c;i++){
const tm=document.querySelector(`input[name="tamanho_${i}"]:checked`).value,
ps=document.getElementById(`personalizacao_${i}`).value||"Sem personalização";

r+=`Item ${i}: ${tm} | ${ps}\n`;
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