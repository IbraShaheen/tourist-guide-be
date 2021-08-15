// Libraries
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Guide = require("../models/Guide");
const { JWT_EXPIRATION_MS, JWT_SECRET } = require("../config/keys");

exports.signup = async (req, res, next) => {
  try {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRound);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    if (req.body.type==="guide") {
      await Guide.create({ user: newUser.id });
    }
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

exports.usersList = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};
exports.userUpdate = async (req, res, next) => {
  try {
    if(req.file)
    req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;

    User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      { new: true },
      function (err, user) {
        if (err) {
          next({ message: "user not Found", status: 404 });
        }
        res.json(user);
      }
    );
  } catch (error) {
    next(error);
  }
};