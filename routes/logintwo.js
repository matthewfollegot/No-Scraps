const express = require('express');

const router = express.Router();

router.get('/logintwo', (req, res) => {
    // try{
        res.render('hello');
    // }
    

    // catch (err){
        res.send({message: "Failed tossssssssssssss retrive recipes based on inputted ingredients", error: err});
    // }
});
// });



module.exports = router;