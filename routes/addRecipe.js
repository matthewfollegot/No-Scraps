const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.render('add_recipe');
    } catch(err) {
        res.send({message: "Failed to retrieve add recipe page", error: err});
    }
});

module.exports = router;