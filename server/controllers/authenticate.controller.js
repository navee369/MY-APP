import User from '../model/person.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from './../../configure/configure'

const signin = (req, res) => {
  User.findOne({
    "email": req.body.email
  }, (err, user) => {
    if (err || !user)
      return res.status('401').json({
        error: "Invalid User "
      })

    if (!user.authenticate(req.body.password)) {
      return res.status('401').send({
        error: "Email id and password dont match."
      })
    }

    const token = jwt.sign({
      _id: user._id
    }, config.jwtSecret)

    res.cookie("t", token, {
      expire: new Date() + 9999
    })

    return res.json({
      token,
      user: {_id: user._id, name: user.name, email: user.email}
    })
  })
}
// Sign out
const signout = (req, res) => {
  res.clearCookie("t")
  return res.status('200').json({
    message: "signed out"
  })
}


//signed in
const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth'
})

// authenticated
const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == 
  req.auth._id
  if (!(authorized)) {
    return res.status('403').json({
      error: "User is authorized"
    })
  }
  next()
}

export default { signin, signout, requireSignin, hasAuthorization }
