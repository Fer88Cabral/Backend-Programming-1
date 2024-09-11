import { Router } from 'express';
import CartsManager from '../cartsManager.js';

const router = Router();

router.get('/:cid', (req,res) =>{
    const {cid} = req.params;
    const c = new CartsManager();
    const result = c.getCartById(Number(cid));
    res.json({result});
});

router.post('/', (req,res) =>{  //post create
    const c = new CartsManager();
    const result = c.createCart();
    res.json({result});
});

router.post('/:cid/product/:pid', (req,res) =>{
    const {cid,pid} = req.params;
    const c = new CartsManager();
    const result = c.addProductInCart(Number(cid), Number(pid));
    res.json({result});
});

export default router;