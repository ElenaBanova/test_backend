import { Router } from "express";

import { clinicControllers } from "../controllers/clinic.controllers";
// import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { ClinicValidator } from "../validators/clinic.validator";

const router = Router();

router.get(
  "/",
  // authMiddleware.checkAccessToken,
  // authMiddleware.isAdmin,
  commonMiddleware.query(ClinicValidator.query),
  clinicControllers.getAll,
);
router.get(
  "/gen",
  // authMiddleware.checkAccessToken,
  commonMiddleware.query(ClinicValidator.query),
  clinicControllers.getAllGen,
);

router.post(
  "/",
  // authMiddleware.checkAccessToken,
  // authMiddleware.isAdmin,
  commonMiddleware.validateBody(ClinicValidator.create),
  clinicControllers.create,
);
router.put(
  "/:id",
  // authMiddleware.checkAccessToken,
  // authMiddleware.isAdmin,
  commonMiddleware.isIdValid("id"),
  commonMiddleware.validateBody(ClinicValidator.create),
  clinicControllers.updateById,
);
router.get(
  "/:id",
  // authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("id"),
  clinicControllers.getById,
);
router.delete(
  "/:id",
  // authMiddleware.checkAccessToken,
  // authMiddleware.isAdmin,
  commonMiddleware.isIdValid("id"),
  clinicControllers.deleteById,
);

export const clinicRouter = router;
