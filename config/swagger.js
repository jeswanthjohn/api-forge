import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Forge - Products REST API",
      version: "1.0.0",
      description:
        "Interactive API documentation for the production-ready Products REST API.",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
      {
        url: "https://rest-api-jeswanth.onrender.com",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            name: {
              type: "string",
            },
            price: {
              type: "number",
            },
            category: {
              type: "string",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;