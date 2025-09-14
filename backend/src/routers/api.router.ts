import { Router } from "express";

import { authRouter } from "./auth.router";
import { clinicRouter } from "./clinic.router";
import { complexRouter } from "./complexClDocSer.router";
import { doctorRouter } from "./doctor.router";
import { medService_Router } from "./med_service.router";
import { userRouter } from "./user.router";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/services", medService_Router);
router.use("/clinics", clinicRouter);
router.use("/doctors", doctorRouter);
router.use("/complex", complexRouter);

export const apiRouter = router;
