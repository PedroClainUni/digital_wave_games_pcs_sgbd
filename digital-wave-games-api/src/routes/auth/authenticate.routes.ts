import { Router } from "express";
import {
  authenticationController
} from "../../controllers";

const router = Router();

router.post("/authenticate-user", (request, response) => {
  return authenticationController.authenticateUser(request, response);
});

router.post("/authenticate-admin", (request, response) => {
  return authenticationController.authenticateAdmin(request, response);
});

// router.post("/authenticate-with-google", (request, response) => {
//   return googleAuthenticationController.post(request, response);
// });

export default router;
