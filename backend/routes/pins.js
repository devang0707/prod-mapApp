const router = require("express").Router(); 
const Pin = require ("../models/Pin"); 

router.post("/",async(req,res)=>{ 
    
    const newPin =  new Pin(req.body); 
    try {  
        const savedPin = await newPin.save(); 
        res.status(200).json(savedPin);  
    }
    catch{ 
        res.status(500).json(err); 
    }
});

//get all pins 
router.get("/",async(req,res)=>{

    try{  
        const pins =await Pin.find(); 
        res.status(200).json(pins); 
    }
    catch(err){
        res.status(500).json(err);
    }
});

//delete pin
router.delete('/:id',async(req,res)=>{
    const id = req.params.id     
    try{
        const pins = await Pin.findByIdAndRemove(id) 
        res.status(200).json(pins)
    }
    catch(err){
        console.log(err)
    }
})


module.exports = router;