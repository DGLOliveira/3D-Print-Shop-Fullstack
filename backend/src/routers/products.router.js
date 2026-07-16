import { Router } from "express";
import * as products from "../controllers/products.controllers.js";


const router = Router();


router.get("/all/", products.getAllProducts);

router.post("/model/", products.createModel);
router.put("/model/:id", products.updateModel);
router.delete("/model/:id", products.deleteModel);

router.post("/product/", products.createProduct);
router.put("/product/:id", products.updateProduct);
router.delete("/product/:id", products.deleteProduct);

router.post("/version/", products.createVersion);
router.put("/version/:id", products.updateVersion);
router.delete("/version/:id", products.deleteVersion);

router.post("/versionImage/", products.createVersionImage);
router.put("/versionImage/:id", products.updateVersionImageIndex);
router.delete("/versionImage/:id", products.deleteVersionImage);

router.post("/versionDescription/", products.createVersionDescription);
router.put("/versionDescription/:id", products.updateDescription);
router.delete("/versionDescription/:id", products.deleteDescription);

export default router;