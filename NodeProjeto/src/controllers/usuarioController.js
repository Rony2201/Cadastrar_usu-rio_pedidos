// src/controllers/usuarioController.js
import Usuario from '../models/usuario.js';
import Pedido from '../models/pedidos.js';


export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar os usuários' });
  }
};


export const buscarUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o usuário' });
  }
};


export const criarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Nome, email e senha são obrigatórios" });
  }

  try {
    const novoUsuario = await Usuario.create({ nome, email, senha });
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};



export const listarPedidosDoUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const pedidos = await Pedido.findAll({ where: { usuarioId: id } });
    res.status(200).json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar os pedidos' });
  }
};

export const deletarUsuario = async (req,res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if(!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await usuario.destroy();
    res.status(200).send('Usuário excluído com sucesso!');
  } catch {
  res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
};
