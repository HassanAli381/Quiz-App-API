// swagger.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cateogories = require("./src/routes/category.router")
const questions = require("./src/routes/question.router")
const users = require("./src/routes/user.routes")
const exams = require("./src/routes/exam.router")
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
        url: `https://quiz-app-api-lac.vercel.app/`,
        url: "http://localhost:5050/api",
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
        User: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            id: {
              type: "string",
              description: "Auto-generated ID",
              example: "6512bd43d9caa6e02c990b0a",
            },
            name: {
              type: "string",
              description: "User's full name",
              maxLength: 30,
              example: "Omar Wael",
            },
            email: {
              type: "string",
              description: "User's email (must be unique)",
              example: "omar@example.com",
            },
            password: {
              type: "string",
              description: "Hashed password (not returned in responses)",
              example: "hashedpassword123",
            },
            authenticatedByGoogle: {
              type: "boolean",
              description: "Whether the user logged in with Google",
              example: false,
            },
            lastLogin: {
              type: "string",
              format: "date-time",
              description: "Last login timestamp",
              example: "2025-09-27T14:48:00.000Z",
            },
            role: {
              type: "string",
              enum: ["user", "admin"],
              description: "User role",
              example: "user",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
              example: "2025-09-01T10:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
              example: "2025-09-15T12:00:00.000Z",
            },
          },
        },
        Exam: {
            type: "object",
            required: ["difficulty", "numberOfQuestions", "categoryId", "userId"],
            properties: {
                id: {
                type: "string",
                description: "Auto-generated exam ID",
                example: "6512bd43d9caa6e02c990b0a",
                },
                difficulty: {
                type: "string",
                enum: ["easy", "medium", "hard"],
                description: "Exam difficulty level",
                example: "medium",
                },
                numberOfQuestions: {
                type: "integer",
                description: "Number of questions in the exam",
                example: 10,
                },
                time: {
                type: "integer",
                description: "Time allowed for the exam in milliseconds",
                example: 600000,
                },
                grade: {
                type: "integer",
                description: "Exam grade (calculated after completion)",
                example: 8,
                },
                categoryId: {
                type: "string",
                description: "Reference to Category ID",
                example: "68d3060eb13f6d8de8f8067b",
                },
                userId: {
                type: "string",
                description: "Reference to User ID",
                example: "77e5c60eb13f6d8de8f12345",
                },
                isGraded: {
                type: "boolean",
                description: "Whether the exam has been graded",
                example: false,
                },
                createdAt: {
                type: "string",
                format: "date-time",
                description: "Creation timestamp",
                example: "2025-09-01T10:00:00.000Z",
                },
                updatedAt: {
                type: "string",
                format: "date-time",
                description: "Last update timestamp",
                example: "2025-09-15T12:00:00.000Z",
                },
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
