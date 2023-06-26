import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
const validator = {
  loginValidator: [
    body("email")
      .isEmail()
      .withMessage("Email must be a valid email address.")
      .normalizeEmail(),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],

  registerValidator: [
    body("name")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Name is required."),
      body("email")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Email field is required.")
      .isEmail()
      .withMessage("Email must be a valid email address")
  ],
  forgotPasswordValidator: [
    body("email")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Email field is required.")
    .isEmail()
    .withMessage("Email must be a valid email address"),
    ],
    
  //   resetPasswordValidator: [
  //   body("code")
  //   .exists()
  //   .not()
  //   .isEmpty()
  //   .withMessage("Code field is required."),
  //   body("password")
  //   .isLength({ min: 6 })
  //   .withMessage("Password must be at least 6 characters"),
  // ],
  validate:(req: Request, res: Response,next: NextFunction):void=>{
    const errors=validationResult(req);
    if(errors.isEmpty()){
        next();
        return;
    }
    const extractedErrors=errors.array().map((err)=>{
        return {name:err.param,message:err.msg};
    });
    
    res.status(422).json({
        status:false,
        errors:extractedErrors
    })
    return;
  }
};

export default validator
