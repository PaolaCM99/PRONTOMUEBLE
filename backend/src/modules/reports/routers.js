const express = require('express');
const router = express.Router();
const response = require('../../response/response');
const controller = require('./controller');

router.get('/clientes', async function (req, res) {
    try {
        const items = await controller.getBestClients();
        response.success(req, res, items, 200);
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        response.error(req, res, error, 500);
    }
});

router.get('/muebles', async function (req, res) {
    try {
        const items = await controller.getMostSoldFurniture();
        response.success(req, res, items, 200);
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        response.error(req, res, error, 500);
    }
});

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

router.post('/clientes_nuevos', async function (req, res) {
    try {
        if (!req.body.mes) {
            throw new Error("El campo 'mes' es obligatorio.");
        }
        const items = await controller.getNewClients(req.body);
        response.success(req, res, items, 201);
    } catch (error) {
        console.error("Error al consultar el mayor vendedor del mes:", error);
        response.error(req, res, error, 500);
    }
});

module.exports = router;
