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

app.assetsPath = path.join(__dirname, "public")
app.use(express.static(app.assetsPath))

const links = [
  { href: "/", text: "Home" },
  { href: "/authors", text: "Authors" },
  { href: "/books", text: "Books" },
];

const users = ["Rose", "Cake", "Biff"];

app.get("/", (req, res) => {
  res.render("index", { links: links, users: users });
  }); 
app.get("/authors", (req, res) => {
  res.render("authors", { links: links, users: users });
});  
    
// app.use("/", indexRouter);
// app.use("/authors", authorRouter);
// app.use("/books", bookRouter);

const PORT = 3000; 

app.listen(PORT, ()=>{
    console.log(`My first Express app - listening on port ${PORT}!`);
})
