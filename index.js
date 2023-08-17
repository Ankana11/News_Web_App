const API_key = 'e57231eade29412a843937296b240cb2';
const url = 'https://newsapi.org/v2/everything';

// Fetching datafrom API-----------------------------

window.addEventListener('load', () => fetchNews("India"));
async function fetchNews(query) {
    const res = await fetch(`${url}?q=${query}&apiKey=${API_key}`);
    const data = await res.json();
    bindData(data.articles);
}
function reload() {
    window.location.reload();
}

// Binding data-----------------------------

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("templates");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

// In the card section-------------

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-image");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

// Function of NavItems--------------------------

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

// Function of searchbar-------------------------------

const searchButton = document.getElementById("search-button");
const searchText = document.querySelector(".news-input");
searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

//Making Burger---------------------

burger = document.querySelector('.burger')
navbar = document.querySelector('.main-nav')
navlist = document.querySelector('.navlist')


burger.addEventListener("click", () => {
    navlist.classList.toggle('v-class-resp')
    navbar.classList.toggle('h-nav-resp')
})