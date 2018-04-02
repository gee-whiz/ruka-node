import  express  from 'express';
import  config   from '../config';
import  middleware  from  '../middleware';
import  initializeDb from '../db';
import  service  from '../controller/service';
import  account  from '../controller/account';
import  server  from '../controller/server';
import bodyPaser from "body-parser";
let router = express();


//connect  to db
 initializeDb(db => {
    //initialize middleware
     router.use(middleware({config, db}));


    //api routes v1 (/v1)
    router.use('/service', service({config, db}));
    router.use('/account', account({config, db}));
    router.use('/server',  server({config, db}));

     //comment

 });

export default router;
