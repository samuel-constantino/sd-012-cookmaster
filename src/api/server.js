const app = require('./app');
const { userRouter } = require('./routers');

app.use('/users', userRouter);

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
