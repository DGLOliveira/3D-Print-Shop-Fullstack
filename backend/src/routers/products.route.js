import { Router } from "express";
import * as products from "../controllers/products.controller.js";


const router = Router();

router.get("/", products.getAllProducts);
router.get("/:id", products.getSingleProduct);
router.post("/", products.createProduct);
router.put("/:id", products.updateProduct);
router.delete("/:id", products.deleteProduct);

router.post("/variants/:id", products.createVariantOfProduct);
router.put("/variants/:id", products.updateVariantOfProduct);
router.delete("/variants/:id", products.deleteVariantOfProduct);

router.post("/tags/", products.createProductTag);
router.put("/tags/:id", products.updateProductTag);
router.delete("/tags/:id", products.deleteProductTag);

export default router;