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

app.get('/api/products/:productId/reviews/:reviewID', (req, res) => {
  console.log(req.params);
  res.send('hello world');
});

app.get('/api/v1/query', (req, res) => {
  const { search, limit } = req.query;
  let sortedProducts = [...products];
  
  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    })
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  
  if (sortedProducts.length < 1) {
    // return res.status(200).send('no products matched your search');
    return res.status(200).send({ success: true, data: [] });
  }

  return res.status(200).json(sortedProducts);
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000...');
});