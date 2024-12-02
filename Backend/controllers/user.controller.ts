import { Request, Response } from "express";
import { User } from "../models/user.models";
import bcrypt from "bcryptjs";
import crypto from "crypto-js"
import cloudinary from "../utils/cloudinary";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import { generateToken } from "../utils/generateToken";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../maitrap/email";


// 1-Signup logic
export const signup = async (req: Request, res: Response) => {
    try {
        const { fullname, email, password, contact } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exist with this email"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10); // This is the salt rounds parameter, which indicates the computational cost of hashing
        const verificationToken =  generateVerificationCode();

        user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            contact: Number(contact),
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        })
        generateToken(res,user);

        await sendVerificationEmail(email, verificationToken);

        const userWithoutPassword = await User.findOne({ email }).select("-password");
        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: userWithoutPassword
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
};

// 2-Login Logic
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }
        generateToken(res, user);
        user.lastLogin = new Date();
        await user.save();

        // send user without passowrd
        const userWithoutPassword = await User.findOne({ email }).select("-password");
        return res.status(200).json({
            success: true,
            message: `Welcome back ${user.fullname}`,
            user: userWithoutPassword
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

// 3-Verify email logic
export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const { verificationCode } = req.body;
       
        const user = await User.findOne({ verificationToken: verificationCode, verificationTokenExpiresAt: { $gt: Date.now() } }).select("-password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification token"
            });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined
        await user.save();

        // send welcome email
        await sendWelcomeEmail(user.email, user.fullname);

        return res.status(200).json({
            success: true,
            message: "Email verified successfully.",
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

// 4-Logout Logic
export const logout = async (_: Request, res: Response) => {
    try {
        return res.clearCookie("token").status(200).json({
            success: true,
            message: "Logged out successfully."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
};

// 5-Forgot Password Logic
export const forgotPassword= async(req:Request, res:Response)=>{
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User doesn't exist"
            })
        }

        // // creates a buffer of 40 random bytes and converts these random bytes into a hexadecimal string, making it a human-readable token.
        const resetToken = crypto.randomBytes(40).toString('hex'); 
        // 1 * 60 * 60 * 1000 represents 1 hour in milliseconds.
        const resetTokenExpiresAt = new Date(Date.now()+1*60*60*1000); 

        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
        await user.save();

        // send email
        await sendPasswordResetEmail(user.email, `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`)

        return res.status(200).json({
            success: true,
            message: "Password reset link sent to your email"
        });
    } 
    catch (error) {
        console.log(error)
        return res.status(500).json({message: "Inter server error"})
    }
}

// 6-Reset Password Logic
export const resetPassword = async (req:Request, res:Response)=> {
    try {
        const {token} = req.params;
        const {newPassword} = req.body;

        const user = await User.findOne({resetPasswordToken:token, resetPasswordTokenExpiresAt: {$gt: Date.now()}})
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset token"
            });
        }

        // update Password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;
        await user.save();
        
        // send success reset email
        await sendResetSuccessEmail(user.email);

        return res.status(200).json({
            success: true,
            message: "Password reset successfully."
        });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}


// 7-Checking Authentication Logic
export const checkAuth = async (req:Request, res:Response)=>{
    try {
        const {userId} = req.id;
        const user = await User.findById({userId}).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        };
        return res.status(200).json({
            success: true,
            user
        });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

// 8-Update Profile Logic
export const updateProfile = async (req:Request, res:Response)=>{
    try {
        const {userId} = req.id;
        const {fullname, email, address, city, country, profilePicture} = req.body;

        // upload image on cloudinary
        let cloudResponse: any;
        cloudResponse = await cloudinary.uploader.upload(profilePicture);
        const updateData = {fullname, email, address, city, country, profilePicture};
        
        const user = await User.findByIdAndUpdate(userId, updateData, {new:true}).select("-password");

        return res.status(200).json({
            success:true,
            user,
            message:"Profile updated successfully"
        });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}