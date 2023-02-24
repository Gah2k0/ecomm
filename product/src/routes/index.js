import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import categories from './categoriesRoute.js';
import products from './productsRoute.js';

const swaggerDocument = YAML.load('./swagger/product.yaml');

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({ titulo: 'PROJETO ECOMM' });
  });

  app.use(
    express.json(),
    categories,
    products,
  );
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default routes;
