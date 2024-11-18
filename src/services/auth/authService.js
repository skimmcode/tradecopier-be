const {connection,query} = require("../../config/dbConfig");
const logger = require("../../utility/logger");
const comparePassword = require("../../utility/password");
const bcrypt = require('bcryptjs');
require("dotenv").config();


// constructor
class User{
  constructor(username,first_name,last_name,email,password,user_role,is_admin) {
    this.first_name =   first_name;
    this.last_name =    last_name;
    this.username =     username;
    this.email =        email;
    this.is_admin =     is_admin;
    this.user_role = user_role;
    this.password =     password;
}


//creating new user
static create(newUser,cb){
  try{
  connection.query(`INSERT INTO ${process.env.NODE_ENV}.users (username,first_name,last_name,email,password,user_role,active,created_at) VALUES(?,?,?,?,?,?,?,?)`, [
    newUser.username,newUser.first_name,newUser.last_name,newUser.email,newUser.password,newUser.user_role,true,date], (err, res) => {
            if (err) {
                cb(err, null);
                return;
            }
            cb(null, {
                id: res.insertId,
                firstname: newUser.first_name,
                lastname: newUser.last_name,
                email: newUser.email
            });
    });
  }catch(error){
    logger.info(`Error: ${error}`);
}
};
  
  

/*
  *Authenticating a user to signup the user in - Signin a user
  */
static signin(email,password,cb) {
try{
connection.query(`SELECT * FROM ${process.env.NODE_ENV}.users WHERE email = ? AND active = ?`, [email,true], (err, res) => {
            if (err) {
              cb(err, null);
                return;
            }
            
            if(res.length>0){
                cb(null, res[0]);
                return;
            }
          
            cb({ kind: "not_found" }, null);
            
        })
      }catch(error){
        logger.info(`Error: ${error}`);
    }
}
    

/*
*User can update password
*/
static changepassword(id,password,cb){
try{
connection.query(`UPDATE ${process.env.NODE_ENV}.users SET password = ? WHERE id = ?`, [password,id], (err,res)=>{
if(err){
cb(err,null); return;
}
if(res.length){
cb(null,res[0]);
return;
}
cb({kind: "user not found"}, null);

});
//end of changepassword function
}catch(error){
  logger.info(`Error: ${error}`);
}
}


//this function fetches all errors
static getAllUser(result){
 try{
  connection.query(`SELECT *FROM ${process.env.NODE_ENV}.users`,(err,res)=>{
    if(err){
      result(null,err); 
      return;
    }

    if(res.rows.length>0){
      result(null,res.rows);
      return;
    }
  });
}catch(error){
  logger.info(`Error: ${error}`);
}
}

//this static function fetches a single user 
static getSingleUser(id,result){
try{
  connection.query(`SELECT * FROM ${process.env.NODE_ENV}.users WHERE id = ?`,[id],(err,res)=>{
    if(err){
      result(null,err);return;
    }
    
    if(res.rows.length > 0){
      result(null,res.rows); return;
    }
  });
}catch(error){
  logger.info(`Error: ${error}`);
}
}


//this modifies single user
//email, and username fields are not changeable by default
static modifySingleUser(id,first,last,usrole,result){
try{
connection.query(`UPDATE ${process.env.NODE_ENV}.users SET first_name = ?, last_name = ?, user_role = ?, updated_at = ? WHERE id = ?`,[
first,
last,
usrole,
date,
id
],(err,res)=>{
  if(err){
    result(null,err);
  }
  result(null,res);

});
}catch(error){
  logger.info(`Error: ${error}`);
}
}

//this function deletes a user
static deleteUser(id,cb){
 try{
  connection.query(`DELETE FROM ${process.env.NODE_ENV}.users WHERE id = ?`, [id], (err, res) => {
    if (err) {
      cb(err, null);
        return;
    }
    
    if(res.rows.length>0){
        cb(null, res.rows[0]);
        return;
    }
    cb({ kind: "not_found" }, null);
    });
    }catch(error){
      logger.info(`Error: ${error}`);
    }
  }
}

//exporting the User service
module.exports = User;