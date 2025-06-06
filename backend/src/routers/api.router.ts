import { Router } from "express";

import { authRouter } from "./auth.router";
import { clinicRouter } from "./clinic.router";
import { doctorRouter } from "./doctor.router";
import { medService_Router } from "./med_service.router";
import { userRouter } from "./user.router";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/services", medService_Router);
router.use("/clinics", clinicRouter);
router.use("/doctors", doctorRouter);

export const apiRouter = router;
