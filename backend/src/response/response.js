exports.success = function(req, res, message,status){
    const statusCode = status || 200;
    const messageOk = message || '';

        res.status(status).send({
        error: false,
        status: statusCode,
        body: messageOk
    })
}

exports.error = function(req, res, message,status){
    const statusCode = status || 500;
    const messageError = message || 'Error interno';
    res.status(status).send({
        error: true,
        status: statusCode,
        body: messageError
    })
}