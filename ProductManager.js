const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  #getMaxId() {
    let maxId = 0;
    let products = this.#getProductsFromFile();
    products.forEach((element) => {
      if (element.id > maxId) {
        maxId = element.id;
      }
    });
    return maxId + 1;
  }

  #validateInfo(title, description, price, thumbnail, code, stock) {
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

    if (stock === undefined) {
      validado = false;
      console.error("ERROR: stock is undefined");
    } else {
      if (typeof stock != "number") {
        validado = false;
        console.error("ERROR: stock is not a number");
      }
    }
    return validado;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    let products = this.#getProductsFromFile();
    let validado = this.#validateInfo(
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );
    if (validado) {
      let productFound = false;
      products.forEach((element) => {
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

        products.push(product);
        this.#saveData(products);
      }
    }
  }

  #getProductsFromFile() {
    let productsFromFile = [];
    if (fs.existsSync(this.path)) {
      productsFromFile = JSON.parse(fs.readFileSync(this.path));
    }
    return productsFromFile;
  }

  getProducts() {
    let products = this.#getProductsFromFile();
    console.log(products);
  }
  getProductById(id) {
    let product = undefined;
    let products = this.#getProductsFromFile();
    products.forEach((element) => {
      if (element.id === id) {
        product = element;
      }
    });
    if (product === undefined) {
      console.error("ERROR: not found");
    } else {
      return product;
    }
  }

  #saveData(products) {
    let linea = JSON.stringify(products, null, "\t");
    if (fs.existsSync(this.path)) {
      fs.unlinkSync(this.path);
    }
    fs.writeFileSync(this.path, linea, "utf-8");
  }

  deleteProduct(id) {
    let products = this.#getProductsFromFile();
    let index = 0;
    let productIndex = undefined;
    products.forEach((element) => {
      if (element.id === id) {
        productIndex = index;
      }
      index++;
    });

    if (productIndex === undefined) {
      console.error("ERROR: product not found");
    } else {
      products.splice(productIndex, 1);
      this.#saveData(products);
    }
  }
  updateProduct(id, title, description, price, thumbnail, code, stock) {
    let products = this.#getProductsFromFile();
    products.forEach((element) => {
      if (element.id === id) {
        title ? (element.title = title) : element.title;
        description ? (element.description = description) : element.description;
        thumbnail ? (element.thumbnail = thumbnail) : element.thumbnail;

        if (price && typeof price === "number") {
          element.price = price;
        }

        if (typeof stock === "number") {
          element.stock = stock;
        }

        if (code) {
          let product = this.findProduct(code);
          if (product.code === code && product.id === id) {
            element.code = code;
          }
        }
      }
    });
    this.#saveData(products);
  }
}

let productManager = new ProductManager("./data/archivo.txt");

productManager.getProducts();

productManager.addProduct(
  "producto prueba",
  "Este es un producto de prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

productManager.addProduct(
  "OTRO PRODUCTO PRUEBA",
  "Este es un producto de prueba 2",
  400,
  "Sin imagen",
  "abc125",
  25
);

productManager.getProducts();
productManager.getProductById(1);
productManager.getProductById(3);

productManager.updateProduct(
  2,
  "Nuevo titulo",
  "otra descripcion",
  0,
  "con imagen",
  "",
  0
);

productManager.deleteProduct(1);
productManager.deleteProduct(5);