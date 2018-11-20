export class Product {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    imageUrl: string;
    stock: number;
    retained: number;
    available: number;

    // get available() {
    //     return this.stock - this.retained;
    // }
    constructor(obj: any) {
        Object.assign(this, obj);
        this.available = this.stock - this.retained;
    }
}
