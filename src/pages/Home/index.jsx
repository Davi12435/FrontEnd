import { useEffect, useState, useRef, useCallback } from 'react';
import './style.css';
import api from '../../services/api';

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputEmail = useRef();
  const inputContato = useRef();

  const getUsers = useCallback(async () => {
    try {
      const usersFromApi = await api.get('http://localhost:3000/usuarios');
      console.log(usersFromApi);  // Verifica a resposta
      setUsers(usersFromApi.data);
    } catch (error) {
      console.error("Erro ao obter usuários:", error);
    }
  }, [])

  const createUsers = useCallback(async () => {
    try {
      await api.post('http://localhost:3000/usuarios', {
        name: inputName.current.value,
        email: inputEmail.current.value,
        contact: inputContato.current.value,
      });
      getUsers();  // Atualiza a lista de usuários após criação
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  }, [getUsers])

  const deleteUsers = useCallback(async (id) => {
    try {
      console.log(id)
      await api.delete(`http://localhost:3000/usuarios/${id}`);
      getUsers();  // Atualiza a lista após exclusão
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  }, [getUsers])

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="container">
      <h1>Cadastro de Usuários</h1>
      <form>
        <label>
          Nome:
          <input type="text" name="nome" ref={inputName} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" ref={inputEmail} />
        </label>
        <br />
        <label>
          Número:
          <input type="number" name="numero" ref={inputContato} />
        </label>
        <br />
       <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id}>
          <div>
            <p>Nome: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Contato: {user.contact}</p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
