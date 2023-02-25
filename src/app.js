import "./config/db.js";
import { setApp } from "./main.js";

const app = setApp();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`)
);
server.on("error", (err) => console.log(err));
