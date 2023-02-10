import express from 'express';
import orders from './ordersRoute.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./swagger/order.yaml');

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: "PROJETO ECOMM"})
    });

    app.use(
        express.json(),
        orders
    );
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

};

export default routes;