import { Router } from 'express';
import { productsController } from '../../controllers';


const router = Router();

router.get('/products', (request, response) => {
    return productsController.getAll(request, response);
});

router.get('/product/:id', (request, response) => {
    return productsController.getById(request, response);
});

router.post('/product', (request, response) => {
    return productsController.save(request, response);
});
// router.put('/product', (request, response) => {
//     return productsController.put(request, response);
// });
// router.delete('/product/:id', (request, response) => {
//     return productsController.delete(request, response);
// });
export default router;
