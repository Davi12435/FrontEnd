import { useEffect, useState, useRef } from 'react';
import Lixo from '../../assets/Lixo.svg';
import './style.css'
import api from '../../services/api';

function Home() {
const [users, setUsers] = useState([])

const inputName = useRef()
const inputEmail = useRef()
const inputContato = useRef()
  

  async function getUsers(){
   const usersFromApi = await api.get('http://localhost:3000/usuarios')

   setUsers (usersFromApi.data)
  }

  async function createUsers(){
    await api.post('http://localhost:3000/usuarios', {
      name: inputName.current.value,
      email: inputEmail.current.value,
      contact: inputContato.current.value,
    })
 
   }

   useEffect(() => {
     getUsers();
   }, []);

  return (

    <div className='container'>
      <form>
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
            Numero:
            <input type="number" name="numero" ref={inputContato} />
          </label>
          <br />
          <button type="button" onClick={createUsers}>Cadastrar</button>
        </form>
      </form>

      {users.map((user) => (
        <div key={user.id}>
          <div>
            <p>Nome: {user.nome} </p>
            <p>Email: {user.email}</p>
            <p>Contato: {user.contato}</p>
          </div>
          <button>
            <input type="button"></input>
          </button>
        </div>
      ))}

    </div>
  )
}

export default Home
