const database = require('../models/index.js');
const validatePayment = require('../validations/paymentValidation.js');

class PaymentsController {
    static createPayment = async (req, res) => {
        const payment = {...req.body, status: "CRIADO"};
        try{
            const paymentValidationErrors = validatePayment(payment)
            if(paymentValidationErrors.length > 0)
                return res.status(400).send({message: paymentValidationErrors})
            const newPayment = await database.Payments.create(payment);
            const responseObject = { 
                id: newPayment.id,
                status: newPayment.status,
                links: [
                    {
                        rel: 'SELF',
                        method: 'GET',
                        href: `http://finance:3004/payments/${newPayment.id}`
                      },
                      {
                        rel: 'ACTIVATE',
                        method: 'PATCH',
                        href: `http://finance:3004/payments/${newPayment.id}/confirm`
                      },
                      {
                        rel: 'CANCEL',
                        method: 'PATCH',
                        href: `http://finance:3004/payments/${newPayment.id}/cancel`
                      },
                ]
            };

            return res.status(201).location(`/payments/${responseObject.id}`).json(responseObject);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static getPaymentById = async (req, res) => {
        const { id } = req.params;
        try{
            const payment = await findPaymentById(id);
            payment ? res.status(200).json(payment) : res.status(404).json({message: "Payment does not exist"});
            return res;
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }
    static confirmPayment = async (req, res) => {
        const { id } = req.params;
        let orderDescription = req.body;
        try{
            const payment = await database.Payments.findOne({ 
                where: { 
                    id: Number(id) 
                },
                attributes: ['id', 'status', 'createdAt', 'updatedAt']
            });
            if(payment.status !== "CRIADO")
                return res.status(400).send({message: 'This payment status cannot be updated'});

            orderDescription.items = orderDescription.items.map(getEffectiveProductPrice);

            await database.sequelize.transaction(async (transaction) => {
                await database.Payments.update({status: "CONFIRMADO"}, { where: { id: Number(id) }}, {transaction})
                await database.Invoices.create({description: orderDescription, payment_id: id}, {transaction});
            });

            const confirmedPayment = await findPaymentById(id);
            return res.status(200).json(confirmedPayment);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }
    static cancelPayment = async (req, res) => {
        const { id } = req.params;
        try{
            const payment = await database.Payments.findOne({ 
                where: { 
                    id: Number(id) 
                },
                attributes: ['id', 'status', 'createdAt', 'updatedAt']
            });
            if(!payment || payment.status != "CRIADO")
                return res.status(400).send({message: 'This payment status cannot be updated'});

            const updateResult = await database.Payments.update({status: "CANCELADO"}, { where: { id: Number(id) }});
            updateResult ? res.status(204).send() : res.status(400).json({message: "Payment could not be updated"});
            return res;
        } catch(error){
            return res.status(500).json(error.message);
        }
    }
}

function getEffectiveProductPrice(product){
    return {
        name: product.name,
        quantity: product.quantity,
        price: (product.unitPrice * product.quantity) - (product.discount * product.quantity)
    };
}

async function findPaymentById(id){
    const payment = await database.Payments.findOne({ 
        where: { 
            id: Number(id) 
        },
        attributes: ['id', 'nameOnCard', 'cardNumber', 'expirationDate', 'value', 'status', 'createdAt', 'updatedAt']
    });
    return payment;
}

module.exports = PaymentsController;