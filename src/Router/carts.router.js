import { Router } from 'express';
import CartsManager from '../cartsManager.js';

const router = Router();

router.get('/:cid', (res, req) =>{
    const {cid} = req.params;
    const c = new CartsManager();
    const result = c.getCartById(cid);
    res.json({result});
});

router.post('/', (res, req) =>{
    const c = new CartsManager();
    const result = c.createCart();
    res.json({result});
});

router.post('/:cid/product/:pid', (res, req) =>{
    const {cid,pid} = req.params;
    const c = new CartsManager();
    const result = c.addProductInCart(Number(cid), Number(pid));
    res.json({result});
});

export default router;