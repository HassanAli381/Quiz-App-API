const AJV = require("ajv")

const categorySchema = {
    type: "object",
    properties: {
        name: { type: "string", minLength: 1, maxLength: 30 },
        description: { type: "string", minLength: 1 },
        rating: { type: "number", minimum: 1, maximum: 5 },
        popularity: { type: "integer", minimum: 0 },
    },
    required: ["name", "description"],
    additionalProperties: false,
};

module.exports = categorySchema;