import mongoose  from "mongoose";
import { Router } from "express";
import User from "../model/user"
import bodyPaser from "body-parser";
import Review  from "../model/review";

import {authenticate}  from '../middleware/authMiddleware';



export default ({config, db}) => {
    let api = Router();


    //add v1 routers
    api.post('/add',authenticate, (req,res) => {
       let newUser = new User();

        newUser.email = req.body.email;
        newUser.first_name = req.body.first_name;
        newUser.last_name  = req.body.last_name;
        newUser.about = req.body.about;
        newUser.phone = req.body.phone;
        newUser.verified  = req.body.verified;
        newUser.profile_image_uri = req.body.profile_image_uri;

      newUser.save(err => {
          if (err){
            res.status(500).json({ message: err });
          }
            res.status(200).json({message: 'successfully  created new account'});

    });
  });


  // 'v1/user/byEmail/:email'
  api.get('/byEmail/:email', authenticate, (req, res) => {

    User.findOne({ 'email': req.params.email })
      .exec((err, userData) => {
        if (err) {
          res.status(500).json({ message: err });
        }
        res.status(200).json(userData);
      });
  });

// update profile
  api.put('/:id', (req,res) => {

    console.log(req.params.id);
    User.findById(req.params.id, (err, user) => {
      if (err) {
        res.status(500).json({ message: err });
      }
    user.first_name = req.body.first_name;
    user.last_name  = req.body.last_name;
    user.about = req.body.about;
    user.phone = req.body.phone;
    user.verified  = req.body.verified;
    user.profile_image_uri = req.body.profile_image_uri;

    user.save(err => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json({ message: 'Profile successfully updated' });
    });
  });
});


// '/vq/user/:id' -Delete
api.delete('/:id', authenticate, (req, res) => {
  User.remove({
    _id: req.params.id
  }, (err, user) => {
    if (err) {
      res.status(500).json({ message: err });
    }
    res.status(200).json({ message: 'User Successfully Removed'});
  });
});

// '/v1/user/' - Delete all
api.delete('/', authenticate, (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).json({ message: err });
    }
    res.status(200).json({ message: 'Users All Removed'});
  });
});

    return api;
}
