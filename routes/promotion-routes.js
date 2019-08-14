const router = require('express').Router();
const query = require("../query.js");
const mysql = require("mysql")

router.get('/:id?', (req, res) =>{
    let filter = '';
    
    let search = '';
    if(req.query.search) search += req.query.search.split(" ").join("%') OR (titulo LIKE '%");

    if(req.params.id)   filter = ' WHERE ID=' + parseInt(req.params.id);
    if(req.query.search)filter = ' WHERE (titulo LIKE \'%' + search + '%\')';
    if(req.query.param) filter += " ORDER BY " + req.query.param;
    if(req.query.order) filter += " " + req.query.order;
    if(req.query.limit) filter += " LIMIT " + req.query.limit;
    if(req.query.offset)filter += " OFFSET " + req.query.offset;

    query('SELECT * FROM promocao' + filter, res);
})

router.get('/bycategory/:category', (req, res) =>{
    let category = parseInt(req.params.category);
    query(`SELECT * FROM promocao WHERE id IN (SELECT id_promocao FROM categoria_promocao WHERE id_categoria = '${category}')`, res)
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
    let data_termino = req.body.data_termino;
    let codigo_desconto = req.body.codigo_desconto.substring(0, 255);
    query(`INSERT INTO promocao(titulo, usuario, preco, link, imagem, descricao, data_cadastro, data_termino, codigo_desconto) VALUES('${titulo}','${usuario}','${preco}','${link}','${imagem}','${descricao}',NOW(), '${data_termino}', '${codigo_desconto}')`, res);
});

router.patch('/:id', (req, res) =>{
    const id         = parseInt(req.params.id);
    let titulo       = req.body.titulo.substring(0,150);
    let descricao    = req.body.descricao.substring(0, 255);
    let codigo_desconto = req.body.codigo_desconto.substring(0, 255);
    let imagem       = req.body.imagem.substring(0, 255);
    let link         = req.body.link.substring(0, 255);
    let preco        = req.body.preco;
    let data_termino = req.body.data_termino;
    let data_remocao = req.body.data_remocao;
    query(`UPDATE promocao SET titulo='${titulo}', descricao='${descricao}', codigo_desconto='${codigo_desconto}', imagem='${imagem}', link='${link}', preco='${preco}', data_modificacao=NOW(), data_remocao='${data_remocao}', data_termino='${data_termino}' WHERE ID=${id}`, res); 
});

// Adicionar Categoria
router.post('/:id_promotion/:id_category', (req, res) =>{
    let promotion   = parseInt(req.params.id_promotion);
    let category    = parseInt(req.params.id_category);
    query(`INSERT INTO categoria_promocao(id_promocao, id_categoria) VALUES('${promotion}', '${category}')`, res);
});


router.get('/vote/:id_promotion/:id_user?', (req, res) =>{
    let promotion   = parseInt(req.params.id_promotion);
    let user        = req.params.id_user;

    let sql = "";

    if(req.query.mais)  sql += "UPDATE promocao SET avaliacao = (avaliacao + 1) WHERE id = "+promotion+" AND NOT EXISTS (SELECT * FROM avaliacao WHERE id_promocao = "+promotion+" AND id_usuario = '"+user+"');";
    if(req.query.menos) sql += "UPDATE promocao SET avaliacao = (avaliacao - 1) WHERE id = "+promotion+" AND NOT EXISTS (SELECT * FROM avaliacao WHERE id_promocao = "+promotion+" AND id_usuario = '"+user+"');";

    query(sql + " INSERT INTO avaliacao(id_usuario, id_promocao) SELECT '"+user+"', '"+promotion+"' FROM dual WHERE NOT EXISTS (SELECT * FROM avaliacao WHERE id_usuario = '"+user+"' AND id_promocao = "+promotion+");", res);
});

module.exports = router;