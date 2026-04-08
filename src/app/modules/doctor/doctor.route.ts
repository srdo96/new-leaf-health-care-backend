import { Router } from "express";
import { doctorController } from "./doctor.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { updateDoctorZodSchema } from "./doctor.validation";
import { validateRequest } from "../../middleware/validateRequest";

const router = Router();

router.get(
    "/",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    doctorController.getAllDoctors,
);
router.get(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    doctorController.getDoctorById,
);
router.patch(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(updateDoctorZodSchema),
    doctorController.updateDoctorById,
);
router.delete(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    doctorController.deleteDoctorById,
);

export const DoctorRoutes = router;
