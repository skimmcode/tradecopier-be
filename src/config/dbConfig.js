const mysql = require("mysql");
require('dotenv').config();
const logger = require("../utility/logger");


//IMPORTING THE mysql module into the app
const {DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = process.env;
const connection = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASS,
  port: DB_PORT,
});

connection.on('connect', () => {
    logger.info('Connected to the CopyFactory Services');
  });
  

  //if error pops up during the connection
connection.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
  });
  
//async function for calling SQL queries
async function query(sqlQuery, params) {
    try {
      const start = Date.now();
      const result = await connection.query(sqlQuery, params);
      const period = Date.now - start;
      logger.info("dbConfig: query() Query Executed successfully", sqlQuery, {
        period,
        rows: result.rowCount,
      });
  
      //return response to the call
      return result;
    } catch (error) {
      logger.error(`dbConfig: query() Error Executing Query:: ${error.stack}`);
  
      throw error;
    }
  }

  
  module.exports = {connection,query};