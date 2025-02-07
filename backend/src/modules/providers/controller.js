const db = require('./../../database/postgres');

const table = 'proveedor'

function getAll(){
     return db.getAll(table)
}

function getById(id){
    return db.getById(table, id)
}

function setProvider(body){
    return db.setData(table, body);
}

function remove(body){
    return db.deleteData(table, body)
}


module.exports = {
    getAll, getById, remove, setProvider
}