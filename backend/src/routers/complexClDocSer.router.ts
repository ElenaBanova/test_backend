import { Router } from "express";

import { complexClDocSerController } from "../controllers/complexClDocSer.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { ComplexValidator } from "../validators/complex.validator";

const router = Router();

router.get(
  "/",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  commonMiddleware.query(ComplexValidator.query),
  complexClDocSerController.getAll,
);
router.post(
  "/:idCl/:idDoc/:idServ",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  commonMiddleware.isIdValid("idCl"),
  commonMiddleware.isIdValid("idDoc"),
  commonMiddleware.isIdValid("idServ"),
  complexClDocSerController.create,
);
router.get(
  "/:id",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  commonMiddleware.isIdValid("id"),
  complexClDocSerController.getById,
);
router.patch(
  "/:id",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  commonMiddleware.isIdValid("id"),
  commonMiddleware.query(ComplexValidator.query),
  complexClDocSerController.updateById,
);
router.delete(
  "/:id",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  commonMiddleware.isIdValid("id"),
  complexClDocSerController.deleteById,
);

export const complexRouter = router;
