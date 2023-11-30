import React, {useState, useEffect}from 'react';
import {loginUsers} from '../Api/Api'
import { jwtDecode }  from 'jwt-decode';
import useAuthHooks from '../Hooks/Auth/useAuthHooks';
import {useNavigate} from 'react-router-dom';

import './Login.css';


function Login({ setUser }) {
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const [username, setUsername] = useState("")
  const [, , checkToken] = useAuthHooks()

  const navigate = useNavigate()

  useEffect(() => {
    
    if (checkToken()){
      navigate("/get-all-users")
    }
  }, [])
   
  async function handleOnSubmit(e){
    e.preventDefault()
    try {
       let result = await loginUsers({
        email,
        password,
        username,

       });
       const jwtToken = result.data.token
       console.log(jwtToken)

       window.localStorage.setItem("jwtToken", jwtToken)
       const decodedToken = jwtDecode(jwtToken)
       console.log(decodedToken)
       
       setUser({
        email: decodedToken.email,
        username: decodedToken.username,
        id: decodedToken.id
       });
       navigate("/welcome")
    } catch (error) {
        console.log(error)
    }
  }
  
  
  return (
    <div className='form-container' style={{backgroundColor: "#007ead" }} >
    <div className='form-div'>
        <div className='form-h1'>
            <h2>Log in</h2>
        </div>
        <form onSubmit={handleOnSubmit} >
            
            
            <div className='form-input-container'>
                <div>
                    <input className='form-input'
                    type="text"
                    name="email"
                    id="email"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
        
                    />
                </div>
            
            </div>
            <div className='form-input-container'>
                <div>
                    <input className='form-input'
                    type={process.env.NODE_ENV === "production" ? "password" : "text"}
                    name="password"
                    id="password"
                    placeholder='Passsword'
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    
                    />
                </div>
                
            </div>
            
            <div className='form-input-container'>
                <div>
                    <input className='form-input'
                    type="text"
                    name="username"
                    id="username"
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    
                    />
                </div>
               
            </div>
           
             
                <div className='button-container'>
                 <button className='login'>Submit</button>
            </div>
        </form>
    </div>
</div>
  )
}

export default Login