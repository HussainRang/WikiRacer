const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const router = require('./Router/router.js');
const {error_handler} = require('./Error_Handler/error_handler.js')

app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

app.use('/api',router);
app.use('/api/*',(req,res,next)=>{next({status: 404, "message": 'Page Not Found'})});
app.use('/*',(req,res,next)=>{next({status: 404, "message": 'Page Not Found'})});
app.use(error_handler);

PORT_NUM = process.env.PORT || 2001;
app.listen(PORT_NUM,console.log(`Server has started at port ${PORT_NUM}`));