import { Router } from "express";
import * as materials from "../controllers/materials.controller.js";


const router = Router();

router.get("/", materials.getAllMaterials);
router.get("/:id", materials.getSingleMaterial);
router.post("/", materials.createMaterial);
router.put("/:id", materials.updateMaterial);
router.delete("/:id", materials.deleteMaterial);


router.get("/suppliers/", materials.getAllSuppliers);
router.get("/suppliers/:id", materials.getSingleSupplier);
router.post("/suppliers/", materials.createSupplier);
router.put("/suppliers/:id", materials.updateSupplier);
router.delete("/suppliers/:id", materials.deleteSupplier);


export default router;