import express from "express";
import { Product, ProductManager } from "./ProductManager.js";

let productManager = new ProductManager("./data/archivo.txt");

productManager.addProduct(
  new Product("producto 1", "descripcion prod-1", 150, "sin imagen", "001", 450)
);

productManager.addProduct(
  new Product("producto 2", "descripcion prod-2", 200, "sin imagen", "002", 90)
);

productManager.addProduct(
  new Product("producto 3", "descripcion prod-3", 350, "sin imagen", "003", 10)
);

productManager.addProduct(
  new Product("producto 4", "descripcion prod-4", 40, "sin imagen", "004", 2000)
);

productManager.addProduct(
  new Product("producto 5", "descripcion prod-5", 120, "sin imagen", "005", 400)
);

productManager.addProduct(
  new Product("producto 6", "descripcion prod-6", 80, "sin imagen", "006", 600)
);

productManager.addProduct(
  new Product("producto 7", "descripcion prod-7", 500, "sin imagen", "007", 50)
);

productManager.addProduct(
  new Product("producto 8", "descripcion prod-8", 100, "sin imagen", "008", 20)
);

productManager.addProduct(
  new Product("producto 9", "descripcion prod-9", 400, "sin imagen", "009", 100)
);

productManager.addProduct(
  new Product("producto 10", "descripcion prod-10", 50, "sin imagen", "010", 10)
);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("<h1>Entregable 4</h1>");
});

app.get("/products/:pid", (req, res) => {
  const { pid } = req.params;
  const product = productManager.getProductById(pid);
  if (product) {
    res.json(product);
  } else {
    res.send("<h2>ERROR: not found</h2>");
  }
});

app.get("/products", (req, res) => {
  const { limit } = req.query;
  if (limit) {
    res.json(productManager.getProductsAmount(limit));
  } else {
    res.json(productManager.getProducts());
  }
});

app.listen(PORT, () => {
  console.log(`🔥 Listening on port ${PORT}`);
});
