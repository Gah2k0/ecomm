import app from "../../src/app.js";
import request  from "supertest";

describe("Product Controller", () => {
    let newProductId;
    
    it("Should be able to create a new product", async () => {
        const response = await request(app)
            .post("/api/admin/products")
            .send({
                name: "Capa Celular Samsung",
                description: "Capa de celular Samsung A22",
                slug: "capa-celular-samsung",
                unitPrice: 19.99,
                stockQuantity: 100,
                category: "63f8fcef23046eef03476444"
            });
        newProductId = response.body._id;

        expect(response.statusCode).toEqual(201);
    });

    it("Should be able get all the products", async () => {
        const response = await request(app)
            .get("/api/products")
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
      
        expect(response.statusCode).toEqual(200);
    });

    it("Should be able get a specific product", async () => {
        const response = await request(app)
            .get(`/api/products/${newProductId}`)
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
      
        expect(response.statusCode).toEqual(200);
    });

    it("Should be able to update a specific product", async () => {
        const response = await request(app)
            .put(`/api/admin/products/${newProductId}`)
            .send({
                unitPrice: 30
            });

        expect(response.status).toEqual(200);
    });

    it("Should be able to delete a specific product", async () => {
        const response = await request(app)
            .delete(`/api/admin/products/${newProductId}`)
            .expect(204);
        
        expect(response.status).toEqual(204);
    });
});