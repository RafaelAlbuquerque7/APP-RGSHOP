let url = `https://elated-yak-turtleneck.cyclic.app/produtos`;
const main = document.querySelector('main');

window.addEventListener('load', e => {
    postComp();
    "use strict";//restrito a funcionar em navegadores comES6 >
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("./sw.js");
    }
}); 

async function postComp() {
    const res = await fetch(url);
    const data = await res.json();
    main.innerHTML = data.articles.map(createArticle).join('\n');
}

function createArticle(article){
    return `
           <div class="article">
                <a href="${article.url}" target="_blank">
                    <img src="${article.urlToImage}" class="image" alt="${article.content}"/>
                    <h2>${article.title}</h2>
                    <p>${article.description}</p>
                </a>
           </div>
    `
}


