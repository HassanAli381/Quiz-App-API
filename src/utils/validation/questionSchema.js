const questionSchema = {
    type: "object",
    properties: {
        description: { type: "string", minLength: 1, maxLength: 255 },
        choices: {
        type: "array",
        items: { type: "string", minLength: 1 },
        minItems: 4,
        maxItems: 4,
        uniqueItems: true,
        },
        correctChoice: { type: "string", minLength: 1 },
        difficulty: {
        type: "string",
        enum: ["easy", "medium", "hard"],
        default: "easy",
        },
        categoryId: {
        type: "string",
        pattern: "^[0-9a-fA-F]{24}$", // MongoDB ObjectId
        },
    },
    required: ["description", "choices", "correctChoice", "categoryId"],
    additionalProperties: false,
};

module.exports = questionSchema;
