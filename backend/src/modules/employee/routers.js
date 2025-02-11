const express = require('express');
const router = express.Router();
const response = require('../../response/response');
const controller = require('./controller');

router.get('/', async function (req, res) {
    try {
        const items = await controller.getAll();
        response.success(req, res, items, 200);
    } catch (error) {
        response.error(req, res, error, 500);
    }
});

router.get('/:id', async function (req, res) {
    try {
        const item = await controller.getById(req.params.id);
        response.success(req, res, item, 200);
    } catch (error) {
        response.error(req, res, error, 500);
    }
});

router.post('/', async function (req, res) {
    console.log("Datos recibidos en el backend:", req.body); // ✅ LOG
    try {
        if (!req.body.documento) {
            throw new Error("El campo 'documento' es obligatorio.");
        }
        const item = await controller.setEmployee(req.body);
        response.success(req, res, item, 200);
    } catch (error) {
        response.error(req, res, error, 500);
    }
});


router.delete('/:id', async function (req, res) {
    try {
        const result = await controller.remove({ documento: req.params.id });
        response.success(req, res, result, 200);
    } catch (error) {
        response.error(req, res, error, 500);
    }
});

router.put('/:id', async function (req, res) {
    try {
        console.log("Datos recibidos para actualización:", req.body);

        if (!req.params.id) {
            throw new Error("El campo 'documento' es obligatorio para actualizar.");
        }

        const updatedItem = await controller.updateEmployee(req.body);
        response.success(req, res, updatedItem, 200);
    } catch (error) {
        response.error(req, res, error, 500);
    }
});


module.exports = router;
