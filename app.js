
const meses=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const mesSel=document.getElementById("mes");
meses.forEach((m,i)=>{
 let o=document.createElement("option");
 o.value=i;o.textContent=m;mesSel.appendChild(o);
});

function gruposLista(){
 return document.getElementById("grupos").value.split("\n").map(x=>x.trim()).filter(Boolean);
}

function carregarGrupos(){
 let g=gruposLista();
 ["seg","ter","qui","sab"].forEach(id=>{
   let s=document.getElementById(id);
   s.innerHTML="";
   g.forEach(n=>{
      let o=document.createElement("option");
      o.value=n;o.textContent=n;
      s.appendChild(o);
   });
 });
}

function gerar(){
 const grupos=gruposLista();
 if(grupos.length<4){alert("Cadastre ao menos 4 grupos.");return;}

 const semanaBase=[
   seg.value,ter.value,qui.value,sab.value
 ];

 let mesesQtd=parseInt(periodo.value);
 let ano=parseInt(document.getElementById("ano").value);
 let mesInicial=parseInt(document.getElementById("mes").value);

 let html="";

 let filaExtras=grupos.filter(g=>!semanaBase.includes(g));

 for(let m=0;m<mesesQtd;m++){
   let mes=(mesInicial+m)%12;
   let anoAtual=ano+Math.floor((mesInicial+m)/12);

   html+=`<div class='mes'><h2>ESCALA DE CULTOS - ${meses[mes].toUpperCase()}/${anoAtual}</h2>`;

   let atual=[...semanaBase];

   for(let semana=1;semana<=5;semana++){

      if(grupos.length>4 && semana===1 && filaExtras.length){
         let usados=[...filaExtras,...atual].slice(0,4);
         while(usados.length<4) usados.push(atual[usados.length]);
         atual=usados.slice(0,4);
      }

      html+=`<div class='semana'><b>SEMANA ${semana}</b><br>
      Segunda - ${atual[0]}<br>
      Terça - ${atual[1]}<br>
      Quinta - ${atual[2]}<br>
      Sábado - ${atual[3]}<br></div>`;

      atual=[atual[3],atual[0],atual[1],atual[2]];
   }

   html+="</div>";

   semanaBase.splice(0,4,...atual);
  }

 document.getElementById("resultado").innerHTML=html;
}

window.onload=carregarGrupos;
