exports.success = function(req, res, message, status){
    const statusCode = status || 200;
    const messageOk = message || '';

        res.status(status).send({
        error: false,
        status: statusCode,
        data: messageOk,
    })
}

exports.error = function(req, res, message,status){
    const statusCode = status || 500;
    const messageError = message || 'Error interno del servidor';
    res.status(status).send({
        error: true,
        status: statusCode,
        body: messageError,
        errorCode: `ERR_${statusCode}`,
    })
}