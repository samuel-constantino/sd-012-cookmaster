const errorMiddleware = (err, _req, res) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Error';

    return res.status(status).json({ error: { message } });
};

module.exports = errorMiddleware;