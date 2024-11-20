const User = require("../../services/auth/authService.js");
const { hash: hashPassword, comparepassword: comparePassword } = require('../../utility/password.js');
const { generate: generateToken } = require("../../utility/token.js");
const logger = require("../../utility/logger.js");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      status:"error",
      error: "Content can not be empty!"
    });
  }

// Create a User
const {username,first_name,last_name,email,password,user_role,is_admin} = req.body;

//hashing the password before saving to database table
const hashedPassword = hashPassword(password.trim());

const user = new User(username,first_name,last_name,email,hashedPassword,user_role,is_admin);

// Save User in the database
User.create(user, (err, data) => {
if(err) {
res.status(500).send({
status: "error",
error: err.message
});
}else{
//const token = generateToken(data.id);
logger.info(`Data: ${JSON.stringify(data)}`);
res.status(200).json({status: "success",data: data});
return;
}
});
};


/*
*signin the user, this function generates an auth token - JWToken which is sent within
*the body of the response
*/
exports.signin = (req,res) => {
const {email,password } = req.body;
const hashedPassword = hashPassword(password);
User.signin(email.trim(),hashedPassword,(err,data) => {
if(err){
if(err.kind==='not_found'){
res.status(404).send({
status: "error",
error: "Couldn't signin user with "+`${email} `+ "and password: " + hashedPassword + " due to mismatched credentials"
});

return;

}else{ res.status(500).send({
status:"Internal Server Error",
error: err.message
});
}

}else if(res){
if (comparePassword(password.trim(), data.password)){
logger.info(`User successfully identified and authenticated!`);
const token = generateToken(res.id);
//sending status to the frontend
//setting the token in the authorization header
data.jwt = token;
res.setHeader('x-access-token',token);
res.status(200).send(data);
}else{
  res.status(400).send({status:'error',error:'User cannot be authenticated'});
}
}
})
}


// Update a User identified by the id in the request
exports.updatepassword = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      status: "error",
      error: "Content can not be empty!"
    });
  }

  const {password} = req.body;
  const hashedPassword = hashPassword(password.trim());
  User.changepassword(Number(req.params.id),hashedPassword,(err, data)=>{

        if (err.kind === "not_found") {
          res.status(404).send({
            status: "error",
            error: `Not found User with id ${req.params.id}.`
          });
        }else{
          logger.info("User's password updated successfully!");
          res.status(200).send({status: "success",data});
      }
    }
  );

};


//this controller function fetches all users
exports.getAllUser = (req,res) => {

User.getAllUser((err,data)=>{

  if(err){
    res.status(404).send({
      status: 'error',
      error: 'No user found'
    })
  }else{
    //logger.info(JSON.stringify(data));
    res.status(200).send({status:'success',users: data});
  }
});
};


//this controller function fetches single user by user id
exports.getSingleUser = (req,res) => {

  if(!req.params.id){
    res.status(500).send({status:'error','error':`user Id cannot be empty`});
  }

  //getting the user id from the url parameter
  const id = req.params.id;

  User.getSingleUser(id,(err,data)=>{
    if(err){
      res.status(404).send({
        status:'error',
        error:'User not found'
      });
    }else{
      res.status(200).send({status:'success',user: data});
      return;
    }
  });

}

  //this controller function fetches single user by user id
exports.deleteuser = async (req,res) => {

  if(!req.params.id){
    res.status(500).send({status:'error','error':`user Id cannot be empty`});
  }

  //getting the user id from the url parameter
  const id = req.params.id;
  User.deleteUser(id,(err,data)=>{
    if(err){
      res.status(404).send({
        status:'error',
        error:'User not found'
      });
      return;
    }else{
      res.status(200).send({status:'success',user: data});
      return;
    }
  });

}

//this controller function modifies a single user
exports.modifySingleUser = (req,res) => {
  if(!req.body || !req.params.id){
    res.status(500).send({status:'error',error:`Request doesnt have body AND_OR parameter not supplied` }); return;
  }
const {first_name,last_name,user_role} = req.body;

//user id fetched from the url parameter
const id = req.params.id;
User.modifySingleUser(id,first_name,last_name,user_role,(err,data)=>{
if(err){
  res.status(500).send({status : 'error',error: err.message});
}
res.status(200).send({status:'success',data: data
})

});
}

