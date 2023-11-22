import React, {useState, useEffect}from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import {useNavigate} from 'react-router-dom'


function Login({ setUser }) {
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const [username, setUsername] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    let jwtToken = window.localStorage.getItem("jwtToken")
    console.log(jwtToken)

    if(jwtToken){
      let decodedToken = jwtDecode(jwtToken)

      const currentTime = Date.now() / 1000;

      if(decodedToken.exp < currentTime){
        window.localStorage.removeItem("jwtToken");
      } else{
        navigate("/")
      }
    }
  }, [])
   
  async function handleOnSubmit(e){
    e.preventDefault()
    try {
       let result = await axios.post(`http://localhost:3001/users/login`, {
        email,
        password,
        username,

       });
       const jwtToken = result.data.token

       window.localStorage.setItem("jwtToken", jwtToken)
       const decodedToken = jwtDecode(jwtToken)
       console.log(decodedToken)
       
       setUser({
        email: decodedToken.email,
        username: decodedToken.username,
        id: decodedToken.id
       });
       navigate("/")
    } catch (error) {
        console.log(error)
    }
  }
  
  
  return (
    <div className='form-container'>
    <div className='form-div'>
        <div className='form-h1'>
            <h1>Log in</h1>
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
                 <button>Submit</button>
            </div>
        </form>
    </div>
</div>
  )
}

export default Login