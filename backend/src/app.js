const express = require('express');
const cors = require('cors');
const config = require('./config')
const app = express();
const proveedor = require('./modules/providers/routers');
const customer = require('./modules/customer/routers');
const employee = require('./modules/employee/routers');
const product = require('./modules/product/routers');
const sales = require('./modules/sales/routers')


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
app.use('/muebles', product)
app.use('/ventas', sales)


module.exports = app;