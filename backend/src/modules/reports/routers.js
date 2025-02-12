const express = require('express');
const router = express.Router();
const response = require('../../response/response');
const controller = require('./controller');

router.post('/vendedor', async function (req, res) {
    try {
        if (!req.body.mes) {
            throw new Error("El campo 'mes' es obligatorio.");
        }
        const items = await controller.getSeller(req.body);
        response.success(req, res, items, 201);
    } catch (error) {
        console.error("Error al consultar el mayor vendedor del mes:", error);
        response.error(req, res, error, 500);
    }
});

module.exports = router;
