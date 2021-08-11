// Libraries
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const  User  = require("../models/User");
const { JWT_EXPIRATION_MS, JWT_SECRET } = require("../config/keys");


exports.signup = async (req, res, next) => {
  try {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRound);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};


exports.signin = async (req, res, next) => {
  const token = generateToken(req.user);
  res.json({ token });
};


const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };

  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};