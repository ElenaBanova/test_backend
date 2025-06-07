import { Router } from "express";

import { medService_Controller } from "../controllers/med_service.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { MedServiceValidator } from "../validators/med_service.validator";

const router = Router();

router.get(
  "/",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  commonMiddleware.query(MedServiceValidator.query),
  medService_Controller.getAll,
);
router.get(
  "/gen",
  authMiddleware.checkAccessToken,
  commonMiddleware.query(MedServiceValidator.query),
  medService_Controller.getAllGen,
);
router.post(
  "/:id",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  commonMiddleware.validateBody(MedServiceValidator.create),
  commonMiddleware.isIdValid("id"),
  medService_Controller.create,
);
router.put(
  "/:id",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  commonMiddleware.isIdValid("id"),
  commonMiddleware.validateBody(MedServiceValidator.create),
  medService_Controller.updateById,
);
router.get(
  "/:id",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("id"),
  medService_Controller.getById,
);
router.delete(
  "/:id",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  commonMiddleware.isIdValid("id"),
  medService_Controller.deleteById,
);

export const medService_Router = router;
