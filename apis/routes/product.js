const express   =  require('express')
const router   =  express.Router();

router.get('/',(req,res,next) => {
        res.status(200).json({

            message: "handling GET requests to /products"
        });

});
router.post('/',(req,res,next) => {
    res.status(200).json({

        message: "handling GET requests to /products"
    });

});
router.patch('/',(req,res,next) => {
    res.status(200).json({

        message: "handling GET requests to /products"
    });

});
router.delete('/',(req,res,next) => {
    res.status(200).json({

        message: "handling GET requests to /products"
    });

});
router.get('/:productID',(req,res,next)=>{
    const id=req.params.productID;
    if(id=='special'){
        res.status(200).json({
            message: "you discovered the special id"
        })
    }
        else {
        res.status(200).json({
            message:"you passed an id"
        });
    }
    
});
module.exports =router;