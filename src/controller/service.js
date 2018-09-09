import mongoose  from "mongoose";
import { Router } from "express";
import bodyPaser from "body-parser";
import Service from "../model/service";
import Photo from "../model/photo";
import Review from "../model/review";
import Category from "../model/category";
import {authenticate}  from '../middleware/authMiddleware';



export default ({config, db}) => {
    let api = Router();



    //add v1 routers
    api.post('/add/:id', (req,res) => {

      Category.findById(req.params.id, (err, category) => {
          if (err){
            res.send(err);
          }
       let newService = new Service();
       newService.category = category._id;
       newService.name = req.body.name;
       newService.price =  req.body.price;
       newService.address  = req.body.address;
       newService.latitude  = req.body.latitude;
       newService.longitude  = req.body.longitude;
       newService.email_address  = req.body.email_address;
       newService.phone  = req.body.phone;
       newService.service_description  = req.body.service_description;
       newService.image_uri  = req.body.image_uri;
       newService.available_time  = req.body.available_time;
       newService.type = req.body.type;
       newService.save(err => {
          if (err){
            res.send(err);
          }
          res.json({message: 'service successfully saved'});
       });
    });
  });

  api.post('/category/add', (req,res) => {
    console.log("here sucker");
     let newCategory = new Category();
     newCategory.name = req.body.name;
     newCategory.image_uri  = req.body.image_uri;
     newCategory.save(err => {
        if (err){
          res.send(err);
        }
        res.json({message: 'category successfully saved'});
     });
});


//get all category
    api.get('/category', (req,res) => {
        Category.find({}, (err, category) => {
          if (err){
            res.send(err);
          }
          res.json(category);
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

     //get all by category id
      api.get('/byCategoryId/:id', (req,res) => {
      Service.find({ 'category': req.params.id })
          .exec((err, service) => {
            if (err) {
              res.status(500).json({ message: err });
            }
            res.status(200).json(service);
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
      newReview.username  = req.body.username;
      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReview.service  = service._id;
      newReview.rattings =  req.body.rattings;
      newReview.time_stamp = Date.now().toString();
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


  //add photo for a specific category id
  api.post('/category/photo/add/:id', (req,res) => {
    Category.findById(req.params.id, (err, category) => {
        if (err){
          res.send(err);
        }
        let newPhoto = new Photo();
        newPhoto.image_uri = req.body.image_uri;
        newPhoto.category  = category._id;
      newPhoto.save(err => {
            if (err){
              res.send(err);
            }
            category.photos.push(newPhoto);
            category.save(err => {
                if (err){
                  res.send(err);
                }
                res.json({message: 'category photo saved'});
            });
        });
  });

  });



  //add photo for a specific service id
  api.post('/photo/add/:id', (req,res) => {
    Service.findById(req.params.id, (err, service) => {
        if (err){
          res.send(err);
        }
        let newPhoto = new Photo();
        newPhoto.image_uri = req.body.image_uri;
        newPhoto.service  = service._id;
      newPhoto.save(err => {
            if (err){
              res.send(err);
            }
            service.photos.push(newPhoto);
            service.save(err => {
                if (err){
                  res.send(err);
                }
                res.json({message: 'service photo saved'});
            });
        });
  });

  });



  //get  photos by service id
    api.get('/photos/:id',  (req, res) => {
       Photo.find({service:  req.params.id}, (err, photos) => {
         if (err){
           res.send(err);
         }
         res.json(photos);
       });
    });


    return api;
}
