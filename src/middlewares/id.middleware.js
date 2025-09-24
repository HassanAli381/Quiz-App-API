const idParamHandler = (req, res, next, val) => {
      // hexa => 12byte => 24digit
    if (!/^[a-fA-F0-9]{24}$/.test(val)) {
        res.status(400).json({
            status: "fail",
            msg: "Invalid ID",
            data: { id: val }
        });
        return;
    } else {
        req.validId = val;
        next();
    }
}
module.exports = idParamHandler;

