const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const payments = require('./paymentsRoutes.js');

const swaggerDocument = YAML.load('api/swagger/finance.yaml');

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({ titulo: 'PROJETO ECOMM' });
  });

  app.use(
    express.json(),
    payments,
  );
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = routes;
