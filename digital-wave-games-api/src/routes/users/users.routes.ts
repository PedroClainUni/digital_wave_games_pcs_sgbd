import { Router } from 'express';
import { confirmationCodesController, usersController } from '../../controllers';


const router = Router();

// router.get('/users', (request, response) => {
//     return usersController.get(request, response);
// });

router.get('/exist-email/:email', (request, response) => {
    return usersController.existEmail(request, response);
});

router.get('/:id', (request, response) => {
    return usersController.getById(request, response);
});

router.post('/add-cart-item', (request, response) => {
    return usersController.addCartItem(request, response);
});

router.get('/:userId/cart', (request, response) => {
    return usersController.getCart(request, response);
});

// router.patch('/user/:username', (request, response) => {
//     return usersController.patchByUsername(request, response);
// });

// router.get('/user/:client_id/orders', (request, response) => {
//     return usersController.getOrders(request, response);
// });

// router.get('/user/:client_id/cart', (request, response) => {
//     return usersController.getCart(request, response);
// });

router.post('/', (request, response) => {
    return usersController.createAccount(request, response);
});

router.post('/send-confirmation-code', (request, response) => {
    return confirmationCodesController.sendConfirmationCode(request, response);
});

// router.post('/password-recovery-codes', (request, response) => {
//     return passwordRecoveryCodesController.post(request, response);
// });

// router.post('/change-password', (request, response) => {
//     return usersController.changePassword(request, response);
// });

// router.get('/user/:id/addresses', (request, response) => {
//     return usersController.getAddresses(request, response);
// });

// router.post('/user/address', (request, response) => {
//     return usersController.postAddress(request, response);
// });

router.put('/', (request, response) => {
    return usersController.updateAccount(request, response);
});

router.put('/update-wallet', (request, response) => {
    return usersController.updateWallet(request, response);
});

// router.put('/user/address', (request, response) => {
//     return usersController.putAddress(request, response);
// });

// router.delete('/user/:clientId/address/:addressId', (request, response) => {
//     return usersController.deleteAddress(request, response);
// });
export default router;
