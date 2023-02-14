import Order from '../models/Order.js';
import { fetchAccount, fetchConfirmPayment } from '../utils/fetchApi.js';

class OrderController {

    static getOrderById = (req, res) => {
        let { id } = req.params;

        Order.findById(id, (error, order) => {
            if(!error && order){
                res.status(200).send(order);
            } 
            else if(!error && !order){
                res.status(404).send({message: 'Order does not exist.'});
            } 
            else {
                res.status(500).send({message: `${error.message}`});
            };
        });
    }
    static createOrder = (req, res) => {
        let order = new Order({...req.body, status: "REALIZADO"});

        order.save((error) => {
            if(error){
                res.status(500).send({message: `${error.message}`});
            } else { 
                res.status(201).send(order.toJSON());
            };
        });
    }
    static confirmOrder = async (req, res) => {
        const { id, paymentId } = req.params;
        try{
            const order = await Order.findById(id);
            if(!order)
                return res.status(404).send({message: "This order does not exist"});
            const {name, cpf, address} = await fetchAccount(order.customerId);
            if(!name || !cpf || !address)
                return res.status(400).send({message: "This order does not have a valid account for confirming. Please contact the support"});

            const payLoad = {
                name: name,
                cpf: cpf,
                address: address,
                items: order.items
            };
            const paymentConfirmation = await fetchConfirmPayment(paymentId, payLoad);
            if(paymentConfirmation){
                await Order.findByIdAndUpdate(id, {status: "PAGO"});
                return res.status(200).send(paymentConfirmation);
            }
            return res.status(400).send({message: "The order operation could not be completed because your payment could not be confirmed."});
        } catch(error){
            res.status(500).send({message: error.message});
        }
    }
}

export default OrderController