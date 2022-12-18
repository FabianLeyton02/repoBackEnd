import fs from "fs";

export class Product {
  constructor(title, description, price, thumbnail, code, stock, category) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.status = true;
    this.category = category;
  }
}

export class ProductManager {
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

  #validateInfo(product) {
    let validado = true;

    if (!product.title) {
      validado = false;
      console.error("ERROR: title is undefined");
    }

    if (!product.description) {
      validado = false;
      console.error("ERROR: description is undefined");
    }

    if (!product.price) {
      validado = false;
      console.error("ERROR: price is undefined");
    } else {
      if (typeof product.price != "number") {
        console.error("ERROR: price is not a number");
        validado = false;
      }
    }

    if (!product.category) {
      validado = false;
      console.error("ERROR: category is undefined");
    }

    if (!product.code) {
      validado = false;
      console.error("ERROR: code is undefined");
    }

    if (product.stock === undefined) {
      validado = false;
      console.error("ERROR: stock is undefined");
    } else {
      if (typeof product.stock != "number") {
        validado = false;
        console.error("ERROR: stock is not a number");
      }
    }
    return validado;
  }

  addProduct(product) {
    let products = this.#getProductsFromFile();
    let validado = this.#validateInfo(product);

    if (validado) {
      let productFound = false;
      products.forEach((element) => {
        if (element.code === product.code) {
          productFound = true;
        }
      });

      if (productFound) {
        console.error("ERROR: product already exists");
      } else {
        const productItem = {
          id: this.#getMaxId(),
          title: product.title,
          description: product.description,
          price: product.price,
          thumbnail: product.thumbnail,
          code: product.code,
          stock: product.stock,
          category: product.category,
          status: product.status,
        };

        products.push(productItem);
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
    return products;
  }

  getProductsAmount(quantity) {
    let products = this.#getProductsFromFile();
    let final = products.splice(0, quantity);
    return final;
  }

  getProductById(id) {
    let product = undefined;
    let products = this.#getProductsFromFile();
    products.forEach((element) => {
      if (element.id === Number(id)) {
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

  #findProduct(code) {
    let products = this.#getProductsFromFile();
    let product = undefined;
    products.forEach((element) => {
      if (element.code === code) {
        product = element;
      }
      return product;
    });
  }

  updateProduct(
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category
  ) {
    let products = this.#getProductsFromFile();
    products.forEach((element) => {
      if (element.id === id) {
        title ? (element.title = title) : element.title;
        description ? (element.description = description) : element.description;
        thumbnail ? (element.thumbnail = thumbnail) : element.thumbnail;
        category ? (element.category = category) : element.category;

        if (price && typeof price === "number") {
          element.price = price;
        }

        if (typeof stock === "number") {
          element.stock = stock;
        }
        if (code) {
          let otherProduct = this.#findProduct(code);
          if (!otherProduct) {
            element.code = code;
          }
        }
      }
    });
    this.#saveData(products);
  }
}
