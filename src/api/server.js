const { json } = require('body-parser');

const app = require('./app');
const { userRouter, recipeRouter } = require('./routers');
const errorMiddleware = require('./middlewares/errorMiddleware');

app.use(json());

app.use('/', userRouter);

app.use('/', recipeRouter);

app.use(errorMiddleware);

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
