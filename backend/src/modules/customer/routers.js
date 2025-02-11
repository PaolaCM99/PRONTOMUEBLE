const express = require('express');
const router = express.Router();
const response = require('../../response/response');
const controller = require('./controller');

router.get('/', async function (req, res) {
    try {
        const items = await controller.getAll();
        response.success(req, res, items, 200);
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        response.error(req, res, error, 500);
    }
});

router.get('/:id', async function (req, res) {
    try {
        const items = await controller.getById(req.params.id);
        response.success(req, res, items, 200);
    } catch (error) {
        console.error("Error al obtener cliente por ID:", error);
        response.error(req, res, error, 500);
    }
});

router.post('/', async function (req, res) {
    try {
        console.log("Datos recibidos para creación:", req.body);
        if (!req.body.documento) {
            throw new Error("El campo 'documento' es obligatorio.");
        }
        const items = await controller.setCustomer(req.body);
        response.success(req, res, items, 201);
    } catch (error) {
        console.error("Error al crear cliente:", error);
        response.error(req, res, error, 500);
    }
});

router.put('/:id', async function (req, res) {
    try {
        console.log("Datos recibidos para actualización:", req.body);
        if (!req.params.id) {
            throw new Error("El campo 'documento' es obligatorio para actualizar.");
        }
        const updatedItem = await controller.updateCustomer(req.body);
        response.success(req, res, updatedItem, 200);
    } catch (error) {
        console.error("Error al actualizar cliente:", error);
        response.error(req, res, error, 500);
    }
});

router.delete('/:id', async function (req, res) {
    try {
        console.log("Eliminando cliente con documento:", req.params.id);
        if (!req.params.id) {
            throw new Error("El campo 'documento' es obligatorio para eliminar.");
        }
        const result = await controller.remove({ documento: req.params.id });
        response.success(req, res, result, 200);
    } catch (error) {
        console.error("Error al eliminar cliente:", error);
        response.error(req, res, error, 500);
    }
});

module.exports = router;
