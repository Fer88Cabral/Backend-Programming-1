// librerias
import express from 'express';
// importamos los routers
import productsRouter from './Router/products.router.js'
import cartsRouter from './Router/carts.router.js'


const app = express();
// inicializando el servidor
const server = app.listen(8080, ()=> console.log("Listening on PORT 8080"));

// middleware para analizar el cuerpo de las soliidtudes
app.use(express.json()); // como indica el método, ahora el servidor podrá recibir jsons al momento de la petición
app.use(express.urlencoded({extended:true})); // permite que se pueda enviar información también desde la URL
//ruta principal
app.get('/',(req,res)=>{
    return res.send('Hola Mundo!')
});
// implementamos router
app.use('/api/products ', productsRouter);
app.use('/api/carts ', cartsRouter);

