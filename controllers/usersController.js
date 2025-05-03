import db from "../db/queries.js";
import { Pool } from "pg";

const usersListGet = async (req, res) => {
  try {
    const search = req.query.search;
    let users;

    if (search) {
      users = await db.searchUsernames(search);
    } else {
      users = await db.getAllUsernames();
    }

    res.render("index", {
      title: "Usernames List",
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
};

const usersCreateGet = async (req, res) => {
  res.render("createUser", {
    title: "Create user",
  });
};

const usersCreatePost = async (req, res) => {
  const username = req.body.username;
  await db.insertUsername(username);
  console.log("username to be saved: ", username);
  res.redirect("/");
};

const usersDeleteGet = async (req, res) => {
  try {
    await db.deleteAllUsernames();
    console.log("All usernames deleted.");
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting usernames:", error);
    res.status(500).send("Internal Server Error");
  }

}

const userController = {
  usersListGet,
  usersCreateGet,
  usersCreatePost,
  usersDeleteGet,
};

export default userController;