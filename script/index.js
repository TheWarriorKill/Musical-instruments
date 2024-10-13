'use strict'

const images = document.getElementsByClassName('bdImage');
const descriptions = document.getElementsByClassName('bdDescription');
const price = document.getElementsByClassName('bdPrice')
const discounts = document.getElementsByClassName('card-slider__block-discount')
const oldPrice = document.getElementsByClassName("card-slider__block-price");
const bdLinks = document.getElementsByClassName('bdLink')
const bdCategory = document.getElementsByClassName('bdCategory')
const searchInput = document.getElementsByClassName('search')[0];
const searchButton = document.getElementsByClassName('head__search-icon')[0];


searchButton.addEventListener('click', searchProducts);
searchInput.addEventListener('keydown', function (event){
    if (event.keyCode === 13) {
        event.preventDefault();
        searchButton.click();
    }
})

function searchProducts() {
    const searchTerm = searchInput.value;

    fetch(`http://localhost:3000/search?term=${encodeURIComponent(searchTerm)}`)
        .then((response) => response.json())
        .then((matchingProducts) => {
            const searchTerm = searchInput.value;

            const encodedSearchTerm = encodeURIComponent(searchTerm);
            const searchURL = `products.html?search=${encodedSearchTerm}`;

            window.location.href = searchURL;
        })
        .catch((error) => {
            console.error('Ошибка при поиске товара:', error);
        });
}


let scroll = document.getElementById('arrow')
let content = document.getElementById('scroll-slider')
let buttonR = document.getElementById('buttonR')
let buttonL = document.getElementById('buttonL')
let productScreen = document.getElementById('productScreen');

let description = document.getElementById('text-description')
let specification = document.getElementById('text-specification')

let mainClassDesk = 'main__product__text-description'
let mainClassSpec = 'main__product__text-specification'

new Swiper('.head__slider', {
    effect: 'fade',
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    autoplay: {
        delay: 5000,
    },
    speed: 2000,
});
new Swiper('.card-slider', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    speed: 500,
    mousewheel: {
        sensitivity: 1,
        eventsTarget: ".card-slider",
    },
    slidesPerView: 4,
})

new Swiper('.card-slider-second', {
    navigation: {
        nextEl: '.swiper-button-next-second',
        prevEl: '.swiper-button-prev-second',
    },
    speed: 500,
    mousewheel: {
        sensitivity: 1,
        eventsTarget: ".card-slider-second",
    },
    slidesPerView: 4,
})

new Swiper('.card__slider-third', {
    navigation: {
        nextEl: '.swiper-button-next-third',
        prevEl: '.swiper-button-prev-third',
    },
    effect: 'cubic-bezier',
    speed: 400,
    slidesPerView: 5,
    autoplay: {
        delay: 5000,
    },
    // width: 860,
    freeMode: true,
    mousewheel: {
        sensitivity: 0.3,
    },
})

new Swiper('.main__products-swiper', {
    // cssMode: true,
    slidesPerView: 4,
    navigation: {
        prevEl: ".main__products-left",
        nextEl: ".main__products-right"
    }
})


if (description != null) {
    description.addEventListener("click", () => {
        description.className = `${mainClassDesk} text-active`
        if (specification.className === `${mainClassSpec} text-active`) {
            specification.className = mainClassSpec;
        }
    })
}

if (specification != null) {
    specification.addEventListener("click", () => {
        specification.className = `${mainClassSpec} text-active`
        if (description.className === `${mainClassDesk} text-active`) {
            description.className = mainClassDesk;
        }
    })
}


if (scroll != null) {
    scroll.addEventListener('click', () => {
        content.scrollIntoView({
            behavior: 'smooth',
        })
    })
}

if (buttonR != null) {
    buttonR.addEventListener('click', () => {
        if (productScreen != null) {
            productScreen.innerHTML = +productScreen.innerHTML + 1;
        }
        if (productScreen.innerHTML >= 10) {
            productScreen.innerHTML = '10'
        }
    })
}

if (buttonL != null) {
    buttonL.addEventListener('click', () => {
        if (productScreen != null) {
            productScreen.innerHTML = +productScreen.innerHTML - 1;
        }
        if (productScreen.innerHTML <= 0) {
            productScreen.innerHTML = '0';

        }
    })
}

fetch('http://localhost:3000/data')
    .then((response) => response.json())
    .then((data) => {

        for (let i = 0; i < bdLinks.length; i++) {
            bdLinks[i].addEventListener('click', (event) => {
                event.preventDefault();

                const productName = encodeURIComponent(images[i].alt.toLowerCase().replace(/\s/g, '-'));
                window.location.href = `product__card.html?product=${productName}`;
            });
        }

        for (let i = 0; i < bdCategory.length; i++) {
            bdCategory[i].addEventListener('click', (event) => {
                event.preventDefault();

                for (let k = 0; k < data.length; k++) {
                    if (data[k].category.toLowerCase() === bdCategory[i].id.toLowerCase()) {
                    }
                }

                const productCategory = encodeURIComponent(bdCategory[i].id.toLowerCase().replace(/\s/g, '-'));
                window.location.href = `products.html?category=${productCategory}`;
            });
        }

        for (let i = 0; i < data.length; i++) {
            for (let k = 0; k < images.length; k++) {
                if (images[k].alt.toLowerCase() === data[i].name.toLowerCase()) {
                    images[k].src = data[i].img;
                    price[k].innerText = `$${data[i].price}`;
                    descriptions[k].innerText = data[i].description;
                    if (data[i].discount === true) {
                        const discountElement = document.createElement('span');
                        discountElement.innerText = 'On Sale';
                        discounts[k].appendChild(discountElement);
                    }
                    if (data[i].oldPrice !== undefined) {
                        const oldPrices = document.createElement('span')
                        oldPrices.innerText = `$${data[i].oldPrice}`
                        oldPrice[k].appendChild(oldPrices)
                        console.log()
                    }
                }
            }
        }




    })
    .catch((error) => {
        console.error('Ошибка при получении данных:', error);
    });


window.addEventListener('error', function (e) {
    e.preventDefault();
    window.location.href = '../html/404.html';
});

