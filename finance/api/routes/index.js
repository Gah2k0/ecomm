const express = require ('express');
const payments = require('./paymentsRoutes.js');
// import swaggerUi from 'swagger-ui-express';
// import YAML from 'yamljs';

// const swaggerDocument = YAML.load('./swagger/finance.yaml');

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: "PROJETO ECOMM"})
    })

    app.use(
        express.json(),
        payments
    )
    // app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

}

module.exports = routes;