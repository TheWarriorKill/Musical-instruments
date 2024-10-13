'use strict';
const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

app.use(cors());

app.use(express.json());

async function getData() {
    try {
        await client.connect();

        const database = client.db('products');
        const collection = database.collection('product');
        const documents = await collection
            .find(
                {},
                {
                    _id: 1,
                    img: 1,
                    discount: 1,
                    name: 1,
                    description: 1,
                    price: 1,
                    oldPrice: 1,
                    category: 1,
                }
            )
            .toArray();

        return documents.map((document) => ({
            _id: document._id,
            img: document.img,
            discount: document.discount,
            name: document.name,
            description: document.description,
            price: document.price,
            oldPrice: document.oldPrice,
            category: document.category,
        }));
    } finally {
        await client.close();
    }
}

// Определение маршрута для /data
app.get('/data', (req, res) => {
    getData()
        .then((documents) => {
            res.json(documents);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Ошибка при получении данных' });
        });
});

// Определение маршрута для поиска товара
app.get('/search', (req, res) => {
    const searchTerm = req.query

    getData()
        .then((documents) => {
            const matchingProducts = documents.filter((product) => {
                const productName = product.name.toLowerCase();
                return productName.includes(searchTerm.toLowerCase());
            });

            res.json(matchingProducts);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Ошибка при поиске товара' });
        });
});

// Обработка несуществующих маршрутов
app.use((req, res, next) => {
    console.log('Обращение к несуществующему маршруту:', req.url);
    next();
});

// Запуск сервера
const port = 3000;
app.listen(process.env.PORT || port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
