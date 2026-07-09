import { Router } from "express";
//import * as products from "../controllers/products.controller.js";
import * as accessories from "../controllers/accessories.controller.js";


const router = Router();

router.get("/accessories", accessories.getAllAccessories);
router.get("/accessories/:id", accessories.getSingleAccessoryById);
router.post("/accessories", accessories.createAccessory);
router.put("/accessories/:id", accessories.updateAccessory);
router.delete("/accessories/:id", accessories.deleteAccessory);

router.get("/accessories/images/:id", accessories.getAccessoryImagesById);
router.post("/accessories/images/:id", accessories.createAccessoryImage);
router.put("/accessories/images/:id", accessories.updateAccessoryImage);
router.delete("/accessories/images/:id", accessories.deleteAccessoryImage);


/*  This will all change
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
router.delete("/tags/:id", products.deleteProductTag);*/

export default router;