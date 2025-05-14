import express from 'express';
import passport from 'passport';
import usersController from "../controllers/usersController.js";

const router = express.Router();

router.get("/sign-up", usersController.signupFormGet);
router.post("/register", usersController.register);
router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/"
}));
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export default router;