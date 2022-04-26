import { fileURLToPath } from 'url';
import { dirname } from 'path';
import products from './models/products.js';


export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename);



export function* IdGenerator() {
    const response = products.getProducts()
    if (response.length > 0) {
        let data = JSON.parse(response);
        if (data.length > 0) {
            let id = data[data.length - 1].id;
        } else {

            let id = 0;
        }
        while (true)
            yield id++;
    }
}

export default { __dirname, __filename, IdGenerator };

