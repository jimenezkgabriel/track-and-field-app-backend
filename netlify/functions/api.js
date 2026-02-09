import express, { Router } from "express";
import serverless from "serverless-http";
import connectDB from "../../src/db/connection.js";
import routes from "../../src/routes/index.js";

const api = express();
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

// const router = Router();
connectDB();
// router.get("/hello", (req, res) => res.send({ message: "Hello, World!" }));

api.use("/api", routes);

export const handler = serverless(api);