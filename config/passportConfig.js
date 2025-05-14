import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import pool from "../db/pool.js";
import bcrypt from "bcrypt";

// Configure LocalStrategy using bcrypt to compare passwords
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = rows[0];
      if (!user) return done(null, false, { message: "Incorrect username" });
      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false, { message: "Incorrect password" });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Serialize user id to save in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user based on the id stored in session
passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;