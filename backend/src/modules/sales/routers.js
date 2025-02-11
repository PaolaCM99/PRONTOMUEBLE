const express = require('express');
const router = express.Router();
const response = require('../../response/response')
const controller = require('./controller')

router.get('/', async function (req, res) {
    try {
        const items = await controller.getAll();
        response.success(req, res, items, 200)
    } catch (error) {
        response.error(req, res, error, 500)
    }
})

router.get('/:id', async function (req, res) {
    const items = await controller.getById(req.params.id);
    response.success(req, res, items, 200)
})

router.post('/', async function (req, res) {
    const items = await controller.setProvider(req.body);
    const message = req.body.codigoproveedor ? 'Actualizado' : 'Añadido';
    response.success(req, res, items, 200);
})

router.put('/', async function (req, res) {
    try {
        controller.remove(req.body);
        response.success(req, res, 'Se ha eliminado correctamente', 200)
    } catch (error) {
        response.error(req, res, error, 500)
    }
})

module.exports = router;