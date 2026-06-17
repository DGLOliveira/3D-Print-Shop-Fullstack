import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

import productRouter from "./routers/products.route.js";

dotenv.config();


const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());


app.use("/api/products", productRouter);


app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});