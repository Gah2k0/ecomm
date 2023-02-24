const app = require("../../api/app.js");
const request = require("supertest");
const PAYMENT_STATUS = require("../../api/constants/constants.js")

describe("Payments Controller", () => {
    let newPaymentId;
    it("Should be able to create a new payment", async () => {
        const response = await request(app)
            .post("/payments")
            .send({
                nameOnCard: "Gabriel Francisco",
                value: 100,
                cardNumber: "1234567812345678",
                expirationDate: "2023-03",
                cvv: "123"            
            });
        newPaymentId = response.body.id;
        expect(response.body.status).toEqual(PAYMENT_STATUS.CRIADO);
    });

    it("Should be able get a specific payment", async () => {
        const response = await request(app)
            .get(`/payments/${newPaymentId}`)
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
      
        expect(response.body.nameOnCard).toEqual("Gabriel Francisco");
    });

    it("Should be able to confirm a payment", async () => {
        const response = await request(app)
            .post(`/payments/${newPaymentId}/confirm`)
            .send({
                customerName: "Gabriel Francisco",
                customerCpf: "12345678912",
                customerAddress: "Rua Cascata,87,Casa,94015380,Gravataí,RS",
                items: [
                    {
                    name: "Teste",
                    quantity: 2,
                    unitPrice: 100,
                    discount: 5
                    }
                ]
            })
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
      
        expect(response.body.status).toEqual(PAYMENT_STATUS.CONFIRMADO);
    });

    it("Should be able to cancel a payment", async () => {
        const newPayment = await request(app)
            .post("/payments")
            .send({
                nameOnCard: "Gabriel Francisco",
                value: 100,
                cardNumber: "1234567812345678",
                expirationDate: "2023-03",
                cvv: "123"            
            });
        let paymentId = newPayment.body.id;

        const response = await request(app)
            .patch(`/payments/${paymentId}/cancel`)

        expect(response.status).toEqual(204);
    });
});