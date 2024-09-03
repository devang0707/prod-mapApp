const router = require("express").Router(); 
const User = require ("../models/User");
const bcrypt = require('bcrypt');



router.post("/register",async(req,res)=>{    
    
    try {  
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt); 
        
        const newUser = User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword, 
        })

        const saveUser = await newUser.save();   
        res.status(200).json({_id:saveUser._id, username:saveUser.username});  
    }
    catch(err){ 
        res.status(500).json(err); 
    }
}); 



router.post("/login",async(req,res)=>{     
    try{
        //find user
        const inputByUser = await User.findOne({username:req.body.username})   
        !inputByUser && res.status(/*400*/).json("User does not Exist");       
        
        //validate user 
        const validPassword = await bcrypt.compare(req.body.password,inputByUser.password);
        !validPassword && res.status(/*400*/).json("Wrong password for the User");

        //send res if everything is okay
        res.status(200).json({_id:inputByUser._id, username:inputByUser.username});

    }
    catch(err){
        res.status(500).json(err);
    }
});







module.exports = router;