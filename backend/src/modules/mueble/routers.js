const express = require('express');
const router = express.Router();
const response = require('../../response/response');
const controller = require('./controller');

// Obtener todos los muebles
router.get('/', async function (req, res) {
    try {
        const items = await controller.getAll();
        response.success(req, res, items, 200);
    } catch (error) {
        console.error("Error al obtener muebles:", error);
        response.error(req, res, error.message, 500);
    }
});

// Obtener un mueble por ID
router.get('/:id', async function (req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error("El campo 'id' es obligatorio para obtener un mueble.");
        }
        const item = await controller.getById(id);
        response.success(req, res, item, 200);
    } catch (error) {
        console.error("Error al obtener mueble por ID:", error);
        response.error(req, res, error.message, 500);
    }
});

// Crear un nuevo mueble (sin enviar ID porque es autoincremental)
router.post('/', async function (req, res) {
    try {
        console.log("Datos recibidos para creación:", req.body);

        // Elimina `id` del cuerpo si está presente
        const { id, ...muebleData } = req.body;

        const item = await controller.setMueble(muebleData);
        response.success(req, res, item, 201);
    } catch (error) {
        console.error("Error al crear mueble:", error);
        response.error(req, res, error.message, 500);
    }
});

// Actualizar un mueble
router.put('/:id', async function (req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error("El campo 'id' es obligatorio para actualizar un mueble.");
        }

        console.log("Datos recibidos para actualización:", req.body);
        const updatedItem = await controller.updateMueble(id, req.body); // Pasamos `id` como parámetro separado
        response.success(req, res, updatedItem, 200);
    } catch (error) {
        console.error("Error al actualizar mueble:", error);
        response.error(req, res, error.message, 500);
    }
});

// Eliminar un mueble
router.delete('/:id', async function (req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error("El campo 'id' es obligatorio para eliminar un mueble.");
        }

        console.log("Eliminando mueble con ID:", id);
        const result = await controller.remove(id); // No necesitas un objeto `{ id }`
        response.success(req, res, result, 200);
    } catch (error) {
        console.error("Error al eliminar mueble:", error);
        response.error(req, res, error.message, 500);
    }
});

module.exports = router;
