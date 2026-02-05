export const sendToken = (user, statusCode, message, res) => {
    const token = user.generateToken();
    
    // Debugging logs
    console.log("🔹 Generated Token:", token);
    
    if (!token || typeof token !== "string") {
        return res.status(500).json({ success: false, message: "Failed to generate a valid token." });
    }

    res.status(statusCode)
       .cookie("token", token, {
            expires: new Date(
                Date.now() + (Number(process.env.COOKIE_EXPIRE) || 7) * 24 * 60 * 60 * 1000
            ), // Default to 7 days if COOKIE_EXPIRE is undefined
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "Strict",
        })
       .json({
            success: true,
            user,
            message,
            token,
        });
};
