const AJV = require("ajv");
const ajv = new AJV();
ajvValidation = (schema) => {
    return (req, res, nxt) => {
        const valid = ajv.validate(schema, req.body);
        if (!valid)
            return res.status(400).json({
                Status: "Fail",
                msg: "Invalid data",
                data: ajv.errors
            })
        nxt();
    };
};
module.exports = ajvValidation;