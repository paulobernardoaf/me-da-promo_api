const router = require('express').Router();
const query = require("../query.js");
const mysql = require("mysql")

router.get('/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    query('SELECT * FROM categoria' + filter, res);
})

router.delete('/:id', (req, res) =>{
    query('DELETE FROM categoria WHERE ID=' + parseInt(req.params.id), res);
})

router.post('/', (req, res) =>{
    let tag = req.body.tag.substring(0, 255);
    query(`INSERT INTO categoria(tag) VALUES('${tag}')`, res);
});

router.patch('/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    let tag = req.body.tag.substring(0, 255);
    query(`UPDATE categoria SET tag='${tag}' WHERE ID=${id}`, res); 
});

module.exports = router;