import  express  from 'express';
import  config   from '../config';
import  middleware  from  '../middleware';
import  initializeDb from '../db';
import  service  from '../controller/service';
import  account  from '../controller/account';
import  server  from '../controller/server';
import  profile    from '../controller/profile';
import  promotions from '../controller/promotions';
import bodyPaser from "body-parser";



let router = express();


//connect  to db
 initializeDb(db => {
    //initialize middleware
     router.use(middleware({config, db}));


    //api routes v1 (/v1)
    router.use('/profile', profile({config, db}));
    router.use('/service', service({config, db}));
    router.use('/account', account({config, db}));
    router.use('/server',  server({config, db}));
    router.use('/promotions', promotions({config, db}));


     //comment

 });

export default router;
