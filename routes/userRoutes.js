const express = require('express');
const router = express.Router();
const { signupSchema, loginSchema } = require('../validators/userValidators.js');
const {register,login}=require('../controller/userController.js');
const authenticateToken = require('../middlewares/authMiddleware.js');

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.message});
    }
    next();
};

router.post('/register', validate(signupSchema),authenticateToken, async (req, res, next) => {
    try {
        await register(req, res, next);
    } catch (error) {
        return res.status(400).json({ error:error.message });
    }

});

router.post('/login',validate(loginSchema),async (req,res,next)=>{
    try{
         await login(req,res,next);
     }
    catch(error){
        return res.status(400).json({error:error.message})
    }
})
// router.post('/product',async(req,res,next)=>{
//     try{
//         await createProduct(req,res,next);
//     }
//     catch(error){
//         return res.status(400).json({error:error.message})
//     }
// })
module.exports=router;