//biblioteca file system
import fs from 'fs'
import ProductManager from './productManager.js'

class CartsManager{
    #carts;
    #path;
    static idProducto = 0; //inciamos el procuto en 0 para auto incrementar

    constructor(){
        this.#path = './src/data/carritos.json';
        this.#carts = this.#leerCarritosInFile();
    }

    #asignarIdCart(){
        let id = 1;
        if(this.#carts.length != 0)
            id = this.#carts[this.#carts.length-1].id + 1;
        return id;
    }

    #leerCarritosInFile(){
        try {
            if(fs.existsSync(this.#path))
                return JSON.parse(fs.readFileSync(this.#path, 'utf-8'));
            
            return [];
        } catch (error) {
            console.log(`Ocurrio un error eal momento de leer el archivo de producto, ${error}`);
        }
    }

    #guardarArchivo(){
        try {
            fs.writeFileSync(this.#path, JSON.stringify(this.#carts))
        } catch (error) {
            console.log(`Ocurrio un error eal momento de guardar el archivo de producto, ${error}`);
        }
    }

    createCart() {
        const newCart = {
            id: this.#asignarIdCart(),
            products: []
        };
        this.#carts.push(newCart);
        this.#guardarArchivo();

        return newCart;
    }

    getCartById(id){
        let status = false;
        const producto = this.#carts.find(p => p.id == id);
        if(producto)
            return producto;
        else
            // not found
            return `Not Found del producto con id ${id}`;  
    }

    addProductInCart(cid, pid) {

        let respueta = `El carrito con id ${id} no existe`;

        const indexCarrito = this.#carts.findIndex(c => c.id === cid);
        
        if(indexCarrito !== -1){
            const indexProductoInCart = this.#carts[indexCarrito].products.findIndex(p => p.id === pid);
            const p = new ProductManager();
            const producto = p.getProductById(pid);

            if(producto.status && indexProductoInCart === -1){
                this.#carts[indexCarrito].products.push({id:pid, 'quantity': 1 });
                this.#guardarArchivo();
                respueta = 'Producto agregado al carrtio';
            }else if (producto.status && indexProductoInCart !== -1){
                ++this.#carts[indexCarrito].products[indexProductoInCart].quantity;
                this.#guardarArchivo();
                respueta = 'Producto agregado al carrtio';
            }else{
                respueta = `El Producto con id ${pid} no existe`;
            }
        }

        return respueta;
    }


}

export default CartsManager;