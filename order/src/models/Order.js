import mongoose from 'mongoose';

mongoose.Schema.Types.DocumentArray.set('_id', false);
const orderSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, required: true },
    status: { type: String, required: true },
    deliveryAddress: {
      street: { type: String, required: true },
      number: { type: String, required: true },
      complement: { type: String, required: true },
      district: { type: String, required: true },
      cep: { type: String, required: true },
      city: { type: String, required: true },
      uf: { type: String, required: true },
    },
    items: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        discount: { type: Number, required: true },
      },
    ],
  },
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
