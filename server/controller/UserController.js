const User = require('../model/User')
const { generateToken } = require('../helper/jwt')
const { comparePassword } = require('../helper/bcryptjs')

class UserController
{
    static test(req,res)
      {
          res.send('hello user connected')
      }


    static findAllUser(req,res,next)
      {
          User.find()
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


    static register(req,res,next)
      {
          const { username, email, password } = req.body

          User.create(
              { username, email, password }
          )
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }
    

    static logIn(req,res,next)
      {
          const { email, password } = req.body

          User.findOne({
              email
          })
          .then(result=>{
              
              if ( comparePassword(password, result.password) )
                {
                    const access_token = generateToken({ _id:result._id })
                    res.status(200).json({ username:result.username, access_token })
                }
              else
                {
                    next ({code:403, message:'email & password combination wrong'})
                }

          })
          .catch(err=>{
              next({code:404, message:'user not found'})
          })
      }


    static MASTER_DELETE_ALL(req,res,next)
      {
          User.remove()
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


}

module.exports = UserController