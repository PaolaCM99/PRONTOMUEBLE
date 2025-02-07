const express = require('express');
const config = require('./config')
const app = express();
const proveedor = require('./modules/providers/routers');
const customer = require('./modules/customer/routers');
const employee = require('./modules/employee/routers')


//_____________Configuración___________
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.set('port', config.app.port)

// _______________Rutas_________:

//Proveedores
app.use('/proveedores', proveedor);
app.use('/clientes', customer)
app.use('/empleados', employee)


module.exports = app;