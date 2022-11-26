class ProductManager {
  constructor() {
    this.products = [];
  }

  #getMaxId() {
    let maxId = 0;
    this.products.forEach((element) => {
      if (element.id > maxId) {
        maxId = element.id;
      }
    });
    return maxId + 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    let validado = true;

    if (!title) {
      validado = false;
      console.error("ERROR: title is undefined");
    }

    if (!description) {
      validado = false;
      console.error("ERROR: description is undefined");
    }

    if (!price) {
      validado = false;
      console.error("ERROR: price is undefined");
    } else {
      if (typeof price != "number") {
        console.error("ERROR: price is not a number");
        validado = false;
      }
    }

    if (!thumbnail) {
      validado = false;
      console.error("ERROR: thumbnail is undefined");
    }

    if (!code) {
      validado = false;
      console.error("ERROR: code is undefined");
    }

    if (!stock) {
      validado = false;
      console.error("ERROR: stock is undefined");
    } else {
      if (typeof stock != "number") {
        validado = false;
        console.error("ERROR: stock is not a number");
      }
    }
    let productFound = false;
    if (validado) {
      this.products.forEach((element) => {
        if (element.code === code) {
          productFound = true;
        }
      });

      if (productFound) {
        console.error("ERROR: product already exists");
      } else {
        const product = {
          id: this.#getMaxId(),
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };

        this.products.push(product);
      }
    }
  }

  getProducts() {
    console.log(this.products);
  }
  getProductById(id) {
    let product = undefined;
    this.products.forEach((element) => {
      if (element.id === id) {
        product = element;
      }
    });
    if (product === undefined) {
      console.error("ERROR: not found");
    } else {
      console.log(product);
    }
  }
}

let productManager = new ProductManager();

productManager.getProducts();
productManager.addProduct(
  "producto prueba",
  "Este es un producto de prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

productManager.getProducts();
productManager.addProduct(
  "producto prueba",
  "Este es un producto de prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

productManager.getProductById(1);
productManager.getProductById(2);
