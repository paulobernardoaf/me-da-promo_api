const router = require('express').Router();
const query = require("../query.js");
const mysql = require("mysql")

router.get('/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    query('SELECT * FROM usuario' + filter, res);
})

router.delete('/:id', (req, res) =>{
    query('DELETE FROM usuario WHERE ID=' + parseInt(req.params.id), res);
})

router.post('/', (req, res) =>{
    let uid = req.body.uid.substring(0, 28);
    let nome = req.body.nome.substring(0, 255);
    query(`INSERT INTO usuario(uid, nome) SELECT '${uid}', '${nome}' FROM dual WHERE NOT EXISTS (SELECT * FROM usuario WHERE uid = '${uid}' AND nome = '${nome}')`, res);
});

router.patch('/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    let uid = req.body.uid.substring(0, 28);
    let nome = req.body.nome.substring(0, 255);
    query(`UPDATE usuario SET uid='${uid}', nome='${nome}' WHERE ID=${id}`, res); 
});

module.exports = router;