import request from "supertest";
import mongoose from "mongoose";
import { app, db } from "./constants";
import { RegisterDto } from "src/user/dtos/AuthUser.dto";
import axios from "axios";
import { CreateProductDto } from "src/product/dtos/createProduct.dto";
import { HttpStatus } from "@nestjs/common";
import { UpdateProductDto } from "src/product/dtos/updateProduct.dto";
var sellerToken: string;
var userToken: string;
var productSeller: RegisterDto = {
    seller: true,
    username: "productSeller",
    password: "password",
};
var user: RegisterDto = {
    seller: true,
    username: "productSeller",
    password: "password",
};
let idToUpdate: string;
beforeAll(async () => {
    await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await mongoose.connection.db.dropDatabase();
    const {
        data: { token },
    } = await axios.post(`${app}/user/register`, productSeller);
    sellerToken = token;

    // const data = await axios.post(`${app}/user/register`, user);
    // userToken = data.data.token;
});

afterAll((done) => {
    mongoose.disconnect(done);
});

describe("[PRODUCT]", () => {
    it("POST /products (create one product)", () => {
        const productToAdd: CreateProductDto = {
            title: "Exclusive T Shirt",
            description: ["Authentic vintage shrit"],
            image: "http://image.url",
            price: 200,
        };
        return request(app)
            .post("/product")
            .set("Accept", "application/json")
            .set("Authorization", "Bearer " + sellerToken)
            .send(productToAdd)
            .expect(HttpStatus.CREATED)
            .expect(({ body }) => {
                idToUpdate = body._id;
                expect(body._id).toBeDefined();
                expect(body.title).toBe("Exclusive T Shirt");
                expect(body.description).toStrictEqual([
                    "Authentic vintage shrit",
                ]);
                expect(body.image).toBe("http://image.url");
                expect(body.price).toBe(200);
            });
    });

    it("PUT /products (update one product)", () => {
        const productToUpdate: UpdateProductDto = {
            title: "New Exclusive T Shirt",
            description: ["Authentic vintage shrit", "Real  Comfort shrit"],
            image: "http://new.image.url",
            price: 500,
        };
        return request(app)
            .put(`/product/${idToUpdate}`)
            .set("Accept", "application/json")
            .set("Authorization", "Bearer " + sellerToken)
            .send(productToUpdate)
            .expect(HttpStatus.OK)
            .expect(({ body }) => {
                expect(body._id).toBeDefined();
                expect(body.title).toBe("New Exclusive T Shirt");
                expect(body.description).toStrictEqual([
                    "Authentic vintage shrit",
                    "Real  Comfort shrit",
                ]);
                expect(body.image).toBe("http://new.image.url");
                expect(body.price).toBe(500);
            });
    });

    it("POST /products (create another product)", () => {
        const productToAdd: CreateProductDto = {
            title: "Classic 66 T",
            description: ["Classic Suburban  shrit"],
            image: "http://image.url",
            price: 999,
        };
        return request(app)
            .post("/product")
            .set("Accept", "application/json")
            .set("Authorization", "Bearer " + sellerToken)
            .send(productToAdd)
            .expect(HttpStatus.CREATED)
            .expect(({ body }) => {
                idToUpdate = body._id;
                expect(body._id).toBeDefined();
                expect(body.title).toBe("Classic 66 T");
                expect(body.description).toStrictEqual([
                    "Classic Suburban  shrit",
                ]);
                expect(body.image).toBe("http://image.url");
                expect(body.price).toBe(999);
            });
    });

    // it("POST /products (Non seller creating product)", () => {
    //     const productToAdd: CreateProductDto = {
    //         title: "Classic 66 T",
    //         description: ["Classic Suburban  shrit"],
    //         image: "http://image.url",
    //         price: 999,
    //     };
    //     return request(app)
    //         .post("/product")
    //         .set("Accept", "application/json")
    //         .set("Authorization", "Bearer " + userToken)
    //         .send(productToAdd)
    //         .expect(HttpStatus.FORBIDDEN)
    //         .expect(({ body }) => {
    //             console.log(body);
    //         });
    // });

    // it("GET /products (get all products)", () => {});

    // it("GET /product/:id (get one products)", () => {});

    // it("DELETE /products (delete one product)", () => {});
});
