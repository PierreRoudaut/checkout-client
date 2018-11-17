
export class CartItem {
    productId: number;
    quantity: number;

    constructor(obj: any) {
        Object.assign(this, obj);
    }
}

export class Cart {
    id: string;
    cartItems: { [id: string]: CartItem; };

    constructor(obj: any) {
        Object.assign(this, obj);
    }
}

