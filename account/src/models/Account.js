import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String},
        cpf: {type: Number, required: true},
        phone: {type: Number},
        address: 
        {
            street: {type: String, required: true},
            number: {type: String, required: true},
            complement: {type: String},
            district: {type: String},
            cep: {type: Number},
            city: {type: String, required: true},
            uf: {type: String, required: true}
        }
    }
)

const Account = mongoose.model('Account', accountSchema);

export default Account;