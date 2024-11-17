//importing the apicache package
const apicache = require("apicache");

//retrieving the api middleware
const apiCacheMiddleware = apicache.middleware;

require("dotenv").config();

//defining and exporting the cache manager main function
const apiCacheManager = async (req,res) => {

    try{
        const authCode = process.env.CACHE_AUTH_CODE;
        if(req.params.auth_code && req.params.auth_code === authCode){
          //proceed...
          await apicache.clear('nocache');
          res.status(200).json({status:`success`,msg:`cache_cleared`});
          return;
        }else{
          res.status(422).json(`auth_code is missing/invalid`);
        }
        }catch(err){
          console.log(err);
          res.status(500).json(`Error occured: ${err.message}`);
          return;
        }

};

module.exports = {
    apiCacheManager, 
    apiCacheMiddleware
}