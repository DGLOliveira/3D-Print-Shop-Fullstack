import { Router } from "express";
import * as brands from "../controllers/brands.controllers.js";


const router = Router();

router.get("/", brands.getAllBrands);
router.post("/", brands.createBrand);
router.put("/:id", brands.updateBrand);
router.delete("/:id", brands.deleteBrand);


export default router;