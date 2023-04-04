const Users = require("../model/Users");
require("dotenv").config();

const handleLogout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;

  const foundUser = await Users.findOne({ refreshToken }).exec();
  // console.log(foundUser);

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  // Users.updateOne({ username: foundUser.username }, { refreshToken: "" });
  foundUser.refreshToken = "";
  const result = await foundUser.save();

  res.clearCookie("jwt");
  res.sendStatus(204);
};

module.exports = { handleLogout };
