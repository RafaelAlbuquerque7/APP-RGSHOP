let url = `https://elated-yak-turtleneck.cyclic.app/produtos`;
const main = document.querySelector('main');

window.addEventListener('load', e => {
    loc();
    postComp();
    "use strict";//restrito a funcionar em navegadores comES6 >
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("./sw.js");
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
                    <p>R$ ${article.preco}</p>
                

           </div>
    `
}

let posicaoInicial;//variavel para capturar a posicao
const map = document.getElementById('mapa');
 
const sucesso = (posicao) => {//callback de sucesso para captura da posicao
    posicaoInicial = posicao;
    map.src = "http://maps.google.com/maps?q="+ posicaoInicial.coords.latitude+"," + posicaoInicial.coords.longitude +"&z=16&output=embed"
};
 
const erro = (error) => {//callback de error (falha para captura de localizacao)
    let errorMessage;
    switch(error.code){
        case 0:
            errorMessage = "Erro desconhecido"
        break;
        case 1:
            errorMessage = "Permissão negada!"
        break;
        case 2:
            errorMessage = "Captura de posição indisponível!"
        break;
        case 3:
            errorMessage = "Tempo de solicitação excedido!"
        break;
    }
    console.log('Ocorreu um erro: ' + errorMessage);
};
 
function loc () {
    navigator.geolocation.getCurrentPosition(sucesso, erro);
};
