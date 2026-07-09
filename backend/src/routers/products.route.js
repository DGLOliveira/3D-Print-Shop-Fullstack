import { Router } from "express";
//import * as products from "../controllers/products.controller.js";
import * as accessories from "../controllers/accessories.controller.js";


const router = Router();

router.get("/accessories/items", accessories.getAllAccessories);
router.get("/accessories/items/:id", accessories.getSingleAccessoryById);
router.post("/accessories/items", accessories.createAccessory);
router.put("/accessories/items/:id", accessories.updateAccessory);
router.delete("/accessories/items/:id", accessories.deleteAccessory);

router.get("/accessories/images/:id", accessories.getAllAccessoryImagesByAccessoryId);
router.post("/accessories/images/:id", accessories.uploadAccessoryImage);
router.delete("/accessories/images/:id", accessories.deleteAccessoryImage);

router.get("/accessories/categories", accessories.getAllAccessoriesCategories);
router.post("/accessories/categories", accessories.createAccessoryCategory);
router.delete("/accessories/categories/:id", accessories.deleteAccessoryCategory);

router.get("/accessories/subcategories", accessories.getAllAccessoriesSubCategories);
router.post("/accessories/subcategories", accessories.createSubAccessoryCategory);
router.delete("/accessories/subcategories/:id", accessories.deleteSubAccessoryCategory);


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