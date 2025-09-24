const mongoose = require("mongoose");
//Props => (name, desciption, rating, examsTakenNumber)
const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            trim: true,
            maxlength: [30, "Category musn't exceed 30 characters"],
            unique : true
        },
        description: {
            type: String,
            required: [true, "Category description is required"],
            trim: true,
        },
        // rating from 1 to 5 as star can be fraction like 4.8 star
        rating: {
            type: Number,
            default: 5,
            min: [1, "rating must be above 1"],
            max: [5, "rating must be below 5"],
        },
        // how many user uses this category
        popularity: {
            type: Number,
            default : 0
        },
    },
{
    timestamps: true,
}
);
module.exports = mongoose.model("Category", categorySchema);