import { Router } from "express";

import auth from "./auth/authenticate.routes";
import products from "./store/products.routes";
import users from "./users/users.routes";

const routes = Router();

routes.use("/auth/", auth);
routes.use("/users/", users);
// routes.use("/clients/", wallets);
// routes.use("/clients/", charges);
routes.use("/store/", products);
// routes.use("/store/", orders);
// routes.use("/store/", carts);

export default routes;
