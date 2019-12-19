module.exports = function(err, req, res, next){
    if(err.code == 11000){
        err.code = 403;
        err.msg = 'duplicate email'
    }
    let error = err.msg || err.message
    console.log(err)
    res.status(err.code).json({message : error})
}