const express               = require('express')
const app                   = express();
const morgan                = require('morgan')

const productRoutes         = require('./apis/routes/product')
const orderRoutes           = require('./apis/routes/order');
const bodyParser            = require('body-parser');
const mongoose              = require('mongoose');

mongoose.connect('mongodb+srv://akshit:'
    + process.env.Mongo_Atlas_PW +
    '@cluster0.8vs7o.mongodb.net/<dbname>?retryWrites=true&w=majority'
    ,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

app.use((req,res,next)=>{
    const error=new Error('not found');
    error.status=404;
    next(error);
})
app.use((error,req,res,next)=>{
    res,status(err.status||500);
    res.json({
        error:{
            message:error.message
        }
    });
});
module.exports =app;