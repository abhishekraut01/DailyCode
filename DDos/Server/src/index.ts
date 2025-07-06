import express, { Request, Response } from "express";
const PORT = 9000;
const app = express();

// middleware to parse incoming JSON body
app.use(express.json());

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

app.post("/login", (req: Request, res: Response) => {
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



app.listen(PORT, () => {
  console.log(`🚀 server is listening at port ${PORT}`);
});
