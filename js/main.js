
let url = `https://elated-yak-turtleneck.cyclic.app/produtos`;
const main = document.querySelector('main');
//const capturarLocalizacao = document.getElementById('localizacao');

window.addEventListener('load', e => {
    postComp();
    "use strict";//restrito a funcionar em navegadores comES6 >
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("../sw.js");
    }
}); 

async function postComp() {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    document.getElementById("cards").innerHTML = data.map(createArticle).join('\n');
}

function createArticle(article){
    return `
           <div class="article">
              
            <img src="${article.imagem}" class="image"/>
        
                    <h2>${article.titulo}</h2>
                    
                    <p>${article.descricao}</p>
                    <p>Preço: R$ ${article.preco},00</p>
                

           </div>
    `
}