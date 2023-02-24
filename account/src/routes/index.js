import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import accounts from './accountRoutes.js';

const swaggerDocument = YAML.load('./swagger/account.yaml');

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({ titulo: 'PROJETO ECOMM' });
  });

  app.use(
    express.json(),
    accounts,
  );
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default routes;
