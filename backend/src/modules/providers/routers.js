const express = require('express');
const router = express.Router();
const response = require('../../response/response')

router.get('/', function (req, res){
    response.success(req, res, 'Todo ok', 200)
})

module.exports = router;