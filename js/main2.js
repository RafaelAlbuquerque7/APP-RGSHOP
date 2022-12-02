window.addEventListener('load', e => {
    "use strict";//restrito a funcionar em navegadores comES6 >
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("../sw.js");
    }
}); 


let posicaoInicial;//variavel para capturar a posicao
let capturarLocalizacao= document.getElementById('localizacao');
const map = document.getElementById('mapa');
 
const sucesso = (posicao) => {//callback de sucesso para captura da posicao
    posicaoInicial = posicao;
    map.src = 'https://maps.google.com/maps?q=' + posicaoInicial.coords.latitude +','+ posicaoInicial.coords.longitude + '&z=13&ie=UTF8&iwloc=&output=embed';
    console.log(posicaoInicial.coords.latitude, posicaoInicial.coords.longitude)
    console.log(map.src);
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
 
// function loc() {
//     navigator.geolocation.getCurrentPosition(sucesso, erro);
//   };
capturarLocalizacao.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(sucesso, erro);
});