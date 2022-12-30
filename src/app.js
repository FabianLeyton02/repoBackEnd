import express from "express";
import cartsRouter from "./routers/carts.router.js";
import productsRouter from "./routers/products.router.js";
import { engine } from "express-handlebars";
import viewsRouter from "./routers/views.route.js";
import { Server } from "socket.io";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("/public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "src/views");

app.use("/api/carts", cartsRouter);
app.use("/realtimeproducts", productsRouter);
app.use("/", viewsRouter);

const PORT = 8080;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`)
);
server.on("error", (err) => console.log(err));

const socketServer = new Server(server);

const messages = [];
socketServer.on("connection", (socket) => {
  console.log("nueva conexion");
  socket.emit("Welcome", { welcome: "Bienvenido al websocket", messages });
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
  socket.on("message", (data) => {
    console.log("Servidor:", data);
    messages.push(data);
    socketServer.emit("message", data);
  });
});
