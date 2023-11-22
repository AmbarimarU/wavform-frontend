import React, {useEffect} from 'react';
import { jwtDecode } from 'jwt-decode'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom'
import './Signup.css';

import {
  
  EmailCheck,
  PasswordCheck,
  UsernameCheck,

} from "../Hooks/Validation/Index";

function Signup() {
  
  const [ 
    email,
    setEmail,
    emailError,
    setEmailOnFocus,
    setEmailOnBlur,
    emailButtonState
] = EmailCheck();

  const [
   password,
   setPassword,
   passwordError,
   setPasswordOnFocus,
   setPasswordOnBlur,
   confirmPassword, 
   setConfirmPassword,
   passwordButtonState,
] = PasswordCheck()

const [
  usernameInput, 
  usenameOnChange, 
  usernameError, 
  setUsernameOnFocus, 
  setUsernameOnBlur,
  usernameButtonState
] = UsernameCheck();

const navigate =  useNavigate()

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
  e.preventDefault();
   try {
      await axios.post("http://localhost:3001/users/create-user", {
      
       email,
       password,
       username: usernameInput,
     });
     toast.success("Congrats! Welcome to the Wavform Family!!")
 
     setEmail("");
     setPassword("");
     setConfirmPassword("");
     usenameOnChange("");
    
   } catch (e) {
       
   }
}

  
  return (
    <div className='form-container' style={{backgroundColor: "#007ead" }}>
    <div className='form-div'>
        <div className='form-h1'>
            <h2>Sign Up Here!! </h2>
        </div>
        <form onSubmit={handleOnSubmit}>
            
     
            <div className='form-input-container'>
                <div>
                    <input className='form-input'
                    type="text"
                    name="email"
                    id="email"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={()=> setEmailOnFocus(true)}
                    onBlur={()=> setEmailOnBlur(true)}
                    />
                </div>
                <div>
                {emailError && (
                    <div className='error-container'>
                        <span>{emailError}</span>
                        </div>
                )}
                </div>
            </div>
            <div className='form-input-container'>
                <div>
                    <input className={`form-input ${passwordError ? "form-input-error" : undefined}`}
                    type={process.env.NODE_ENV === "production" ? "password" : "text"}
                    name="password"
                    id="password"
                    placeholder='Passsword'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={()=> setPasswordOnFocus(true)}
                    onBlur={()=> setPasswordOnBlur(true)}
                    />
                </div>
                <div>
                {passwordError && (
                    <div className='error-container'>
                        <span>{passwordError}</span>
                        </div>
                )}
                </div>
            </div>
            <div className='form-input-container'>
                <div>
                   <input 
                   className={`form-input ${ passwordError ? "form-input-error" : undefined}`}
                   type={process.env.NODE_ENV === "production" ? "password" : "text"}
                   placeholder='Confirm Password'
                   value={confirmPassword}
                   onChange={(e) => setConfirmPassword(e.target.value)}
                   />
                </div>
                {passwordError && (
                    <div className='error-container'>
                        <span>{passwordError}</span>
                        </div>
                )}
            </div>
            <div className='form-input-container'>
                <div>
                    <input className={`form-input ${passwordError ? "form-input-error" : undefined}`}
                    type="text"
                    name="username"
                    id="username"
                    placeholder='Username'
                    value={usernameInput}
                    onChange={(e) => usenameOnChange(e.target.value)}
                    onFocus={()=> setUsernameOnFocus(true)}
                    onBlur={()=> setUsernameOnBlur(true)}
                    />
                </div>
                <div>
                {usernameError && (
                    <div className='error-container'>
                        <span>{usernameError}</span>
                        </div>
                )}
                </div>
            
 
             <div className='clear'></div>
                <div className='button-container'>
                 <button disabled={emailButtonState || usernameButtonState || passwordButtonState} className='sign-up'>Submit</button>
            </div>
            <div className='nav-to-login'>
              <small>Already Signed up? <Link to="/login">click here</Link></small>
            </div>
            </div>
        </form>
    </div>
</div>
  )
}

export default Signup