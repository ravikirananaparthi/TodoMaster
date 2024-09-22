import bcrypt from "bcrypt";
import { asyncError, errorHandler } from "@middlewares/error";
import { connectDB, cookieSetter, generateToken } from "@utils/features";
import { User } from "@models/user";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST")
    return errorHandler(res, 400, "Only POST Method is allowed");

  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return errorHandler(res, 400, "Please enter all fields");

  await connectDB();
  console.log("Connected to DB");
  let user = await User.findOne({ email });
  console.log("Existing User:", user);
  if (user) return errorHandler(res, 400, "User registered with this email");

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashedPassword);

  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
console.log(user);
  const token = generateToken(user._id);
console.log(token)

  cookieSetter(res, token, true);

  res.status(201).json({
    success: true,
    message: "Registered Successfully",
    user,
  });
});

export default handler;
