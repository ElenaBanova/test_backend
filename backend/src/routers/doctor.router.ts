import { Router } from "express";

import { doctorController } from "../controllers/doctor.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { DoctorValidator } from "../validators/doctor.validator";

const router = Router();

router.get(
  "/",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  commonMiddleware.query(DoctorValidator.query),
  doctorController.getAll,
);
router.get(
  "/gen",
  authMiddleware.checkAccessToken,
  commonMiddleware.query(DoctorValidator.query),
  doctorController.getAllGen,
);
router.post(
  "/:id",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  commonMiddleware.validateBody(DoctorValidator.create),
  commonMiddleware.isIdValid("id"),
  doctorController.create,
);
router.put(
  "/:id",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  commonMiddleware.isIdValid("id"),
  commonMiddleware.validateBody(DoctorValidator.update),
  doctorController.updateById,
);
router.get(
  "/:id",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  commonMiddleware.isIdValid("id"),
  doctorController.getById,
);
router.delete(
  "/:id",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  commonMiddleware.isIdValid("id"),
  doctorController.deleteById,
);

export const doctorRouter = router;
