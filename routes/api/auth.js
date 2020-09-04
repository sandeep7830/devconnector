const express = require('express');
const router= express.Router();
const auth = require('../../middleware/auth');
const User = require('../../model/User');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const config = require('config');
const {check,validationResult} = require('express-validator');


router.get('/',auth,async (req,res)=>{
try {
    
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
} catch (error) {
 res.status(error);
}
});


router.post('/',[
check('email','please enter valid email').isEmail(),
check('password','eneter password').exists()
],async(req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
        }

        const{email,password}=req.body;
      try {
         let user=  await User.findOne({email});

        if (!user) {
            return res.status(400).json({errors:[{msg:'invalid password or email'}]});
            
        };

        const isMatch =await bcrypt.compare(password,user.password);
        
        if (!isMatch) {
            return res.status(400).json({errors:[{msg:'invalid password or email'}]});
            
        };
      

      const payload ={
          user:{
              id:user.id
          }
      };

      jwt.sign(
          payload,
        config.get('jwtSecret'),
        (err,token)=>{
            if (err) throw err;
            res.json({token});
        }
        )

      } catch (error) {
          console.log(error);
          res.status(500).send("error");
      }

 }
 );



module.exports=router;