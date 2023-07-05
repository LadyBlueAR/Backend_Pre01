import express from 'express';
import products from './routes/products.router.js';
import carts from './routes/carts.router.js';

const port = 8080;
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/products", products);
app.use("/api/carts", carts);

app.get('/', (req, res) => { 
    res.send('Bienvenidos a mi ecommerce');
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});