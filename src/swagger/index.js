import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

// Swagger options
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "SBTi Target Services API Documentation",
      version: "1.0.0",
      description:
        "Documentation for SBTi target Services application to manage the RESTAPIs for backend server.",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api/`,
      },
    ],
  },
  apis: ["./routes/**/*.js"], // Path to the API routes files
};

// Initialize swagger-jsdoc
const specs = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  // Serve swagger Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });
}

export default swaggerDocs;
