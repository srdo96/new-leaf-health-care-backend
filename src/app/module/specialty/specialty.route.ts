import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { specialtyController } from "./specialty.controller";

const router = Router();

router.post(
    "/",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    specialtyController.createSpecialty,
);
router.get("/", specialtyController.getAllSpecialty);
router.patch(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    specialtyController.updateSpecialtyById,
);
router.delete(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    specialtyController.deleteSpecialty,
);

export const SpecialtyRouters = router;
