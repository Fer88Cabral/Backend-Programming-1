//biblioteca file system
import fs from 'fs'

class ProductManager{
    #products;
    #path;
    static idProducto = 0; //inciamos el procuto en 0 para auto incrementar

    constructor(){
        this.#path = './src/data/productos.json';
        this.#products = this.#leerProductosInFile();
    }

    #asignarIdProduto(){
        let id = 1;
        if(this.#products.length != 0)
            id = this.#products[this.#products.length-1].id + 1;
        return id;
    }

    #leerProductosInFile(){
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
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
        } catch (error) {
            console.log(`Ocurrio un error eal momento de guardar el archivo de producto, ${error}`);
        }
    }

    addProduct(title, description, price, thumbnails=[], code, stock, category, status = true ){

        let result = 'Ocurrio un error';

        if(!title || !description || !price || !code || !stock || !category)
            result = 'Todos los parametros son requeridos [title, description, price, code, stock, category]';
        else{
            const codeRepetido = this.#products.some(p=> p.code == code); //validar que no se repita el code
            if(codeRepetido)
                result =`El codigo ${code} ya se encuentra registrado en otro producto`;
            else{
                ProductManager.idProducto = ProductManager.idProducto + 1;  // id autoincremental 
                const id = this.#asignarIdProduto();

                const nuevoProducto = {
                    id,
                    title,
                    description,
                    price,
                    thumbnails,
                    code,
                    stock,
                    category,
                    status
                };
                this.#products.push(nuevoProducto);
                this.#guardarArchivo();
                result = {
                msg: 'Producto agregado exitosamente',
                producto: nuevoProducto
                };
            }
        }

        return result;
    }


    getProducts(limit = 0){
        limit = Number(limit);
        if(limit > 0)
            return this.#products.slice(0, limit);
        return this.#products;
    }

    getProductById(id){
        let status = false;
        let resp = `El producto con id ${id} no existe`;
        
        const producto = this.#products.find(p => p.id == id);
        if(producto){
            status = true;
            resp = producto
        }
        
        return {status, resp};
    }

    updateProduct(id, objetoUpdate){
        let result = `El producto con id ${id} no existe`;

        const index = this.#products.findIndex(p => p.id === id);

        if(index !== -1){
            const {id, ...rest} = objetoUpdate;
            const propiedadesPermitidas = ['title', 'description', 'price', 'thumbnails', 'code', 'stock', 'category', 'status'];
            const propidadesActualizadas = Object.keys(rest)
                .filter(propiedad => propiedadesPermitidas.includes(propiedad))
                .reduce((obj, key)=>{
                    obj[key] = rest[key]
                    return obj;
                }, {});
            this.#products[index] = {...this.#products[index],...propidadesActualizadas};
            this.#guardarArchivo();
            result = {
                msg: 'Producto actualizado',
                producto:this.#products[index]
            };
        }

        return result;
    }

    deleteProduct(id){
        let msg = `El producto con id ${id} no existe`;

        const index = this.#products.findIndex(p => p.id === id);
        if(index !== -1){
            this.#products = this.#products.filter(p => p.id !== id);
            this.#guardarArchivo();
            msg = 'Producto eliminado';
        }

        return msg;
    }
}

export default ProductManager;