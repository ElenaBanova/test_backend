import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { AuthValidator } from "../validators/auth.validator";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/sign-up",
  commonMiddleware.validateBody(UserValidator.create),
  commonMiddleware.checkEmailUnique("User", "email"),
  authController.signUp,
);

router.post(
  "/sign-in",
  commonMiddleware.validateBody(UserValidator.signIn),
  authController.signIn,
);
router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);
router.get("/me", authMiddleware.checkAccessToken, authController.me);
router.patch("/activate/:token", authController.activate);
router.post(
  "/recovery",
  commonMiddleware.validateBody(AuthValidator.validateEmail),
  authController.recoveryRequest,
);
router.post(
  "/recovery/:token",
  commonMiddleware.validateBody(AuthValidator.validatePassword),
  authController.recoveryPassword,
);

export const authRouter = router;
