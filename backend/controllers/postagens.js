const Postagem = require('../models/postagem');
const { z } = require('zod');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
destination: (req, file, cb) => {
cb(null, 'uploads/');
},
filename: (req, file, cb) => {
cb(null, Date.now() + path.extname(file.originalname));
},
});

const upload = multer({ storage });

// Validações com Zod
const postagemSchema = z.object({
titulo: z.string().min(1),
conteudo: z.string().min(1),
autor: z.string().min(1),
imagem: z.string().optional(),
});

const criarPostagem = async (req, res) => {
try {
const { titulo, conteudo, autor } = req.body;
const postagem = await Postagem.create({
titulo,
conteudo, autor,
imagem: req.file ? req.file.path : null,
});
res.status(201).json(postagem);
} catch (error) {
res.status(500).json({ error: error.message });
}
};

const listarPostagens = async (req, res) => {
try {
const { page = 1, limit = 10 } = req.query;
const postagens = await Postagem.findAndCountAll({
limit: parseInt(limit),
offset: (page - 1) * limit,
});
res.json({
totalPostagens: postagens.count,
totalPaginas: Math.ceil(postagens.count / limit),
paginaAtual: parseInt(page),
itemsPorPagina: parseInt(limit),
proximaPagina: postagens.count > page * limit ? `/postagens?page=${parseInt(page) + 1}&limit=${limit}` : null,
postagens: postagens.rows,
});
} catch (error) {
res.status(500).json({ error: error.message });
}
};

const buscarPostagemPorId = async (req, res) => {
try {
const postagem = await Postagem.findByPk(req.params.id);
if (postagem) {
res.json(postagem);
} else {
res.status(404).json({ error: 'Postagem não encontrada' });
}
} catch (error) {
res.status(500).json({ error: error.message });
}
};

const atualizarPostagem = async (req, res) => {
try {
const postagem = await Postagem.findByPk(req.params.id);
if (postagem) {
const { titulo, conteudo, imagem } = req.body;
postagem.titulo = titulo || postagem.titulo;
postagem.conteudo = conteudo || postagem.conteudo;
postagem.imagem = imagem || postagem.imagem;
await postagem.save();
res.json(postagem);
} else {
res.status(404).json({ error: 'Postagem não encontrada' });
}
} catch (error) {
res.status(500).json({ error: error.message });
}
};

const excluirPostagem = async (req, res) => {
try {
const postagem = await Postagem.findByPk(req.params.id);
if (postagem) {
await postagem.destroy();
res.status(204).end();
} else {
res.status(404).json({ error: 'Postagem não encontrada' });
}
} catch (error) {
res.status(500).json({ error: error.message });
}
};

const salvarPostagem = async (req, res) =>{
    try{
const salvarPostagem = await salvarPostagem.findByPk(req.params.id);
if(postageme){
    await postagem.destroy();
    res.status(204).end();
}else{
    res.status(404).json({error: error, message});
}
}catch (error){
    res.status(500).json({error: error.message});
}
    };

module.exports = {
criarPostagem,
listarPostagens,
buscarPostagemPorId,
atualizarPostagem,
excluirPostagem,
salvarPostagem,
upload,
};
