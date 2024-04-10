import Joi from "joi";
import User from "../models/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const checkAuth = Joi.object({
  email: Joi.string().required().empty().trim(),
  password: Joi.string().required().empty().trim().min(6),
});
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = checkAuth.validate(req.body, { abortEarly: false });
    if (error) {
      const message = error.details.map((error) => error.message);
      return res.status(400).json({ message });
    } else {
      const existUser = await User.findOne({ email });
      if (existUser) {
        return res.status(400).json({ error: "email da ton tai " });
      }
      const hashPassword = await bcryptjs.hash(password, 10);
      const role = (await User.countDocuments()) === 0 ? "admin" : "user";
      const user = await User.create({
        email,
        password: hashPassword,
        role,
      });
      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "user khong ton tai " });
      }
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "mat khau khong dung" });
      } else {
        const token = await jwt.sign({ id: user._id }, "123456");//exp: Date.now()/1000 +30 
  
        return res
          .status(201)
          .json({ user, token, message: "dang nhap thanh cong" });
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
