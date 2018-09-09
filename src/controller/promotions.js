import mongoose  from "mongoose";
import { Router } from "express";
import bodyPaser from "body-parser";
import Service from "../model/service";
import Photo from "../model/photo";
import Review from "../model/review";
import Promotions from "../model/promotions";

import {authenticate}  from '../middleware/authMiddleware';



export default ({config, db}) => {
    let api = Router();

  api.post('/add', (req,res) => {
     let newPromotion = new Promotions();
     newPromotion.name = req.body.name;
     newPromotion.email_address = req.body.email_address;
     newPromotion.budget = req.body.budget;
     newPromotion.owner = req.body.owner;
     newPromotion.type = req.body.type;
     newPromotion.link  = req.body.link;
     newPromotion.start_date = req.body.start_date;
     newPromotion.end_date  = req.body.end_date;
     newPromotion.order = req.body.order;
     newPromotion.image_uri  = req.body.image_uri;

     newPromotion.save(err => {
        if (err){
          res.send(err);
        }
        res.json({message: 'Promotion successfully saved'});
     });
});



//get all promotions
    api.get('/', (req,res) => {
        Promotions.find({}, (err, promotions) => {
          if (err){
            res.send(err);
          }
          res.json(promotions);
        });

      });

      //read one promotions
  api.get('/:id', (req,res) => {
    Promotions.findById(req.params.id, (err, promotions) => {
      if (err){
        res.send(err);
      }
      res.json(promotions);
    });

  });


// update service
  api.put('/:id', (req,res) => {
  Promotions.findById(req.params.id, (err, promotion) => {
    if (err){
      res.send(err);
    }
    promotion.name = req.body.name;
    promotion.email_address = req.body.email_address;
    promotion.budget = req.body.budget;
    promotion.owner = req.body.owner;
    promotion.type = req.body.type;
    promotion.link  = req.body.link;
    promotion.start_date = req.body.start_date;
    promotion.end_date  = req.body.end_date;
    promotion.order = req.body.order;
    promotion.image_uri  = req.body.image_uri;

    promotion.save(err => {
        if (err){
          res.send(err);
        }
        res.json({message: 'promotions successfully updated'});
     });
  });

});


//delete
api.delete('/:id', (req,res) => {
  Promotions.remove({
     _id: req.params.id
  },(err, service) => {
      if (err){
        res.send(err);
      }
    res.json({message: 'promotions successfully deleted'});
  });
});



    return api;
}
