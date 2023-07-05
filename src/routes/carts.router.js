import { Router } from 'express';
import CartManager from '../CartManager.js';

const router = Router();
const cm = new CartManager();

router.get('/', async (req, res) => { 
    const carts = await cm.getCarts();
    res.json(carts);
});

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await cm.getCartById(parseInt(cid));
    if (cart) return res.json(cart);
    return res.status(404).json({error: "Cart no encontrado"});
});

router.post('/', (req, res) => {
    cm.addCart();
    res.status(201).json({Message: "Cart Agregado con éxito!"})
});

router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    cm.addProductToCart(parseInt(cid), parseInt(pid));
    res.status(201).json({Message: "Producto Agregado al carrito con éxito!"});
});




export default router;