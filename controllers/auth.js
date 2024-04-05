const { CustomAPIError } = require("../errors");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const Register = async (req, res) => {
  const user = await User.create({ ...req.body });

  const token = user.jwtCreate();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);

  if (!email || !password) {
    throw new CustomAPIError(
      "Please provide email and password ",
      StatusCodes.BAD_REQUEST
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomAPIError("Invalid User", StatusCodes.UNAUTHORIZED);
  }
  const passwordCorrect = await user.Comparepassword(password)
  if (!passwordCorrect) {
    throw new CustomAPIError("Invalid User", StatusCodes.UNAUTHORIZED);
  }

  const token = user.jwtCreate();

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { Register, Login };
