import express from 'express';
import {
  criarPedido,
  deletarPedido,
  editarPedido,
  listarTodosPedidos
} from '../controllers/pedidoController.js';

const router = express.Router();

router.post('/usuario/:id/pedido', criarPedido);
router.put('/usuario/:usuarioId/pedido/:pedidoId', editarPedido);
router.delete('/usuario/:usuarioId/pedido/:pedidoId', deletarPedido);
router.get('/pedido', listarTodosPedidos);

export default router;
