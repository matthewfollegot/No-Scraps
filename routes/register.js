const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.render('register');
    }
    catch(err) {
        res.send({message: "Failure", error: err});
    }
});

module.exports = router;
