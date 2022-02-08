require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const corsHandler = require('./middlewares/cors-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');
const { NOT_FOUND } = require('./utils/errors');

const { PORT = 3000, DB_ADDRESS = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(requestLogger);
app.use(corsHandler);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(20),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(20),
  }),
}), createUser);
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use(errorLogger);
app.use((req, res, next) => {
  res.status(NOT_FOUND).send({ message: 'Ресурс не найден' });
  next();
});
app.use(errors());
app.use(errorHandler);

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`Слушаем порт ${PORT}`);
});
