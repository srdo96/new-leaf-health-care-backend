import { Router } from "express";
import { specialtyRouters } from "../module/specialty/specialty.route";

const router = Router();

router.use("/specialties", specialtyRouters);

export const IndexRoutes = router;
