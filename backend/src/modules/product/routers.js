const express = require('express');
const router = express.Router();
const response = require('../../response/response')
const controller = require('./controller')

router.get('/', async function (req, res) {
    try {
        const items = await controller.getAll();
        if(items.severity){
            return response.error(req, res, items, 500)
         }
        response.success(req, res, items, 200);
    } catch (error) {
        response.error(req, res, error, 500)
    }
})

router.get('/:id', async function (req, res) {
    const items = await controller.getById(req.params.id);
    if(items.severity){
        return response.error(req, res, items, 500)
     }
    response.success(req, res, items, 200)
})

router.post('/', async function (req, res) {
    const items = await controller.setProvider(req.body);
    if(items.severity){
        return response.error(req, res, items, 500)
     }
    response.success(req, res, items, 200);
})

router.put('/', async function (req, res) {
    try {
        const items = await controller.remove(req.body);
        if(items.severity){
           return response.error(req, res, items, 500)
        }
        response.success(req, res, 'Se ha eliminado correctamente', 200)
    } catch (error) {
        response.error(req, res, error, 500)
    }
})

module.exports = router;