const express = require('express');
const app = express();         
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000; //porta padrão
const mysql = require('mysql');
const router = express.Router();

const promotionRoutes   = require("./routes/promotion-routes.js");
const commentRoutes     = require("./routes/comment-routes.js");
const userRoutes        = require("./routes/user-routes.js");
const categoryRoutes     = require("./routes/category-routes.js");

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// definindo as rotas
app.use('/promotion', promotionRoutes);
app.use('/comment', commentRoutes);
app.use('/user', userRoutes);
app.use('/category', categoryRoutes);


//inicia o servidor
app.listen(port);
console.log('API funcionando! na porta: ' + port);
