import { Router } from "express";
import { specialtyController } from "./specialty.controller";

const router = Router();

router.post("/", specialtyController.createSpecialty);
router.get("/", specialtyController.getAllSpecialty);
router.patch("/:id", specialtyController.updateSpecialtyById);
router.delete("/:id", specialtyController.deleteSpecialty);

export const SpecialtyRouters = router;
