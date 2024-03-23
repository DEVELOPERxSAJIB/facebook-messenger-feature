import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createOTP, isEmail, isMobile } from "../client/src/helpers/helpers.js";
import { accoutActivationEmail } from "../mails/accountAcctivationEmail.js";
import { dotsToHyphens } from "../helpers/helpers.js";

/**
 * @DESC User Login
 * @ROUTE /api/v1/auth/login
 * @method POST
 * @access public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password)
    return res.status(404).json({ message: "All fields are required" });

  // find login user by email
  const loginUser = await User.findOne({ email }).populate("role");

  // user not found
  if (!loginUser) return res.status(404).json({ message: "User not found" });

  // password check
  const passwordCheck = await bcrypt.compare(password, loginUser.password);

  // password check
  if (!passwordCheck)
    return res.status(404).json({ message: "Wrong password" });

  // create access token
  const token = jwt.sign(
    { email: loginUser.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
    }
  );

  // create Refresh token
  const refreshToken = jwt.sign(
    { email: loginUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN,
    }
  );

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.APP_ENV == "Development" ? false : true,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    token,
    user: loginUser,
    message: "User Login Successful",
  });
});

/**
 * @DESC User Login
 * @ROUTE /api/v1/auth/login
 * @method POST
 * @access public
 */
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logout successful" });
});

/**
 * @DESC Create new User
 * @ROUTE /api/v1/user
 * @method POST
 * @access public
 */
export const register = asyncHandler(async (req, res) => {
  const { name, auth, password } = req.body;

  if (!name || !auth || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check email or Phone Number
  let authEmail = null;
  let authPhone = null;

  // create access token for account activation
  const activationCode = createOTP();

  if (isMobile(auth)) {
    authPhone = auth;

    // check user Phone exists or not
    const userPhoneCheck = await User.findOne({ phone: authPhone });
    if (userPhoneCheck) {
      return res.status(400).json({ message: "Phone number already exists" });
    }
  } else if (isEmail(auth)) {
    authEmail = auth;

    // check user email exists or not
    const userEmailCheck = await User.findOne({ email: authEmail });
    if (userEmailCheck) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // create verification token
    const verificationToken = jwt.sign(
      { auth: auth },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: 1000 * 60 * 5,
      }
    );

    // set token to cookie memory
    res.cookie("verificationToken", verificationToken, {
      httpOnly: false,
      secure: process.env.APP_ENV == "Development" ? false : true,
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60 * 1000,
    });

    // convert token frontend acceptable
    const acceptableToken = dotsToHyphens(verificationToken);

    // activation link
    const activationLink = `http://localhost:3000/activation/${acceptableToken}`;

    // send actiovation email
    const emailOptions = {
      email: auth,
      subject: "Account activation email",
      code: activationCode,
      name: name,
      activationLink: activationLink,
    };

    await accoutActivationEmail(emailOptions);
  } else {
    return res.status(400).json({
      message: "Please enter a phone number or email address for registration",
    });
  }

  // password hash
  const hashPass = await bcrypt.hash(password, 10);

  // create new user
  const user = await User.create({
    name,
    phone: authPhone,
    email: authEmail,
    password: hashPass,
    accessToken: activationCode,
  });

  res.status(200).json({
    user,
    message: "User Created successful",
  });
});

/**
 * @DESC Activate User
 * @ROUTE /api/v1/activate-user-by-opt
 * @method POST
 * @access public
 */
export const activateUserByOTP = async (req, res) => {
  const { token, otp } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Can't find token" });
  }
  if (!otp) {
    return res.status(400).json({ message: "OTP is required" });
  }

  // verify token data
  const { atuh } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log(atuh);

  // activation auth
  let authUser = null;

  if (isMobile(decode.atuh)) {
    authUser = await User.findOne({ phone: decode.auth });
    if (!authUser) {
      return res.status(400).json({ message: "Phone number not found" });
    }
  } else if (isEmail(decode.atuh)) {
    authUser = await User.findOne({ email: decode.auth });
    console.log("email", authUser);

    if (!authUser) {
      return res
        .status(400)
        .json({ message: "Email is not used for register" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Request failed. Please try again " });
  }

  // check otp
  if (authUser.accessToken !== otp) {
    return res.status(200).json({ message: "Wrong OTP" });
  }

  // make accesstoken null
  authUser.accessToken = null;
  authUser.save();

  res
    .status(200)
    .json({ message: "Your account has been verified. Please Login" });
};

/**
 * @DESC Create new User
 * @ROUTE /api/v1/user
 * @method POST
 * @access public
 */
export const loggedInUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.me);
});

/**
 * @DESC Create new User
 * @ROUTE /api/v1/user
 * @method POST
 * @access public
 */
export const makeHashPass = asyncHandler(async (req, res) => {
  const { password } = req.body;
  // password hash
  const hashPass = await bcrypt.hash(password, 10);
  res.status(200).json({ hashPass });
});
