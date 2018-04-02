import mongoose  from "mongoose";
import { Router } from "express";
import Service from "../model/service"
import bodyPaser from "body-parser";
import Review  from "../model/review";

import {authenticate}  from '../middleware/authMiddleware';



export default ({config, db}) => {
    let api = Router();


    //add v1 routers
    api.post('/add', (req,res) => {
       let newService = new Service();
       newService.name = req.body.name;
       newService.price =  req.body.price;
       newService.address  = req.body.address;
       newService.latitude  = req.body.latitude;
       newService.email_address  = req.body.email_address;
       newService.phone  = req.body.phone;
       newService.service_description  = req.body.service_description;
       newService.image_uri  = req.body.image_uri;
       newService.available_time  = req.body.available_time;
       newService.save(err => {
          if (err){
            res.send(err);
          }
          res.json({message: 'service successfully saved'});
       });
    });


//get all services
    api.get('/', (req,res) => {
        Service.find({}, (err, services) => {
          if (err){
            res.send(err);
          }
          res.json(services);
        });

      });


      //read one service
  api.get('/:id', (req,res) => {
    Service.findById(req.params.id, (err, service) => {
      if (err){
        res.send(err);
      }
      res.json(service);
    });

  });


// update service
  api.put('/:id', (req,res) => {
  Service.findById(req.params.id, (err, service) => {
    if (err){
      res.send(err);
    }
    service.name = req.body.name;
    service.price =  req.body.price;
    service.address  = req.body.address;
    service.latitude  = req.body.latitude;
    service.email_address  = req.body.email_address;
    service.phone  = req.body.phone;
    service.service_description  = req.body.service_description;
    service.image_uri  = req.body.image_uri;
    service.available_time  = req.body.available_time;
    service.save(err => {
        if (err){
          res.send(err);
        }
        res.json({message: ' service successfully updated'});
     });
  });

});


//delete
api.delete('/:id', (req,res) => {
  Service.remove({
     _id: req.params.id
  },(err, service) => {
      if (err){
        res.send(err);
      }
    res.json({message: 'service successfully deleted'});
  });
});

//add review for a specific service id

api.post('/reviews/add/:id', (req,res) => {
  Service.findById(req.params.id, (err, service) => {
      if (err){
        res.send(err);
      }
      let newReview = new Review();
      newReview.title  = req.body.title;
      newReview.text = req.body.text;
      newReview.service  = service._id;
      newReview.rattings =  req.body.rattings;
      newReview.save(err => {
          if (err){
            res.send(err);
          }
          service.reviews.push(newReview);
          service.save(err => {
              if (err){
                res.send(err);
              }
              res.json({message: 'service review saved'});
          });
      });
});

});


//get  reviews by service id
  api.get('/reviews/:id',  (req, res) => {
     Review.find({service:  req.params.id}, (err, reviews) => {
       if (err){
         res.send(err);
       }
       res.json(reviews);
     });
  });



    return api;
}
