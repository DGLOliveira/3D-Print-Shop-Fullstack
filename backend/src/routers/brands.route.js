import { Router } from "express";
import * as brands from "../controllers/brands.controller.js";


const router = Router();

router.get("/", brands.getAllBrands);
router.get("/:id", brands.getSingleBrand);
router.post("/", brands.createBrand);
router.put("/:id", brands.updateBrand);
router.delete("/:id", brands.deleteBrand);


export default router;