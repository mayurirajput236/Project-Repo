const express = require('express');
const router = express.Router();
const {createUser,updateUser,deleteUser, fetchAllUser}=require('../controller/createUserController.js');
const authenticateToken = require('../middlewares/authMiddleware.js');



router.post('/create',authenticateToken,async(req,res,next)=>{
     console.log("authenticate successfully");
        try{
            await createUser(req,res,next);
        }
         catch(error){
                return res.status(400).json({error:error.message})
                }
    })

router.put('/update/:id',authenticateToken,async(req,res,next)=>{
    console.log("authenticate successfully");
    try{
        await updateUser(req,res,next);
    }
     catch(error){
            return res.status(400).json({error:error.message})
            }
})

router.delete('/delete/:id',authenticateToken,async(req,res,next)=>{
    console.log("authenticate successfully");
    try{
        await deleteUser(req,res,next);
    }
     catch(error){
            return res.status(400).json({error:error.message})
            }
})
router.get('/fetchAll',authenticateToken,async(req,res,next)=>{
    console.log("authenticate successfully");
    try{
        await fetchAllUser(req,res,next);
    }
     catch(error){
            return res.status(400).json({error:error.message})
            }
})
    module.exports=router;