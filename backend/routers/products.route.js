import { Router } from "express";
import * as product from "../controllers/products.controller.js";


const router = Router();

router.get("/", product.getAllProducts);
router.get("/:id", product.getSingleProduct);
router.post("/", product.createProduct);
router.put("/:id", product.updateProduct);
router.delete("/:id", product.deleteProduct);


export default router;