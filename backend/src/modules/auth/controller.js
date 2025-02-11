const db = require('../../database/postgres');

const table = 'autenticacion'
const uniqueField = 'id'



function setCustomer(data){

    const authData = {
        id: data.id,

    }
    if(data.usuario){
        authData.usuario = data.usuario;
    }

    if(data.contrasena){
        authData.contrasena = data.contrasena;
    }

    return db.setData(table, authData);
}



module.exports = {
    getAll, getById, remove, setCustomer
}