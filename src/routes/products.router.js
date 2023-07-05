import { Router } from 'express';
import ProducManager from '../ProductManager.js';

const router = new Router();
const pm = new ProducManager();

router.get('/', async (req, res) => {
    const { limit } = req.query;
    const products = await pm.getProducts();

    if (limit) { 
        const limitedProducts = products.slice(0, parseInt(limit));
        return res.json(limitedProducts);
    }
    return res.json(products);
});

router.get('/:pid', async (req, res) => { 
    const { pid } = req.params;
    const products = await pm.getProducts();
    const product = products.find(p => p.id === parseInt(pid));

    if(product) return res.json(product);
    return res.status(404).json({ Error: 'Producto no encontrado' });
});

router.post('/', (req, res) => { 
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    try {
        pm.addProduct(title, description, code, price, status, stock, category, thumbnails);
        return res.status(201).json({ message: 'Producto agregado' });
    } catch (error) {
        return res.status(500).json({error :"Error al agregar el producto"});
    }
    
});

router.put ('/:pid', (req, res) => {
    const { pid } = req.params;
    try {
        pm.updateProduct(parseInt(pid), req.body);
        return res.status(200).json({ message: 'Producto actualizado' });
    } catch (error) {
        return res.status(500).json({error : "Error al actualizar el producto"});
    }

});

router.delete('/:pid', (req, res) => {
    const { pid } = req.params;
    try {
        pm.deleteProduct(parseInt(pid));
        return res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
        return res.status(500).json({error: "Error al eliminar el producto"});
    }
});

export default router;