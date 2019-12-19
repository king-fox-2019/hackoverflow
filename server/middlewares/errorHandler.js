const errorHandler = (err, req, res, next) => {
    let errMsg = err.errmsg;

    // console.log(err);

    if (err.name === "CastError") {
        res.status(400).json({error: err.message});
    } else if (err.name === "ValidationError"){
        res.status(400).json({error: err.message});
    } else if (err.code === 11000){

        if (/duplicate key/.test(errMsg)){
            errMsg = "Email already registered"
        }

        res.status(400).json({error: errMsg});
    } else {
        res.status(err.code).json({error: errMsg});
    }

};

module.exports = errorHandler;