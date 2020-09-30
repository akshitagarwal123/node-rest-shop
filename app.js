const express               = require('express')
const app                   = express();
const morgan                = require('morgan')

const productRoutes         = require('./apis/routes/product')
const orderRoutes           = require('./apis/routes/order')

app.use(morgan('dev'));

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