const db = require('../../database/postgres');

const table = 'USUARIO';
const uniqueField = 'codigousuario_fk';



function authUser(data){

    let authData = {};

    if(data.correo){
        authData.correo = data.correo;
    }

    if(data.contrasena){
        authData.contrasena = data.contrasena;
    }

    return db.authUser(table, authData, uniqueField);
}



module.exports = {
    authUser
}