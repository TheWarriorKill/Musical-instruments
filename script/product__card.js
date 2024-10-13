document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('http://localhost:3000/data');
        const data = await response.json();
        const urlParams = new URLSearchParams(window.location.search);
        const productNameParam = urlParams.get('product');

        const productLinks = document.getElementsByClassName('card-slider__block');
        for (let i = 0; i < productLinks.length; i++) {
            productLinks[i].addEventListener('click', function (event) {
                for (let k = 0; k < data.length; k++) {
                    if (
                        data[k].img.toLowerCase() === productLinks[i].querySelector('.bdImage').getAttribute('src').toLowerCase()
                    ) {
                        const clickedProductName = data[k].name;
                        console.log(clickedProductName);
                        window.location.href = `product__card.html?product=${encodeURIComponent(clickedProductName)}`;
                        event.preventDefault();
                        return false;
                    }
                }
            });
        }

        if (productNameParam) {
            const clickedProduct = data.find(
                (item) => item.name.toLowerCase() === productNameParam.toLowerCase()
            );
            if (clickedProduct) {
                const descr = document.getElementsByClassName('bdProductName')[0];
                const oldPrice = document.getElementsByClassName('main__product-price')[0];
                const price = document.getElementsByClassName('bdProductPrice')[0];
                const image = document.getElementsByClassName('bdProductImg')[0];
                const discounts = document.getElementsByClassName('main__product-discount')[0];
                const categories = document.getElementsByClassName('main__product-category')[0];

                descr.innerHTML = clickedProduct.description;
                price.innerHTML = `$${clickedProduct.price}`;
                image.src = clickedProduct.img;
                if (clickedProduct.discount) {
                    const disc = document.createElement('span');
                    disc.innerHTML = 'on sale';
                    discounts.appendChild(disc);
                }

                if (clickedProduct.oldPrice !== undefined) {
                    const oldPrices = document.createElement('span');
                    oldPrices.innerHTML = `$${clickedProduct.oldPrice}`;
                    oldPrice.appendChild(oldPrices);
                }

                if (clickedProduct.category !== null) {
                    const pCategory = document.createElement('a');
                    const encodedProductCategories = encodeURIComponent(clickedProduct.category.toLowerCase());
                    pCategory.innerHTML = `${clickedProduct.category}`;
                    pCategory.href = `/musical-Instruments/html/products.html?category=${encodedProductCategories}`;
                    pCategory.className = 'productsCategory';
                    categories.appendChild(pCategory);
                }

                localStorage.setItem('clickedProduct', JSON.stringify(clickedProduct));
            } else {
                console.error('Товар не найден.');
                window.location.href = `404.html`;
            }
        } else {
            console.error('Не указано имя товара в URL.');
        }
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
});
