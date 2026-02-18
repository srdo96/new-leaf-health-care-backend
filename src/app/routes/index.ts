import { Router } from "express";
import { AuthRoutes } from "../module/auth/auth.route";
import { specialtyRouters } from "../module/specialty/specialty.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/specialties", specialtyRouters);

export const IndexRoutes = router;
