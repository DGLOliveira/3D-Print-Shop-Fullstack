import { Router } from "express";
import * as categories from "../controllers/categories.controllers.js";


const router = Router();


router.get("/", categories.getAllCategories);

router.post("/primary", categories.createPrimaryCategory);
router.post("/secondary", categories.createSecondaryCategory);
router.post("/terciary", categories.createTerciaryCategory);

router.put("/primary/:id", categories.updatePrimaryCategory);
router.put("/secondary/:id", categories.updateSecondaryCategory);
router.put("/terciary/:id", categories.updateTerciaryCategory);

router.delete("/primary/:id", categories.deletePrimaryCategory);
router.delete("/secondary/:id", categories.deleteSecondaryCategory);
router.delete("/terciary/:id", categories.deleteTerciaryCategory);

export default router;