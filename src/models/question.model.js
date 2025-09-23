const mongoose = require("mongoose");
//Props => (description, choises[array of 4], difficulty, categoryId)
const questionSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: [true, "Question description is required"],
            trim: true,
            unique : true
        },
        // array of 4 string
        choices:{
            type: [String],
            validate: {
                validator: (arr) => arr.length == 4,
                message : "A question must have exactly 4 chocies"
            }
        },
        correctChoice: {
            type: String,
            // from array choices
            validate: {
                validator: function (correct) {
                    return this.choices.includes(correct)
                },  
                message : "Correct choice must be one of the provided choices"
            },
            required : true
        },
        // easy medium hard only
        difficulty: {
            type: String,
            enum: [
                "easy",
                "medium",
                "hard"
            ],
            default: "easy"
        },
        // cat id
        categoryId: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
            required : true
        },
    },
{
    timestamps: true,
}
);
module.exports = mongoose.model("Question", questionSchema);