import express from "express";
import path from "node:path";
import session from "express-session";
import passport from "./config/passportConfig.js";
import usersRouter from "./routes/usersRouter.js";

const app = express();
app.set("views", path.join(path.resolve(), "views"));
app.set("view engine", "ejs");

app.use(session({secret: "cats", resave: false, saveUninitialized: false}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
