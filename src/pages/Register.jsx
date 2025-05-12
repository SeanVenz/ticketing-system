import React, { useState } from 'react'
import { registerUserDataFlower } from '../utils/apiClient';
import { useNavigate } from 'react-router-dom';

function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const navigate = useNavigate();


    const register = async(e) => {
        e.preventDefault();
        const reg = await registerUserDataFlower(username, password)
        if(reg.success === true){
            navigate('/login');
        }
    }

  return (
    <div>
        <form onSubmit={register}>
            <input type="text" onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" onChange={(e) => setPassword(e.target.value)}/>
            <button>Submit</button>
        </form>
    </div>
  )
}

export default Register