import { io } from "socket.io-client";
const socket = io();

let title = document.getElementById("title");
let description = document.getElementById("description");
let price = document.getElementById("price");
let thumbnail = document.getElementById("thumbnail");
let code = document.getElementById("code");
let stock = document.getElementById("stock");
let category = document.getElementById("category");

let productList = document.getElementById("products");

// let name = document.getElementById("name");
let submit = document.getElementById("submit");
// let message = document.getElementById("message");
// let messages = document.getElementById("messages");

let newProductList = [];

socket.on("Welcome", (arg) => {
  console.log(arg);
  newProductList = arg.messages;
  console.log(newProductList);
  cargarProductos(newProductList);
});

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const newProduct = {
    title: title.value.trim(),
    description: description.value.trim(),
    price: price.value,
    thumbnail: thumbnail.value.trim(),
    code: code.value.trim(),
    stock: stock.value,
    category: category.value.trim(),
  };
  newProductList.push(newProduct);

  console.log("Cliente:", newProduct);
  socket.emit("message", { newProduct });
});

socket.on("message", (data) => {
  console.log("Mensaje recibido:", data);
  newProductList.push(data);
  cargarProductos(newProductList);
});

function cargarProductos(newProductList) {
  let _newProductList = "";
  for (const productItem of newProductList) {
    _newProductList += `${productItem.title}\n`;
  }
  productList.innerHTML = _newProductList;
}
