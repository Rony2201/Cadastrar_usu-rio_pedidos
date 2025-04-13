import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Importa o arquivo CSS

const api = "http://localhost:3000"; // A URL da sua API (ajuste conforme necessário)

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  // Função para listar os usuários
  useEffect(() => {
    const fetchUsuarios = async () => {
      const response = await axios.get(`${api}/usuario`);
      setUsuarios(response.data);
    };
    fetchUsuarios(); // Agora a função está dentro do useEffect, chamada corretamente.
  }, []);

  // Função para criar um novo usuário
// Função para criar um novo usuário
const createUser = async () => {
  if (nome && email && senha) {
    await axios.post(`${api}/usuario`, { nome, email, senha });
    setNome("");
    setEmail("");
    setSenha("");
    alert("Usuário criado com sucesso!");
    // Remova a linha abaixo, pois o `useEffect` já cuida da atualização dos usuários
    // fetchUsuarios();
  } else {
    alert("Todos os campos são obrigatórios!");
  }
};


  // Função para listar os pedidos de um usuário
  const fetchPedidos = async (usuarioId) => {
    const response = await axios.get(`${api}/usuario/${usuarioId}/pedidos`);
    setPedidos(response.data);
  };

  // Função para criar um novo pedido
  const createPedido = async (usuarioId) => {
    if (descricao && valor) {
      await axios.post(`${api}/usuario/${usuarioId}/pedido`, { descricao, valor });
      setDescricao("");
      setValor("");
      fetchPedidos(usuarioId);
      alert("Pedido criado com sucesso!");
    } else {
      alert("Todos os campos são obrigatórios!");
    }
  };

  // Função para excluir um pedido
  const deletePedido = async (usuarioId, pedidoId) => {
    await axios.delete(`${api}/usuario/${usuarioId}/pedido/${pedidoId}`);
    fetchPedidos(usuarioId);
    alert("Pedido excluído com sucesso!");
  };

  return (
    <div className="App">
      <h1>Gestão de Usuários e Pedidos</h1>
      
      <div>
        <h2>Criar Usuário</h2>
        <input 
          type="text" 
          placeholder="Nome" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="E-mail" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
        />
        <button onClick={createUser}>Criar Usuário</button>
      </div>

      <h2>Usuários</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nome}
            <button onClick={() => fetchPedidos(usuario.id)}>Ver Pedidos</button>
            <div>
              {pedidos.length > 0 && usuario.id === pedidos[0]?.usuarioId && (
                <div>
                  <h3>Pedidos</h3>
                  <ul>
                    {pedidos.map((pedido) => (
                      <li key={pedido.id}>
                        {pedido.descricao} - {pedido.valor}
                        <button onClick={() => deletePedido(usuario.id, pedido.id)}>Excluir</button>
                      </li>
                    ))}
                  </ul>
                  <input 
                    type="text" 
                    placeholder="Descrição do Pedido" 
                    value={descricao} 
                    onChange={(e) => setDescricao(e.target.value)} 
                  />
                  <input 
                    type="number" 
                    placeholder="Valor do Pedido" 
                    value={valor} 
                    onChange={(e) => setValor(e.target.value)} 
                  />
                  <button onClick={() => createPedido(usuario.id)}>Criar Pedido</button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
