const express = require('express');
const router = express.Router();
const {createProduct,updateProduct,deleteProduct, fetchAllProduct}=require('../controller/productController.js');
const authenticateToken = require('../middlewares/authMiddleware.js');



router.post('/create',authenticateToken,async(req,res,next)=>{
     console.log("authenticate successfully");
        try{
            await createProduct(req,res,next);
        }
         catch(error){
                return res.status(400).json({error:error.message})
                }
    })

router.put('/update/:id',authenticateToken,async(req,res,next)=>{
    console.log("authenticate successfully");
    try{
        await updateProduct(req,res,next);
    }
     catch(error){
            return res.status(400).json({error:error.message})
            }
})

router.delete('/delete/:id',authenticateToken,async(req,res,next)=>{
    console.log("authenticate successfully");
    try{
        await deleteProduct(req,res,next);
    }
     catch(error){
            return res.status(400).json({error:error.message})
            }
})
router.get('/fetchAll',authenticateToken,async(req,res,next)=>{
    console.log("authenticate successfully");
    try{
        await fetchAllProduct(req,res,next);
    }
     catch(error){
            return res.status(400).json({error:error.message})
            }
})
    module.exports=router;