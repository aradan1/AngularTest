import {readDB, writeDB} from './utils'

type Product = {
    name: string,
    description: string
}

const db = readDB();

// get all products
export function getAllProducts(): JSON{
    return db['products'];
}

// get product by id
export function getProductById(id: string): Product{
    return db['products'][id];
}

// create new product
export function createProduct(newProduct: Product): Product | null{
    if(db['products'][newProduct.name]){
        return null;
    }
    db['products'][newProduct.name] = newProduct;
    writeDB(db);
    return newProduct;
}

// edit product by id
export function editProductById(id: string, newProduct: Product): Product{
    db['products'][id] = newProduct;
    writeDB(db);
    return newProduct;
}

// delete product by id
export function deleteProductById(id: string): void{
    delete db['products'][id];
    writeDB(db);
}