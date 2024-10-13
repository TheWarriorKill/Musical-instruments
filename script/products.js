document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('http://localhost:3000/data');
        const data = await response.json();

        const urlParams = new URLSearchParams(window.location.search);
        const categoryNameParam = urlParams.get('category');

        const nameParam = urlParams.get('search')

        const emptyProducts = document.getElementsByClassName('emptyProducts')


        if (categoryNameParam) {
            const productsWithCategory = data.filter(
                (item) => item.category.toLowerCase() === categoryNameParam.toLowerCase()
            );

            if (productsWithCategory.length > 0) {
                const mainProducts = document.querySelector('.main__products');

                let currentBlock = document.createElement('div');
                currentBlock.classList.add('main__products-block');

                if (productsWithCategory) {
                    for (let i = 0; i < emptyProducts.length; i++) {
                        emptyProducts[i].style.display = 'none'
                    }
                }

                const baseURL = window.location.origin; // Получаем базовый URL

                for (let i = 0; i < productsWithCategory.length; i++) {
                    if (i % 4 === 0 && i !== 0) {
                        mainProducts.appendChild(currentBlock);
                        currentBlock = document.createElement('div');
                        currentBlock.classList.add('main__products-block');
                    }
                    const product = productsWithCategory[i];
                    const cardBlock = document.createElement('div');
                    cardBlock.classList.add('card-slider__block', 'swiper-slide');

                    const mainTitleProducts = document.querySelector('.main__guitar-title')
                    const mainTitleParagraph = document.createElement('p')
                    if (i < 1){
                        mainTitleParagraph.innerText = `${product.category}`
                    }
                    mainTitleProducts.appendChild(mainTitleParagraph)

                    const link = document.createElement('a');
                    link.classList.add('bdLink');
                    link.href = `${baseURL}/product__card.html?name=${encodeURIComponent(product.name)}`;
                    link.setAttribute('data-name', product.name);

                    const blockContent = document.createElement('div');
                    blockContent.classList.add('card-slider__block-content');

                    const discountBlock = document.createElement('div');
                    discountBlock.classList.add('card-slider__block-discount');

                    const discountSpan = document.createElement('span');
                    discountSpan.innerText = 'On Sale';

                    const imgBlock = document.createElement('div');
                    imgBlock.classList.add('card-slider__block-img');

                    const image = document.createElement('img');
                    image.classList.add('bdImage');
                    image.src = `${baseURL}/${product.img}`;
                    image.alt = product.name;

                    const descriptionBlock = document.createElement('div');
                    descriptionBlock.classList.add('card-slider__block-description');

                    const description = document.createElement('p');
                    description.classList.add('bdDescription');
                    description.textContent = product.description;

                    const priceBlock = document.createElement('div');
                    priceBlock.classList.add('card-slider__block-price');

                    const oldPriceBlock = document.createElement('span')
                    oldPriceBlock.innerText = `$${product.oldPrice}`

                    const price = document.createElement('p');
                    price.classList.add('bdPrice');
                    price.textContent = `$${product.price}`;


                    descriptionBlock.appendChild(description);
                    priceBlock.appendChild(price);
                    imgBlock.appendChild(image);
                    blockContent.appendChild(discountBlock);
                    blockContent.appendChild(imgBlock);
                    blockContent.appendChild(descriptionBlock);
                    blockContent.appendChild(priceBlock);
                    link.appendChild(blockContent);
                    cardBlock.appendChild(link);
                    currentBlock.appendChild(cardBlock);

                    if (product.oldPrice !== null && product.oldPrice !== undefined) {
                        priceBlock.appendChild(oldPriceBlock)
                    }

                    if (product.discount === true) {
                        discountBlock.appendChild(discountSpan);
                    }
                    link.addEventListener('click', function (event) {
                        const encodedProductName = encodeURIComponent(product.name);
                        console.log(encodedProductName);
                        link.href = `${baseURL}/musical-Instruments/html/product__card.html?product=${encodedProductName}`;
                    });
                }

                mainProducts.appendChild(currentBlock);
            } else {
                console.error('Товар не найден.');
                window.location.href = `404.html`;
            }
        }
        if (nameParam){
            const productsWithName = data.filter(
                (item) => item.name.toLowerCase().includes(nameParam.toLowerCase())
            );
            if (productsWithName.length > 0){
                const mainProducts = document.querySelector('.main__products');

                let currentBlock = document.createElement('div');
                currentBlock.classList.add('main__products-block');

                if (productsWithName) {
                    for (let i = 0; i < emptyProducts.length; i++) {
                        emptyProducts[i].style.display = 'none'
                    }
                }

                const baseURL = window.location.origin;

                for (let i = 0; i < productsWithName.length; i++) {
                    if (i % 4 === 0 && i !== 0) {
                        mainProducts.appendChild(currentBlock);
                        currentBlock = document.createElement('div');
                        currentBlock.classList.add('main__products-block');
                    }
                    const product = productsWithName[i];
                    const cardBlock = document.createElement('div');
                    cardBlock.classList.add('card-slider__block', 'swiper-slide');

                    const mainTitleProducts = document.querySelector('.main__guitar-title')
                    const mainTitleParagraph = document.createElement('p')
                    if (i < 1){
                        mainTitleParagraph.innerText = `${product.category}`
                    }
                    mainTitleProducts.appendChild(mainTitleParagraph)

                    const link = document.createElement('a');
                    link.classList.add('bdLink');
                    link.href = `${baseURL}/product__card.html?name=${encodeURIComponent(product.name)}`;
                    link.setAttribute('data-name', product.name);

                    const blockContent = document.createElement('div');
                    blockContent.classList.add('card-slider__block-content');

                    const discountBlock = document.createElement('div');
                    discountBlock.classList.add('card-slider__block-discount');

                    const discountSpan = document.createElement('span');
                    discountSpan.innerText = 'On Sale';

                    const imgBlock = document.createElement('div');
                    imgBlock.classList.add('card-slider__block-img');

                    const image = document.createElement('img');
                    image.classList.add('bdImage');
                    image.src = `${baseURL}/${product.img}`;
                    image.alt = product.name;

                    const descriptionBlock = document.createElement('div');
                    descriptionBlock.classList.add('card-slider__block-description');

                    const description = document.createElement('p');
                    description.classList.add('bdDescription');
                    description.textContent = product.description;

                    const priceBlock = document.createElement('div');
                    priceBlock.classList.add('card-slider__block-price');

                    const oldPriceBlock = document.createElement('span')
                    oldPriceBlock.innerText = `$${product.oldPrice}`

                    const price = document.createElement('p');
                    price.classList.add('bdPrice');
                    price.textContent = `$${product.price}`;


                    descriptionBlock.appendChild(description);
                    priceBlock.appendChild(price);
                    imgBlock.appendChild(image);
                    blockContent.appendChild(discountBlock);
                    blockContent.appendChild(imgBlock);
                    blockContent.appendChild(descriptionBlock);
                    blockContent.appendChild(priceBlock);
                    link.appendChild(blockContent);
                    cardBlock.appendChild(link);
                    currentBlock.appendChild(cardBlock);

                    if (product.oldPrice !== null && product.oldPrice !== undefined) {
                        priceBlock.appendChild(oldPriceBlock)
                    }

                    if (product.discount === true) {
                        discountBlock.appendChild(discountSpan);
                    }
                    link.addEventListener('click', function (event) {
                        const encodedProductName = encodeURIComponent(product.name);
                        console.log(encodedProductName);
                        link.href = `${baseURL}/musical-Instruments/html/product__card.html?product=${encodedProductName}`;
                    });
                }

                mainProducts.appendChild(currentBlock);
            }
        }
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
});
