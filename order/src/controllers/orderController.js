import Order from '../models/Order.js';
import { fetchAccount, fetchConfirmPayment } from '../utils/fetchApi.js';
import ORDER_STATUS from '../constants/constants.js';

class OrderController {
  static getOrderById = (req, res) => {
    const { id } = req.params;

    Order.findById(id, (error, order) => {
      if (!error && order) {
        res.status(200).send(order);
      } else if (!error && !order) {
        res.status(404).send({ message: 'Order does not exist.' });
      } else {
        res.status(500).send({ message: `${error.message}` });
      }
    });
  };

  // eslint-disable-next-line consistent-return
  static createOrder = async (req, res) => {
    const order = new Order({ ...req.body, status: ORDER_STATUS.REALIZADO });
    try {
      const { name, cpf, address } = await fetchAccount(order.customerId);
      if (!name || !cpf || !address) { return res.status(400).send({ message: 'The informed customer is invalid. Create an account to make an order.' }); }
      order.save(() => res.status(201).send(order.toJSON()));
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };

  static confirmOrder = async (req, res) => {
    const { id, paymentId } = req.params;
    const token = req.headers.authorization;
    try {
      const order = await Order.findById(id);
      if (!order || order.status !== ORDER_STATUS.REALIZADO) { return res.status(404).send({ message: 'This order does not exist or is already confirmed.' }); }
      const { name, cpf, address } = await fetchAccount(order.customerId);
      if (!name || !cpf || !address) { return res.status(400).send({ message: 'This order does not have a valid account for confirming. Please contact the support' }); }

      const payLoad = {
        name,
        cpf,
        address,
        items: order.items,
      };
      const paymentConfirmation = await fetchConfirmPayment(paymentId, payLoad, token);
      if (paymentConfirmation) {
        await Order.findByIdAndUpdate(id, { status: ORDER_STATUS.PAGO });
        return res.status(200).send(paymentConfirmation);
      }
      return res.status(400).send({ message: 'The order operation could not be completed because your payment could not be confirmed.' });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
}

export default OrderController;
