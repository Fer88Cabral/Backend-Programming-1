import { Router } from 'express';
import ProductManager from '../productManager.js';

const router = Router();

router.get('/', (res, req) =>{
    const {limit} = req.query;
    const p = new ProductManager();
    return res.json({products: p.getProduct(limit)});
});

router.get('/:pid', (res, req) =>{
    const {pid} = req.params;
    const p = new ProductManager();
    return res.json({product: p.getProductById(number(pid))});
});

router.post('/', (res, req) =>{
    const {title, description, price, thumbnails, code, stock, category,status} = req.body;
    const p = new ProductManager();
    const result = p.addProduct(title, description, price, thumbnails, code, stock, category,status);
    return res.json({result});
});

router.put('/:pid', (req,res)=>{
    const {pid} =req.params;
    const p = new ProductManager();
    const result = p.updateProduct(Number(pid), req.body); 
    return res.json ({result});
})

router.delete('/:pid', (req,res)=>{
    const {pid} =req.params;
    const p = new ProductManager();
    const result = p.deleteProduct(Number(pid));
    return res.json ({result});
})

export default router;