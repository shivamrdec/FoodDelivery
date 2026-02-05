import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import  { User }  from "../models/userModel.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    console.log("🔹 Raw Cookies:", req.cookies); // Debug cookies

    const token = req.cookies?.token;
    console.log("🔹 Extracted Token:", token); // Log extracted token

    if (!token || typeof token !== "string" || token === "{}") {
        return next(new ErrorHandler("User is not authenticated.", 400));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid or expired token.", 400));
    }
});
