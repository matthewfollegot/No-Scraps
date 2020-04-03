const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
       res.render('recipe_list');
    }
    catch(err) {
        res.send({message: "Failed to retrive recipe page", error: err});
    }
});

module.exports = router;