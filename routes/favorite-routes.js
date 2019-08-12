const router = require('express').Router();
const query = require("../query.js");
const mysql = require("mysql")

router.get('/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    query('SELECT * FROM favorito' + filter, res);
})

router.delete('/:id', (req, res) =>{
    query('DELETE FROM favorito WHERE ID=' + parseInt(req.params.id), res);
})

router.post('/', (req, res) =>{
    let usuario = req.body.usuario;
    let promocao = req.body.promocao;
    query(`INSERT INTO favorito(id_usuario, id_promocao) VALUES('${usuario}','${promocao}')`, res);
});

module.exports = router;