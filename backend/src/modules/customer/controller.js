const db = require('../../database/postgres');

const table = 'cliente'
const uniqueField = 'documento'

function getAll(){
     return db.getAll(table)
}

function getById(id){
    return db.getById(table, id, uniqueField)
}

function setCustomer(body){
    return db.setData(table, body, uniqueField);
}

function remove(body){
    return db.deleteData(table, body, uniqueField)
}


module.exports = {
    getAll, getById, remove, setCustomer
}