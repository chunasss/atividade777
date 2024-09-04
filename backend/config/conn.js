const express = require('express');
const router = express.Router();
const postagemController = require('../../backend/controllers/postagemController');

// Rotas para postagens
router.post('/postagens', postagemController.upload.single('imagem'), postagemController.criarPostagem);
router.get('/postagens', postagemController.listarPostagens);
router.get('/postagens/:id', postagemController.buscarPostagemPorId);
router.put('/postagens/:id', postagemController.atualizarPostagem);
router.delete('/postagens/:id', postagemController.excluirPostagem);

module.exports = router;
