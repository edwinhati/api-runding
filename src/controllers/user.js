const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.register = (req, res) => {
  const { username, email, password } = req.body;
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  const user = new User({ username, email, password: hash });
  user.save((err) => {
    if (err) {
      return res.status(400).json({
        err: "Username is taken",
      });
    }
    res.json({
      message: "Registration successful",
    });
  });
};
exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: "User with that email does not exist. Please register.",
      });
    }
    const auth = bcrypt.compareSync(password, user.password);
    if(!auth) {
        return res.status(400).json({
            err: "Email and password do not match."
        })
    } else {
        const token = jwt.sign({_id: user._id}, 'owen', {expiresIn: "1d"});
        const {_id, username, email} = user;
        return res.json({
            token,
            user: {_id, username, email}
        })
    }
  });
};
