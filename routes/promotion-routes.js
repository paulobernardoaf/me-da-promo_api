const router = require('express').Router();
const query = require("../query.js");
const mysql = require("mysql")

router.get('/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    query('SELECT * FROM promocao' + filter, res);
})

router.delete('/:id', (req, res) =>{
    query('DELETE FROM promocao WHERE ID=' + parseInt(req.params.id), res);
})

router.post('/', (req, res) =>{
    let titulo      = req.body.titulo.substring(0,255);
    let usuario     = req.body.usuario;
    let preco       = req.body.preco;
    let link        = req.body.link.substring(0, 255);
    let imagem      = req.body.imagem.substring(0, 255);
    let descricao   = req.body.descricao.substring(0, 255);
    let cupom       = req.body.cupom.substring(0, 255);
    let data_inicio = req.body.data_inicio;
    query(`INSERT INTO promocao(titulo, usuario, preco, link, imagem, descricao, data_cadastro, cupom, data_inicio) VALUES('${titulo}','${usuario}','${preco}','${link}','${imagem}','${descricao}',NOW(),'${cupom}', '${data_inicio}')`, res);
});

router.patch('/:id', (req, res) =>{
    const id         = parseInt(req.params.id);
    let titulo       = req.body.titulo.substring(0,150);
    let descricao    = req.body.descricao.substring(0, 255);
    let cupom        = req.body.cupom.substring(0, 255);
    let imagem       = req.body.imagem.substring(0, 255);
    let link         = req.body.link.substring(0, 255);
    let preco        = req.body.preco;
    let data_termino = req.body.data_termino;
    let data_remocao = req.body.data_remocao;
    query(`UPDATE promocao SET titulo='${titulo}', descricao='${descricao}', cupom='${cupom}', imagem='${imagem}', link='${link}', preco='${preco}', data_modificacao=NOW(), data_remocao='${data_remocao}', data_termino='${data_termino}' WHERE ID=${id}`, res); 
});

// Adicionar Categoria
router.post('/:id_promotion/:id_category', (req, res) =>{
    let promotion   = parseInt(req.params.id_promotion);
    let category    = parseInt(req.params.id_category);
    query(`INSERT INTO categoria_promocao(id_promocao, id_categoria) VALUES('${promotion}', '${category}')`, res);
});

module.exports = router;