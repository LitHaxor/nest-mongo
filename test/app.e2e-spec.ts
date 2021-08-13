import dotenv from "dotenv";
dotenv.config();
import { LoginDto, RegisterDto } from "../src/user/dtos/AuthUser.dto";
import request from "supertest";
import { HttpStatus } from "@nestjs/common";
import mongoose from "mongoose";

const app = "http://localhost:5000";

beforeAll(async () => {
    await mongoose.connect(process.env.mongoTEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await mongoose.connection.db.dropDatabase();
});

afterAll((done) => {
    return mongoose.disconnect(done);
});

describe("ROOT", () => {
    it("/ GET", () => {
        return request(app).get("/").expect(200).expect("Hello World!");
    });
});

describe("AUTH", () => {
    it("/user/register POST (Register user)", () => {
        const user: RegisterDto = {
            username: "username2",
            password: "password",
            seller: false,
        };
        return request(app)
            .post("/user/register")
            .set("Accept", "application/json")
            .send(user)
            .expect(({ body }) => {
                console.log(body);
                expect(body.token).toBeDefined();
                expect(body.user.username).toEqual("username");
                expect(body.user.password).toBeUndefined();
            })
            .expect(HttpStatus.CREATED);
    });

    it("/user/register POST (check duplicate user)", () => {
        const user: RegisterDto = {
            username: "username",
            password: "password",
            seller: false,
        };
        return request(app)
            .post("/user/register")
            .set("Accept", "application/json")
            .send(user)
            .expect(({ body }) => {
                expect(body.message).toBe("User Already Exists!");
            })
            .expect(HttpStatus.BAD_REQUEST);
    });

    it("/user/login POST (Login User)", () => {
        const user: LoginDto = {
            username: "username",
            password: "password",
        };
        return request(app)
            .post("/user/login")
            .set("Accept", "application/json")
            .send(user)
            .expect(({ body }) => {
                expect(body.token).toBeDefined();
                expect(body.user.username).toEqual("username");
                expect(body.user.password).toBeUndefined();
            })
            .expect(HttpStatus.CREATED);
    });
});
