import dotenv from "dotenv";
dotenv.config();

export const app = "http://localhost:5000";
export const db = `${process.env.mongoTEST}`;
