import { Router } from "express";
import { superAdminController } from "./superAdmin.controller";

const router = Router();

router.post("/", superAdminController.createSuperAdmin);
router.get("/", superAdminController.getAllSuperAdmins);
router.get("/:id", superAdminController.getSuperAdminById);
router.patch("/:id", superAdminController.updateSuperAdminById);
router.delete("/:id", superAdminController.deleteSuperAdminById);

export const SuperAdminRoutes = router;
