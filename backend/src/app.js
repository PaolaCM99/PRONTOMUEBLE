const express = require('express');
const config = require('./config')
const app = express();
const proveedor = require('./modules/providers/routers')


//_____________Configuración___________
app.set('port', config.app.port)

// _______________Rutas_________:

//Proveedores
app.use('/proveedores', proveedor)


module.exports = app;