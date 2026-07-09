import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

import productRouter from "./routers/products.route.js";
//import materialRouter from "./routers/materials.route.js";
import brandRouter from "./routers/brands.route.js";

dotenv.config();


const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());


app.use("/api/products", productRouter);
//app.use("/api/materials", materialRouter);
app.use("/api/brands", brandRouter);


app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});