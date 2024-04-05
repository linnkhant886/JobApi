const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const { CustomAPIError } = require("../errors");

const auth = async (req, res, next) => {
  const AuthHeader = req.headers.authorization;

  if (!AuthHeader || !AuthHeader.startsWith("Bearer")) {
    throw new CustomAPIError(
      "Authentication Invalid",
      StatusCodes.UNAUTHORIZED
    );
  }

  const token = AuthHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userID: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new CustomAPIError(
      "Authentication Invalid ",
      StatusCodes.UNAUTHORIZED
    );
  }
};

module.exports = auth;
