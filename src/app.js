
import express from 'express'; //Configurar el servidor Express
import { engine } from 'express-handlebars'; // Importar'engine'
import { Server } from 'socket.io'; // Importamos el constructor de un servidor de sockets

// Importamos los routers
import productsRouter from './Router/products.router.js';
import cartsRouter from './Router/carts.router.js';
import viewsRouter from './Router/views.router.js';
import __dirname from './utils.js';
import ProductManager from './productManager.js';

const app = express();

const p = new ProductManager();

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Configuramos todo lo referente a las plantillas
app.engine('handlebars', engine()); 
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Usamos el enrutador para las vistas
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Servidor express
const expressServer = app.listen(8080, () => {console.log('Listening on PORT 8080');});
// Creamos un servidor de sockets 
const io = new Server(expressServer);

io.on('connection', socket => {

    const productos = p.getProducts(); // Obtengo todos los productos
    socket.emit('productos', productos);

    socket.on('agregarProducto', producto => {
        const result = p.addProduct({ ...producto });
        if(result.producto)
        socket.emit('productos', result.producto);
    });
});
