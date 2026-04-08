import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { adminController } from "./admin.controller";
import { adminValidation } from "./admin.validation";

const router = Router();

router.post(
    "/",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    adminController.createAdmin,
);
router.get(
    "/",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    adminController.getAllAdmins,
);
router.get(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    adminController.getAdminById,
);
router.patch(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(adminValidation.updateAdminZodValidationSchema),
    adminController.updateAdminById,
);
router.delete(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    adminController.deleteAdminById,
);

export const AdminRoutes = router;
