const errorMiddleware = (err, _req, res) => {
    const statusCode = [
        400, // bad request
        404, // not found
        409, // already exists
        422, // unprocessable entity
    ];

    const status = statusCode.find((code) => code === err.code) || 500;
    console.log(`CODIGO DE ERRO: ${status} - MESSAGEM: ${err.message} `);

    if (status === 500) {
        return res.status(status).json({ error: { message: 'ERRO INTERNO DO SERVIDOR' } });
    }
    return res.status(status).json({ error: { message: err.message } });
};

module.exports = errorMiddleware;