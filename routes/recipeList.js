const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
       res.render('recipeList');
        // res.render('recipeList', {data:{userQuery:req.params.userQuery}});
    }
    catch(err) {
        res.send({message: "Failed tossssssssssssss retrive recipes based on inputted ingredients", error: err});
    }
});

module.exports = router;