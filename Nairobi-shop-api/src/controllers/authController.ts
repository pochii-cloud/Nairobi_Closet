import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import config from "../config";
import User, { IUser } from "../models/user";
import Settings from "../models/settings";
import Token from "../models/token";


// Usage example

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const user: any = await User.findOne({ email: email });
    console.log("This is the user",user);
    // Check User exists
    if (!user) {
      return res.status(404).send({
        status: false,
        message: "Account doesn't exists. Please register.",
      });
    }
    // Check password exists
    if (!user.password) {
      return res.status(409).send({
        status: false,
        message: "Error with your account.Please contact administrator.",
      });
    }

    // check the roles
    // if (panel && panel == "admin") {
    //   if (!user.role || user.role !== "admin") {
    //     return res.status(403).send({
    //       status: false,
    //       code: "UnauthorizedError",
    //       message: "User doesn't have enough permission.",
    //     });
    //   }
    // }

    // if (panel && panel == "user") {
    //   if (!user.role || user.role !== "user") {
    //     return res.status(403).send({
    //       status: false,
    //       code: "UnauthorizedError",
    //       message: "User doesn't have enough permission.",
    //     });
    //   }
    // }

    // checking password validation;
    const passwordIsValid = bcryptjs.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(400).send({
        status: false,
        message: "Invalid Credential. Please Try again.",
      });
    }

    // generate token
    const token = jwt.sign({ id: user._id }, config.jwt.SECRET, {
      expiresIn: config.jwt.TOKEN_TTL,
      issuer: config.jwt.ISSUER,
    });

    // response user;
    const resUser = user.toObject();
    delete resUser.password;
    
    
    
    // update visitors
    await Settings.updateOne({
      $inc:{
        visitors:1
      }
    })
    
    return res.status(200).send({
      status: true,
      message: "Successfully login.",
      accessToken: token,
      user: resUser,
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      message: "Error logging in user. Please try again",
    });
  }
};

const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const user_exist = await User.findOne({ email: email });

    if (user_exist) {
      return res.status(409).send({
        status: false,
        message: "User already exists with this email.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(401).send({
        status: false,
        message: "Password does not match. please try again.",
      });
    }

    const user = await User.create({
      name: name,
      email: email,
      status:'active',
      password: bcryptjs.hashSync(password),
    });

  
    const token = jwt.sign({ id: user._id }, config.jwt.SECRET, {
      expiresIn: config.jwt.TOKEN_TTL,
      issuer: config.jwt.ISSUER,
    });
    const resUser = user.toObject();
    delete resUser.password;
    return res.status(200).send({
      status: true,
      message: "Successfully created account",
      accessToken: token,
      user: resUser,
    });
  } catch (e) {
    return res
      .status(400)
      .send({
        status: false,
        message: "Something went wrong while registering user.",
      });
  }
};
const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user: IUser = await User.findOne({ email }) as  IUser;
    if (!user) {
      return res.status(400).send('User with the given email does not exist');
    }

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString('hex'),
      }).save();
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'nairobicloset50@gmail.com',
        pass: 'jcrorngfdagteecz',
      },
    });

    const mailOptions = {
      from: 'nairobicloset50@gmail.com',
      to: user.email,
      subject: 'Reset Password Link',
      html: `<p>Reset Password Link:</p> <a href="http://localhost:3000/reset-password/${user._id}/${token.token}">here</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.send('Password reset link sent to your email account');
  } catch (error) {
    res.send('An error occurred');
    console.log(error);
  }
}
  
 const resetPassword = async (req, res) => {
  try {
    const { userId, token } = req.params;
    const { password } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const savedToken = await Token.findOne({ userId: user._id, token });
    if (!savedToken) {
      return res.status(400).send("Invalid or expired token");
    }

    if (password.length < 6) {
      return res.status(400).send("Password must be at least 6 characters");
    }

    user.password = bcryptjs.hashSync(password);
    await user.save();

    await savedToken.remove(); // Remove the used token

    return res.status(200).send("Password reset successful");
  } catch (error) {
    console.error("Error while resetting password:", error);
    return res.status(500).send("Something went wrong while resetting password");
  }
};


 

// const resetPassword = async (req: Request, res: Response): Promise<Response> => {
//   try {
//     const { userId, token } = req.params;
//     const { password, confirmPassword } = req.body;

//     const user: IUser = await User.findById(userId) as IUser;
//     console.log("This is the user selected",user)
//     if (!user) {
//       return res.status(404).send('User not found');
//     }

//     const savedToken = await Token.findOne({ userId: user._id, token });
//     if (!savedToken) {
//       return res.status(400).send('Invalid or expired token');
//     }

//     if (password !== confirmPassword) {
//       return res.status(401).send('Password does not match. Please try again.');
//     }

//     user.password = bcryptjs.hashSync(password);
//     console.log("This is the new password",user.password)
//     await user.save();

//     await savedToken.remove(); // Remove the used token

//     return res.status(200).send('Password reset successful.');
//   } catch (error) {
//     return res.status(400).send('Something went wrong while resetting password.');
//   }
// };



 
const changePassword = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    const oldUser = await User.findOne({ email: email });
    if (!oldUser) {
      res.status(404).json({
        status: false,
        message: "Account not found.",
      });
    }
    const currentPasswordIsValid = bcryptjs.compareSync(
      currentPassword,
      oldUser.password
    );
    if (!currentPasswordIsValid) {
      return res.status(409).json({
        status: false,
        message: "Current password does not match with old password.",
      });
    }

    oldUser.password = bcryptjs.hashSync(newPassword);
    await oldUser.save();
    res.status(200).json({
      status: true,
      message: "Password updated successfully.",
      data: oldUser,
    });
    return;
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const profile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as IUser;
    res.status(200).json({
      status: true,
      message: "Successfully fetched user.",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Something went wrong while fetching profile.",
    });
  }
};

const profileUpdate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phone, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone, address },
      { new: true }
    );
    res.status(200).json({
      status: true,
      message: "Account successfully updated.",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Something went wrong while updating account.",
    });
  }
};

export = { login, register, forgotPassword, resetPassword, changePassword, profile, profileUpdate };
