import { Router } from "express";

import { complexClDocSer_Controller } from "../controllers/complexClDocSer.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { ComplexValidator } from "../validators/complex.validator";

const router = Router();

router.get(
  "/",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  commonMiddleware.query(ComplexValidator.query),
  complexClDocSer_Controller.getAll,
);
router.post(
  "/:idCl/:idDoc/:idServ",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  commonMiddleware.isIdValid("idCl"),
  commonMiddleware.isIdValid("idDoc"),
  commonMiddleware.isIdValid("idServ"),
  complexClDocSer_Controller.create,
);
router.get(
  "/:id",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  commonMiddleware.isIdValid("id"),
  complexClDocSer_Controller.getById,
);
router.patch(
  "/:id",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  commonMiddleware.isIdValid("id"),
  commonMiddleware.query(ComplexValidator.query),
  complexClDocSer_Controller.updateById,
);
router.delete(
  "/:id",
  authMiddleware.checkAccessToken,
  authMiddleware.isAdmin,
  commonMiddleware.isIdValid("id"),
  complexClDocSer_Controller.deleteById,
);

export const complexRouter = router;
