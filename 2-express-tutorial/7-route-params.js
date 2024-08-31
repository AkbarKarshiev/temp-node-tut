const express = require('express');
const app = express();

const { products } = require('./data');

app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1><a href="/api/products">products</a>');
});

app.get('/api/products', (req, res) => {
  res.json(products.map(({desc, ...product}) => product));
});

app.get('/api/products/:productId', (req, res) => {
  const { productId } = req.params;

  const foundProduct = products.find((product) => product.id === Number(productId));
  
  if (foundProduct)
    return res.json(foundProduct);

  return res.status(404).json('resource not found');
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000...');
});