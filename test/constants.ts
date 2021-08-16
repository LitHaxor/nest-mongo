import dotenv from "dotenv";
dotenv.config();

export const app = `http://localhost:${process.env.PORT}/v1`;
export const db = `${process.env.mongoTEST}`;
