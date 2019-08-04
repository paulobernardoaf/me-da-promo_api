const router = require('express').Router();
const query = require("../query.js");
const mysql = require("mysql")

router.get('/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    query('SELECT * FROM comentario' + filter, res);
})

router.delete('/:id', (req, res) =>{
    query('DELETE FROM comentario WHERE ID=' + parseInt(req.params.id), res);
})

router.post('/', (req, res) =>{
    let usuario = req.body.usuario;
    let promocao = req.body.promocao;
    let texto = req.body.texto.substring(0,255);
    query(`INSERT INTO comentario(id_usuario, id_promocao, texto, data) VALUES('${usuario}','${promocao}','${texto}', NOW())`, res);
});

router.patch('/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    let texto = req.body.texto;
    let likes = req.body.likes;
    let dislikes = req.body.dislikes;

    let data = "";

    if(texto != null) {
        data += " texto='"+texto.substring(0,255)+"'";
    }

    if(likes != null){
        data += (data == "") ? " likes='"+likes+"'" : ", likes='"+likes+"'";
    }
    
    if(dislikes != null){
        data += (data == "") ? " dislikes='"+dislikes+"'" : ", dislikes='"+dislikes+"'";
    }
    
    query(`UPDATE comentario SET ${data} WHERE id=${id}`, res); 
});

module.exports = router;