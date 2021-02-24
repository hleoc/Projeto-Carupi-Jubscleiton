const express = require('express');

const bodyParser = require('body-parser');

const usersController = require('./Controllers/usersController');

const loginController = require('./Controllers/loginController');

// const recipesController = require('./Controllers/recipesController');

const app = express();

app.use(bodyParser.json());

app.use('/users', usersController);

app.use('/login', loginController);

// app.use('/recipes', recipesController);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`A CARUPI tá ON na porta ${PORT}`);
});
