module.exports = (err,req,res,next)=>{
    console.log(`
    ERROR HAPPENED - LOG FROM ERROR HANDLER
    =======================================
    `);

    console.log(err);
    
    let code = null
    let message = null


    switch (err.name) {
        case 'validationError':
            code= 400
            message= err.message
            break;
    
        case 'MongoError':
            code= 406

            if(err.code === 11000)
               {
                const key = Object.keys(err.keyPattern)
                message = `${key} has already been used`
               }
            else
              {
                message = errmsg
              }
            break

        default:
            code= err.code || 500
            message= err.message || 'INTERNAL SERVER ERROR'
            break;
    }


    res.status(code).json({ code, message })
}