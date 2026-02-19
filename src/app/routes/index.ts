import { Router } from "express";
import { AuthRoutes } from "../module/auth/auth.route";
import { specialtyRouters } from "../module/specialty/specialty.route";
import { UserRoutes } from "../module/user/user.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/specialties", specialtyRouters);
router.use("/users", UserRoutes);

export const IndexRoutes = router;
