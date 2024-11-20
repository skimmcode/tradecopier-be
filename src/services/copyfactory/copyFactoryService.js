const {connection,query} = require("../../config/dbConfig");
const logger = require("../../utility/logger"); //logger for logging issues in codebase
const axios = require("axios"); //fetching axios library for fetching data from external clients

class CopyFactoryService{

    constructor(){

    }

    static async pushTradeToDB(){



    }

    static async broadCastTradesToSlaves(trades, ...slaveAccounts){

    }

    static async fetchTradesFromMQ4(){


    }



}