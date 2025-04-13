
import express from 'express';
import {
  listarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  listarPedidosDoUsuario,
  deletarUsuario
} from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/', listarUsuarios);
router.get('/:id', buscarUsuarioPorId);
router.post('/', criarUsuario);
router.get('/:id/pedidos', listarPedidosDoUsuario);
router.delete('/:id', deletarUsuario);

export default router;
