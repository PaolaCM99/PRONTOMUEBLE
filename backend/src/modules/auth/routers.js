const express = require('express');
const router = express.Router();
const response = require('../../response/response')
const controller = require('./controller')


router.post('/', async function (req, res) {
    const items = await controller.authUser(req.body);
    response.success(req, res, items, 200)
})

module.exports = router;