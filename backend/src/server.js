import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

import productRouter from "./routers/products.router.js";
import categoryRouter from "./routers/categories.router.js";
import brandRouter from "./routers/brands.router.js";

dotenv.config();


const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());


app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/brands", brandRouter);


app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});