import usersStorage from "../storages/usersStorage.js";
import {body, validationResult } from "express-validator";

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
  body("firstName").trim()
    .isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
  body("lastName").trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
];

const usersListGet = (req, res) => {
  res.render("index", {
    title: "User list",
    users: usersStorage.getUsers(),
  });
};

const usersCreateGet = (req, res) => {
  res.render("createUser", {
    title: "Create user",
  });
};

const usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      });
    }
    const { firstName, lastName } = req.body;
    usersStorage.addUser({ firstName, lastName });
    res.redirect("/");
  }
];

const usersUpdateGet = (req, res) => {
  const userId = req.params.id;
  const user = usersStorage.getUserById(userId);
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.render("updateUser", {
    title: "Update user",
    user,
  });
}

const usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName } = req.body;
    usersStorage.updateUser(req.params.id, { firstName, lastName });
    res.redirect("/");
  }
];

const usersDeletePost = (req, res) => {
  const userId = req.params.id;
  usersStorage.deleteUser(userId);
  res.redirect("/");
}

const userController = {
  usersListGet,
  usersCreateGet,
  usersCreatePost,
  usersUpdateGet,
  usersUpdatePost,
  usersDeletePost,
};

export default userController;