const router = require("express").Router();
require("dotenv").config();
const userController = require("../controllers/auth/userController");
const { signup: signupValidator, signin: signinValidator, passwordcheck: passwordCheck } = require("../validators/inputValidator.js");
const { asyncHandler } = require("../middlewares/asyncHandler");
const authenticate = require("../middlewares/authenticate.js");

module.exports = app => {
//login endpoint
router.route("/signin").post(signinValidator, asyncHandler(userController.signin));

//signup
router.route("/signup").post(signupValidator, asyncHandler(userController.create));

//optionals, using the passwordCheck validator to check if the password follows the standard
router.route("/updatepassword/:id").put(passwordCheck, asyncHandler(userController.updatepassword));

//get all users
router.route("/get-all-users").get(authenticate,userController.getAllUser);

//get a single user
router.route("/get-single-user/:id").get(authenticate,userController.getSingleUser);


app.use('/api/v1/user',(req,res,next)=>{
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type, Accept, Authorization');
     next();
    },router);

}