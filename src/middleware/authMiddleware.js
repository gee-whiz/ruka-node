import  jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import mongoose  from "mongoose";

const  TOKENTIME  = 60*60*24*30; //30 DAYS
const SECRET = "hello world";

let authenticate  = expressJwt({secret: SECRET});

let generateAccessToken  = (req,res, next) => {
    req.token = req.token || {};
    req.token = jwt.sign({
        id: req.user.id,
      }, SECRET, {
         expiresIn: TOKENTIME
    });
    next();
}
//milld
let respond = (req, res) => {
  res.status(200).json({
    user: req.user.username,
    token: req.token
  });
}

module.exports = {
  authenticate,
  generateAccessToken,
  respond
}
