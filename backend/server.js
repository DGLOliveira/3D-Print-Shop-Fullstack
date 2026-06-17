import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";


const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});