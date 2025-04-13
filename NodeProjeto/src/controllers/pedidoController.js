import Pedido from '../models/pedidos.js';
import Usuario from '../models/usuario.js';

export const criarPedido = async (req, res) => {
  try {
    const usuarioId = parseInt(req.params.id);
    const { descricao, valor } = req.body;

    if (!descricao || !valor) {
      return res.status(400).send('Campos "descricao" e "valor" são obrigatórios.');
    }

    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) return res.status(404).send('Usuário não encontrado');

    await Pedido.create({ descricao, valor, usuarioId });
    res.status(201).send('Pedido criado com sucesso!');
  } catch {
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
};

export const listarTodosPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.status(200).json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar os pedidos' });
  }
};


export const editarPedido = async (req, res) => {
  try {
    const usuarioId = parseInt(req.params.usuarioId);
    const pedidoId = parseInt(req.params.pedidoId);
    const { descricao, valor } = req.body;

    if (!descricao || !valor) {
      return res.status(400).send('Campos "descricao" e "valor" são obrigatórios.');
    }

    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) return res.status(404).send('Usuário não encontrado');

    const pedido = await Pedido.findOne({ where: { id: pedidoId, usuarioId } });
    if (!pedido) return res.status(404).send('Pedido não encontrado para este usuário');

    await pedido.update({ descricao, valor });
    res.status(200).send('Pedido editado com sucesso!');
  } catch {
    res.status(500).json({ error: 'Erro ao editar pedido' });
  }
}

export const deletarPedido = async (req, res) => {
    try {
        const usuarioId = parseInt(req.params.usuarioId);
        const pedidoId = parseInt(req.params.pedidoId);

        const usuario = await Usuario.findByPk(usuarioId);
        if(!usuario) return res.status(400).send('Usuário não encontrado!');

        const pedido = await Pedido.findOne({ where: { id: pedidoId, usuarioId } });
        if (!pedido) return res.status(404).send('Pedido não encontrado para este usuário');

        await pedido.destroy();

    res.status(200).send('Pedido excluído com sucesso!');
    } catch {
    res.status(500).json({ error: 'Erro ao excluir pedido' });
    }

};
