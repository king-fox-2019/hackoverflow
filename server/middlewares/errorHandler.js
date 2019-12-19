const errorHandler = (err, req, res, next) => {
    let errMsg = err.errmsg;

    // console.log(err);

    if (err.name === "CastError") {
        res.status(400).json({error: err.message});
    } else if (err.name === "ValidationError"){
        res.status(400).json({error: err.message});
    } else if (err.code === 11000){

        console.log(errMsg)

        if (/duplicate key/.test(errMsg)){
            if (/email/.test(errMsg)) {
                errMsg = "Email already registered"
            } else if (/title/.test(errMsg)) {
                errMsg = "Title already registered"
            } else if (/description/.test(errMsg)) {
                errMsg = "Description already registered"
            } else {
                errMsg = "Internal server error pls contact the administrator"
            }
        }

        res.status(400).json({error: errMsg});
    } else {
        res.status(err.code).json({error: errMsg});
    }

};

module.exports = errorHandler;