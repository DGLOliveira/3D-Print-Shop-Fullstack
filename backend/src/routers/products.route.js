import { Router } from "express";
import * as products from "../controllers/products.controller.js";


const router = Router();

router.get("/", products.getAllProducts);
router.get("/:id", products.getSingleProduct);
router.post("/", products.createProduct);
router.put("/:id", products.updateProduct);
router.delete("/:id", products.deleteProduct);


export default router;