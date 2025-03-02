const express = require('express');
const cors = require('cors');
const config = require('./config')
const app = express();
const proveedor = require('./modules/providers/routers');
const customer = require('./modules/customer/routers');
const employee = require('./modules/employee/routers');
const auth = require('./modules/auth/routers');
const report = require('./modules/reports/routers');
const muebles = require ('./modules/mueble/routers');
const sales= require ('./modules/sales/routers');

//_____________Configuración___________
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.set('port', config.app.port)

// _______________Rutas_________:

//Proveedores
app.use('/proveedores', proveedor);
app.use('/clientes', customer)
app.use('/empleados', employee)
app.use('/muebles', muebles)

app.use('/autenticacion', auth)
app.use('/reportes', report)
app.use('/ventas', sales)


module.exports = app;