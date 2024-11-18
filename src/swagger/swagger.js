const swaggerDocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

require('dotenv').config();

  const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "SBTi Services Website API",
        version: "0.1.0",
        description: "Documentation for SBTi target Services application to manage the RESTAPIs for backend server.",
        contact: {
          name: "SBTi Services",
          url: "https://sciencebasedtargerts.org",
          email: "sys-admin@sciencebasedtargets.org",
        },
      },
      servers: [
        {
        url: process.env.STAGING_URL
        },
      ],
    },
    apis: ['./src/routes/*/*.js'],
  };

const swaggerSpecs = swaggerDocs(options);


//exporting options
module.exports = {options,swaggerSpecs};
