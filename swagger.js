// swagger.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const PORT = process.env.PORT || 5050;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
        title: "Quiz App API",
        version: "1.0.0",
        description: "API documentation for Quiz-App",
        },
        servers: [
        {
            url: `http://localhost:${PORT}`,
        },
        ],
        components: {
        schemas: {
            Category: {
            type: "object",
            properties: {
                name: { type: "string", example: "Back-end development" },
                description: { type: "string" },
                rating: { type: "number", example: 4.9 },
                popularity: { type: "integer", example: 12500 },
            },
            },
            Question: {
            type: "object",
            properties: {
                description: { type: "string" },
                choices: {
                type: "array",
                items: { type: "string" },
                minItems: 4,
                maxItems: 4,
                },
                correctChoice: { type: "string" },
                difficulty: { type: "string", enum: ["easy", "medium", "hard"] },
                categoryId: { type: "string", example: "68d3060eb13f6d8de8f8067b" },
            },
            },
        },
        },
    },
    // where swagger-jsdoc looks for JSDoc comments
    apis: ["./src/routes/*.js"],
    };

const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerSpec };
