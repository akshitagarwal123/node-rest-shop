const express          =  require('express')
const router           =  express.Router();
const mongoose         =  require('mongoose')
const Product          =   require('./models/product.js');
router.get('/',(req,res,next) => {
        Product.find()
        .exec()
        .then(doc=>{
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        })

});
router.post('/',(req,res,next) => {
   const product = new Product({
       _id : new mongoose.Types.ObjectId(),
       name: req.body.name,
       price:req.body.price
   })
   product.save().then(result=>{
       console.log(result);
   })
   .catch(err => console.log(err));
    res.status(201).json({
        createProduct : product,
        message: "handling GET requests to /products"
    });

});
router.patch('/:productID',(req,res,next) => {
    const ID= req.params.productID
    const updateOps ={};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;
    }
    Product.update({_id:ID},{$set: updateOps })
    .exec()
    .then( result=>{
        res.status(200).json(result);
    }
    )
    .catch(err=>{
        res.status.json(err);
    })

});
router.delete('/',(req,res,next) => {
    res.status(200).json({

        message: "handling GET requests to /products"
    });

});
router.delete('/:productID',(req,res,next)=>{
    const id=req.params.productID;
   Product.remove({_id:id})
   .exec()
   .then(result=>{
        res.status(200).json(result);
   })
   .catch(err=>{
       res.status(500).json({
           error:err
       })
   });
    
});
module.exports =router;