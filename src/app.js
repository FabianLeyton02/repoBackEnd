import express from "express";
import cartsRouter from "./routers/carts.router.js";
import productsRouter from "./routers/products.router.js";
import { engine } from "express-handlebars";
import viewsRouter from "./routers/views.route.js";
import dotenv from "dotenv";
import "./config/db.js";
import cookie from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";
import userRouter from "./routers/user.router.js";
import AuthRouter from "./routers/auth.router.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("/public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "/views");

app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use("/", viewsRouter);

app.use("/api/users", userRouter);
app.use("/api/auth", AuthRouter);

app.use(cookie(process.env.SECRET));
app.use(
  session({
    store: new mongoStore({
      mongoUrl: process.env.MONGO_URI,
      options: {
        userNewUrlParse: true,
        useUnifiedTopology: true,
      },
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 100000 },
  })
);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`)
);
server.on("error", (err) => console.log(err));
