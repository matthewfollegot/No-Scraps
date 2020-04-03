const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.render('homepage');  
    }
    catch(err) {
        res.send({message: "Failed to retrieve login page", error: err});
    }
});

module.exports = router;