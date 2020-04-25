const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const router = express.Router();
//userSchema
const User = require("../models/UserSchema");
//custom middleware
const auth = require("../middleware/auth");

// @Path          : /auth
// @description   : authorization
// @Access        : Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: "enter all credintials" });

  User.findOne({ email }, (err, user) => {
    if (!user) return res.status(400).json({ msg: "Email doesnot exsist" });

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch)
        return res.status(400).json({ msg: "incorrect Credentials" });

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;

          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
});

// @Path          : /auth/user
// @description   : gets particular user
// @Access        : Private               (used custom middleware)
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
