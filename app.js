import express from "express";
import path from "node:path";
import session from "express-session";
import passport from "passport";
import localStrategy from "passport-local";
import usersRouter from "./routes/usersRouter.js";

const app = express();
app.set("views", path.join(path.resolve(), "views"));
app.set("view engine", "ejs");

app.use(session({secret: "cats", resave: false, saveUninitialized: false}));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.use("/", (req, res) => {
  res.render("index",);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
