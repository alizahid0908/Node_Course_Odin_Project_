import express from "express";
import authorRouter from "./routes/authorRouter.js";
import bookRouter from "./routes/bookRouter.js";
import indexRouter from "./routes/indexRouter.js";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index", { message: "EJS rocks!" });
  });       
// app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

const PORT = 3000; 

app.listen(PORT, ()=>{
    console.log(`My first Express app - listening on port ${PORT}!`);
})
