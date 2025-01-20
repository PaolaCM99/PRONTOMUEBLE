const express = require('express');
const router = express.Router();

router.get('/', function (req, res){
    res.send('Proveedores ok')
})

module.exports = router;