const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        console.log(req.query.email);
        res.render('recipe_list', {email: req.query.email});
    }
    catch(err) {
        res.send({message: "Failed to retrive recipe page", error: err});
    }
});

module.exports = router;