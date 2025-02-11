const express = require('express');
const router = express.Router();
<<<<<<< HEAD

router.get('/', function (req, res){
    res.send('Proveedores ok')
})

=======
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

router.delete('/:id', async function (req, res) {
    try {
      const result = await controller.remove({ codigoproveedor: req.params.id });
      response.success(req, res, result, 200);
    } catch (error) {
      response.error(req, res, error, 500);
    }
  });

router.put('/', async function (req, res) {
    try {
        const updatedItem = await controller.updateProvider(req.body);
        response.success(req, res, updatedItem, 200);
    } catch (error) {
        response.error(req, res, error, 500);
    }
});

>>>>>>> 1fa1269 (agregando funciones backend y frontend)
module.exports = router;