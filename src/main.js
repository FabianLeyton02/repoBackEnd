import express from "express";
import cartsRouter from "./routers/carts.router.js";
import ProductRouter from "./routers/products.router.js";
import { engine } from "express-handlebars";
import viewsRouter from "./routers/views.router.js";
import cookie from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";
import UserRouter from "./routers/user.router.js";
import AuthRouter from "./routers/auth.router.js";
import JWTRouter from "./routers/jwt.router.js";
import PassportRouter from "./routers/passport.route.js";
import passport from "./utils/passport.util.js";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import customError from "./utils/customError.js";
import { validate as uuidValidate } from "uuid";
import logger from "./utils/logger.js";
import loggerMiddleware from "./middleware/logger.middleware.js";

export function setApp() {
  const app = express();
  app.use(loggerMiddleware);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("/public"));
  app.use(passport.initialize());
  app.use(cors());
  app.use(errorHandler);

  app.use("/", viewsRouter);
  app.use("/api/carts", cartsRouter);
  app.use("/api/products", ProductRouter.getRouter());
  app.use("/api/users", UserRouter.getRouter());
  app.use("/api/auth", AuthRouter);
  app.use("/api/jwt", JWTRouter);
  app.use("/api/passport", PassportRouter);
  app.use("/api/auth", AuthRouter);
  

  app.set("view engine", "handlebars");
  app.set("views", "/views");

  app.get("/getUser/:uuid", (req, res) => {
    const { uuid } = req.params;
    const isValidate = uuidValidate(uuid);
    if (!isValidate) {
      customError.createError(
        "getUserError",
        "UUid invalido",
        "El UUid es incorrecto",
        3
      );
    }
  });

  app.get("/", (req, res) => {
    logger.warn("Este es un warn");
    res.send("Warn");
  });
  app.get("/error", (req, res) => {
    logger.error("Este es un error");
    res.send("Error");
  });
  app.get("/loggerTest", (req, res) => {
    logger.silly("Mensaje silly");
    logger.log("debug", "Mensaje debug");
    logger.verbose("Mensaje verbose");
    logger.http("Mensaje http");
    logger.info("Mensaje info");
    logger.warn("Mensaje warn");
    logger.error("Mensaje error");
    res.send("Todos");
  });

  app.engine("handlebars", engine());

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

  return app;
}
