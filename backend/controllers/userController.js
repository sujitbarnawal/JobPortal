import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, password, role, phoneNumber } = req.body;
    
    if (!fullname || !email || !password || !role || !phoneNumber) {
      return res
        .status(400)
        .json({ message: "Please fill in all fields", success: false });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists", success: false });
    }

    const file=req.file;
    const fileUri = getDataUri(file)
    const cloudinaryResponse=await cloudinary.uploader.upload(fileUri.content)

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
      profile: {
        profilePhoto:cloudinaryResponse.secure_url,
      },
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Please fill in all fields", success: false });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ message: "Invalid  password", success: false });
    }
    if (role !== user.role) {
      return res.status(400).json({ message: "Invalid role", success: false });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "None",
      })
      .json({
        message: "User logged in successfully",
        user,
        success: true,
      });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ message: "User logged out successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", success: false });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    if (!fullname || !email || !phoneNumber || !bio || !skills) {
      return res.status(400).json({
        message: "Please fill all fields",
        success: false,
      });
    }

    const userId = req._id;
    let updateData = {
      fullname,
      email,
      phoneNumber,
      "profile.bio": bio,
      "profile.skills": skills.split(","),
    };

    // Handle file upload if file exists
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

      updateData["profile.resume"] = cloudResponse.secure_url;
      updateData["profile.resumeOriginalName"] = file.originalname;
    }

    let user = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating profile",
      success: false,
    });
  }
};
