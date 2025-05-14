import pool from "../db/pool.js";

const signupFormGet = async (req, res) => {
  try {
    res.render("sign-up-form", {
      title: "Sign Up",
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const register = async (req, res) => {
  try{
    const { username, password } = req.body;
    const existingUser = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (existingUser.rows.length > 0) {
      return res.status(400).send("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashedPassword]);
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    res.json({ user: user.rows[0] });
  }
  catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        req.session.userId = user.id;
        res.redirect("/");
      } else {
        res.status(401).send("Invalid credentials");
      }
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Internal Server Error");
  }
}

const userController = {
  signupFormGet,
  register,
  login,
};

export default userController;