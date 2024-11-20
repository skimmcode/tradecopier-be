const mysql = require("mysql2/promise");
require('dotenv').config();
const logger = require("../utility/logger");


//IMPORTING THE mysql module into the app
const {DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = process.env;
const dbConfig = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
  };

  //creating the connection here
  const connection = async () => {
    try {
          return await mysql.createConnection(dbConfig);
   }catch(e){
        logger.info(`Error in connecting to DB: ${e}`);
        process.exit(1); // Exit the application if the connection fails
        return;
    }
  }


//async function for calling SQL queries
async function query(sqlQuery, params) {
    try {
      const connection = await mysql.createConnection(dbConfig);
      const result = await connection.query(sqlQuery, params);
      
      logger.info(`dbConfig: query() Query Executed successfully, ${JSON.stringify(result)}`);
  
      //return response to the call
      return result;
    } catch (error) {
      logger.error(`dbConfig: query() Error Executing Query:: ${error.stack}`);
  
      throw error;
    }
  }



//initiliazing the date
const today = new Date();
const date = today.toISOString().split('T')[0];
module.exports = {query,date};