const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
router.get('/', (req, res) => {
    try {
        res.sendFile(path.join(process.cwd() + '/views/index.html'));
    }
    catch(err) {
        res.send({message: "Failed  html index tossssssssssssss retrive recipes based on inputted ingredients", error: err});
    }
});

module.exports = router;