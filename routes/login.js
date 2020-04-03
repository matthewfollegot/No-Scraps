const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if(req.email) {
        console.log("email: " + email)
    }
    
    try {
        res.render('login');
        
    }
    catch(err) {
        res.send({message: "Failed tossssssssssssss retrive recipes based on inputted ingredients", error: err});
    }
});

module.exports = router;