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
                        href: `http://localhost:3003/payments/${newPayment.id}`
                      },
                      {
                        rel: 'ACTIVATE',
                        method: 'PATCH',
                        href: `http://localhost:3003/payments/${newPayment.id}/confirm`
                      },
                      {
                        rel: 'CANCEL',
                        method: 'PATCH',
                        href: `http://localhost:3003/payments/${newPayment.id}/cancel`
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
            const payment = await database.Payments.findOne({ 
                    where: { 
                        id: Number(id) 
                    },
                    attributes: ['id', 'nameOnCard', 'cardNumber', 'expirationDate', 'value', 'status', 'createdAt', 'updatedAt']
                });
            return res.status(200).json(payment);
        } catch(error) {
            return res.status(500).json(error.message);
        }
    }
    static updatedPaymentStatus = async (req, res) => {
        const { id, action } = req.params;
        try{
            const payment = await database.Payments.findOne({ 
                where: { 
                    id: Number(id) 
                },
                attributes: ['id', 'status', 'createdAt', 'updatedAt']
            });
            if(payment.status === 'CONFIRMADO' || payment.status === 'CANCELADO')
                return res.status(400).send({message: 'This payment status cannot be updated'});
            let status;
            action === 'confirm' ? status = 'CONFIRMADO' : status = 'CANCELADO';
            await database.Payments.update({status: status}, { where: { id: Number(id) }})
            const updatedPayment = await database.Payments.findOne({
                where: { 
                    id: Number(id) 
                },
                attributes: ['id', 'nameOnCard', 'cardNumber', 'expirationDate', 'value', 'status', 'createdAt', 'updatedAt']
            });
            return res.status(200).json(updatedPayment);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PaymentsController;