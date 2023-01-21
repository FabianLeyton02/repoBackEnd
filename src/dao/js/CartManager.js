export class Cart {
  constructor(id) {
    this.id = id;
    this.products = [];
  }

  showCart() {
    console.log(this.products);
    return this.products;
  }

  addToCart(productId) {
    let productFound = false;
    this.products.forEach((element) => {
      if (element.id === productId) {
        element.quantity++;
        productFound = true;
      }
    });
    if (!productFound) {
      const cartItem = { id: productId, quantity: 1 };
      this.products.push(cartItem);
    }
  }
}

export class CartManager {
  constructor() {
    this.carts = [];
  }

  #getMaxId() {
    let maxId = 0;
    this.carts.forEach((element) => {
      if (element.id > maxId) {
        maxId = element.id;
      }
    });
    return maxId + 1;
  }

  createCart(id) {
    this.carts.push(new Cart(this.#getMaxId()));
    console.log(this.carts);
  }

  showCartById(id) {
    console.log(id);
    console.log(this.carts);
    this.carts.forEach((element) => {
      if (element.id === Number(id)) {
        element.showCart();
      }
    });
  }

  addToCartId(cartId, productId) {
    this.carts.forEach((element) => {
      if (element.id === cartId) {
        element.addToCart(productId);
      }
    });
  }
}
