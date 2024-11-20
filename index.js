const cors = require("cors");
const express = require("express");
require("dotenv").config();
const apicache = require("apicache"); //for implementing caching on all the routes
const morgan = require("morgan");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");

//creating an express framework app object
const app = express();

//middleware for caching requests 
const {apiCacheManager,apiCacheMiddleware} = require("./src/middlewares/cacheManager.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(apiCacheMiddleware('1 minute')); //adding a 2 minutes cache expiry
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


//adding the routing files to the main entry point
require("./src/routes/users.route.js")(app);

//set server to listen on port 5000
app.listen(process.env.PORT,()=>{
    console.log(`Backend API running on port 5000`);
})