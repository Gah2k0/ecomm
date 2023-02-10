import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema (
    {
        customer_id: {type: mongoose.Schema.Types.ObjectId, required: true},
        status: {type: String, required:true},
        deliveryAddress: {
            street: {type: String, required: true},
            number: {type: String, required: true},
            complement: {type: String, required: true},
            district: {type: String, required: true},
            cep: {type: String, required: true},
            city: {type: String, required: true},
            uf: {type: String, required: true}
        },
        itens: [
            {
                id: {type: String, required: true},
                name: {type: String, required: true},
                quantity: {type: Number, required: true},
                unitPrice: {type: Number, required: true},
                discount: {type: Number, required: true}
            }
        ]
     }
);

const orders = mongoose.model('orders', orderSchema);

export default orders;