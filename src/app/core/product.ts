export class Product {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    imageFilename: string;
    stock: number;
    constructor(obj: any) {
        Object.assign(this, obj);
    }
}
