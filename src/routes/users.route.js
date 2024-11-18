const router = require("express").Router();
require("dotenv").config();
const userController = require("../controllers/auth/userController");
const { signup: signupValidator, signin: signinValidator, passwordcheck: passwordCheck } = require("../../validators/inputValidator");
const { asyncHandler } = require("../../middlewares/asyncHandler");


module.exports = app => {
//login endpoint
router.route("/signin").post(signinValidator,asyncHandler(userController.signin));
//signup
router.route("/signup").post(signupValidator, asyncHandler(userController.create));

app.use('/api/v1/user',(req,res,next)=>{
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type, Accept, Authorization');
     next();
    },router);

}