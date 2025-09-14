import { Router } from "express";

import { medServiceController } from "../controllers/med_service.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { MedServiceValidator } from "../validators/med_service.validator";

const router = Router();

router.get(
  "/",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  commonMiddleware.query(MedServiceValidator.query),
  medServiceController.getAll,
);
router.get(
  "/gen",
  authMiddleware.checkAccessToken,
  commonMiddleware.query(MedServiceValidator.query),
  medServiceController.getAllGen,
);
router.post(
  "/",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  commonMiddleware.validateBody(MedServiceValidator.create),
  medServiceController.create,
);
router.put(
  "/:id",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  commonMiddleware.isIdValid("id"),
  commonMiddleware.validateBody(MedServiceValidator.create),
  medServiceController.updateById,
);
router.get(
  "/:id",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("id"),
  medServiceController.getById,
);
router.delete(
  "/:id",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  commonMiddleware.isIdValid("id"),
  medServiceController.deleteById,
);

export const medService_Router = router;
