import express, { Request, Response } from "express";
const PORT = 9000;
import { rateLimit } from 'express-rate-limit'
const app = express();

// middleware to parse incoming JSON body
app.use(express.json());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message:"tere ma ki chut bass kar ab"
})

// mock user data (ideally should come from DB)
const User = [
  {
    _id: "66ae0c9b5f1d1a4a1a1a1a01",
    email: "abhishek@gmail.com",
    password: "pass123Abhi!",
    username: "Abhishek",
  },
  {
    _id: "66ae0c9b5f1d1a4a1a1a1a02",
    email: "rahul@example.com",
    password: "rahulStrongPwd@1",
    username: "Rahul",
  },
  {
    _id: "66ae0c9b5f1d1a4a1a1a1a03",
    email: "sneha@example.com",
    password: "sneha$securePass9",
    username: "Sneha",
  },
  {
    _id: "66ae0c9b5f1d1a4a1a1a1a04",
    email: "ayesha@example.com",
    password: "AyeshaPass!88",
    username: "Ayesha",
  },
  {
    _id: "66ae0c9b5f1d1a4a1a1a1a05",
    email: "vishal@example.com",
    password: "vishalSecure#77",
    username: "Vishal",
  },
];

// temporary store for mapping email to OTP
const MapUserWithOtp: Map<string, string> = new Map<string, string>();

app.post("/login", limiter ,  (req: Request, res: Response) => {
  // take email and password from user
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  // find the user
  const user = User.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // match the password
  if (user.password !== password) {
    return res.status(401).json({
      success: false,
      message: "Invalid password",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      email: user.email,
      username: user.username,
    },
  });
});

app.post("/generate-otp",limiter ,  (req: Request, res: Response) => {
  // get the email from the body
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required in order to reset password",
    });
  }

  // verify the user is present in database or not
  const userExist = User.find((user) => user.email === email);

  if (!userExist) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  // if user present generate random 6 digit otp
  const OTP = Math.floor(10000 + Math.random() * 90000); // ensures 6-digit OTP

  if (!OTP) {
    return res.status(400).json({
      success: false,
      message: "OTP can not be generated",
    });
  }

  // save the otp along with email id in map
  MapUserWithOtp.set(email, OTP.toString());

  console.log(`✅ OTP generated for ${email} : ${OTP}`);

  // send the otp to user
  res.status(200).json({
    success: true,
    message: "OTP generated and printed on console",
    email,
  });
});

app.post("/reset-password",limiter , (req: Request, res: Response) => {
  // Take email, otp and new password from user to reset password
  const { email, otp, newPassword } = req.body;

  if (!otp || !email || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Email, OTP, and new password are required",
    });
  }

  // Check if user exists
  const user = User.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Check if OTP matches
  const savedOtp = MapUserWithOtp.get(email);
  if (!savedOtp) {
    return res.status(400).json({
      success: false,
      message: "No OTP found for this email. Please generate OTP again.",
    });
  }

  if (savedOtp !== otp) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }

  // Update the user's password
  user.password = newPassword;

  // Delete OTP after use
  MapUserWithOtp.delete(email);

  console.log(`✅ Password updated for ${email}`);

  return res.status(200).json({
    success: true,
    message: "Password has been reset successfully",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 server is listening at port ${PORT}`);
});
