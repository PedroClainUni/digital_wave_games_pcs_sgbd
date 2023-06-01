import { UsersController } from "./users.controller";
import { ProductsController } from "./products.controller";
import { ConfirmationCodesController } from "./confirmationCodes.controller";
import { AuthenticationController } from "./authentication.controller";
import { CartsController } from "./carts.controller";

import {
  UsersRepository,
  ProductsRepository,
  CartsRepository,
  CartItemsRepository,
  ConfirmationCodesRepository,
  EmployeeRepository,
} from "../repositories";
import {
  UsersService,
  ProductsService,
  ConfirmationCodesService,
  AuthenticationService,
  CartsService,
  CartItemsService,
} from "../services";

const usersRepository = new UsersRepository();
const employeeRepository = new EmployeeRepository();
const productsRepository = new ProductsRepository();
const confirmationCodesRepository = new ConfirmationCodesRepository();
const cartsRepository = new CartsRepository();
const cartItemsRepository = new CartItemsRepository();

const usersService = new UsersService(
  usersRepository,
  cartsRepository,
);
const productsService = new ProductsService(productsRepository);
const confirmationCodesService = new ConfirmationCodesService(
  confirmationCodesRepository,
  usersRepository
);
const authenticationService = new AuthenticationService(usersRepository, employeeRepository);
const cartsService = new CartsService(cartsRepository);
const cartItemsService = new CartItemsService(cartItemsRepository);

const usersController = new UsersController(
  usersService,
  cartsService
);
const productsController = new ProductsController(productsService);
const confirmationCodesController = new ConfirmationCodesController(
  confirmationCodesService
);
const authenticationController = new AuthenticationController(
  authenticationService
);

const cartsController = new CartsController(cartsService, cartItemsService);

export {
  usersService,
  usersController,
  productsService,
  productsController,
  confirmationCodesController,
  authenticationController,
  cartsService,
  cartItemsService,
  cartsController,
};
