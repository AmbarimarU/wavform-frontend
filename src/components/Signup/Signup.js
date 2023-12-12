import React, { useEffect } from "react";
import useAuthHooks from "../Hooks/Auth/useAuthHooks";
import { createUsers } from "../Api/Api";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

import {
    EmailCheck,
    PasswordCheck,
    UsernameCheck,
} from "../Hooks/Validation/Index";

function Signup() {
<<<<<<< HEAD
  
  const [ 
    email,
    setEmail,
    emailError,
    setEmailOnFocus,
    setEmailOnBlur,

] = EmailCheck();

  const [
   password,
   setPassword,
   passwordError,
   setPasswordOnFocus,
   setPasswordOnBlur,
   confirmPassword, 
   setConfirmPassword,
   
] = PasswordCheck()

const [
  usernameInput, 
  usernameOnChange, 
  usernameError, 
  setUsernameOnFocus, 
  setUsernameOnBlur,
  
] = UsernameCheck();
=======
    const [
        email,
        setEmail,
        emailError,
        setEmailOnFocus,
        setEmailOnBlur,
        emailButtonState,
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
    ] = PasswordCheck();

    const [
        usernameInput,
        usernameOnChange,
        usernameError,
        setUsernameOnFocus,
        setUsernameOnBlur,
        usernameButtonState,
    ] = UsernameCheck();
>>>>>>> a4f1198db717b7b4412dc0aa16507502d13641f2

    const navigate = useNavigate();

    const [, , checkToken] = useAuthHooks();

    useEffect(() => {
        if (checkToken()) {
            navigate("/get-all-users");
        }
    }, []);

<<<<<<< HEAD
    if(checkToken()){
      navigate("/get-all-users")
    
  }
}, [checkToken, navigate])
=======
    async function handleOnSubmit(e) {
        e.preventDefault();
        try {
            await createUsers({
                email,
                password,
                username: usernameInput,
            });
>>>>>>> a4f1198db717b7b4412dc0aa16507502d13641f2

            alert("Congrats! Welcome to the Wavform Family!!");
            navigate("/login");
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="sign-up">
            <div className="sign-up__container">
                <h2 className="sign-up__title">Sign Up Here!! </h2>

                <form className="sign-up__form" onSubmit={handleOnSubmit}>
                    <div className="form-container">
                        <div className="form-field">
                            <input
                                className="form-input"
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setEmailOnFocus(true)}
                                onBlur={() => setEmailOnBlur(true)}
                            />
                        </div>
                        <span className="form-input-error">
                            {emailError && (
                                <div className="error-container">
                                    <span>{emailError}</span>
                                </div>
                            )}
                        </span>
                    </div>
                    <div className="form-container">
                        <div className="form-field">
                            <input
                                className={`form-input ${
                                    passwordError
                                        ? "form-input-error"
                                        : undefined
                                }`}
                                type={
                                    process.env.NODE_ENV === "production"
                                        ? "password"
                                        : "text"
                                }
                                name="password"
                                id="password"
                                placeholder="Passsword"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setPasswordOnFocus(true)}
                                onBlur={() => setPasswordOnBlur(true)}
                            />
                        </div>
                        <span className="form-input-error">
                            {passwordError && (
                                <div className="error-container">
                                    <span>{passwordError}</span>
                                </div>
                            )}
                        </span>
                    </div>
                    <div className="form-container">
                        <div className="form-field">
                            <input
                                className={`form-input ${
                                    passwordError
                                        ? "form-input-error"
                                        : undefined
                                }`}
                                type={
                                    process.env.NODE_ENV === "production"
                                        ? "password"
                                        : "text"
                                }
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                        <span className="form-input-error">
                            {passwordError && (
                                <div className="error-container">
                                    <span>{passwordError}</span>
                                </div>
                            )}
                        </span>
                    </div>
                    <div className="form-container">
                        <div className="form-field">
                            <input
                                className={`form-input ${
                                    usernameError
                                        ? "form-input-error"
                                        : undefined
                                }`}
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Username"
                                value={usernameInput}
                                onChange={(e) =>
                                    usernameOnChange(e.target.value)
                                }
                                onFocus={() => setUsernameOnFocus(true)}
                                onBlur={() => setUsernameOnBlur(true)}
                            />
                        </div>
                        <div>
                            <span className="form-input-error">
                                {usernameError && (
                                    <div className="error-container">
                                        <span>{usernameError}</span>
                                    </div>
                                )}
                            </span>
                        </div>
                        <button
                            className="form-button"
                            disabled={
                                emailButtonState ||
                                usernameButtonState ||
                                passwordButtonState
                                    ? 0
                                    : 0
                            }
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <div className="sign-up__login-cta">
                    <small>
                        Already Signed up? <Link to="/login">click here</Link>
                    </small>
                </div>
            </div>
        </div>
    );
}

<<<<<<< HEAD
  
  return (
    <div className='sign-up'>
    <div className='sign-up__container'>
        
            <h2 className='sign-up__title'>Sign Up Here!! </h2>
        
        <form className='sign-up__form' onSubmit={handleOnSubmit}>
            
     
            <div className='form-container'>
                <div className='form-field'>
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
                <span className='form-input-error'>
                {emailError && (
                    <div className='error-container'>
                        <span>{emailError}</span>
                        </div>
                )}
                </span>
            </div>
            <div className='form-container'>
                <div className='form-field'>
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
                <span className='form-input-error'>
                {passwordError && (
                    <div className='error-container'>
                        <span>{passwordError}</span>
                        </div>
                )}
                </span>
            </div>
            <div className='form-container'>
                <div className='form-field'>
                   <input 
                   className={`form-input ${ passwordError ? "form-input-error" : undefined}`}
                   type={process.env.NODE_ENV === "production" ? "password" : "text"}
                   placeholder='Confirm Password'
                   value={confirmPassword}
                   onChange={(e) => setConfirmPassword(e.target.value)}
                   />
                </div>
                <span className='form-input-error'>
                {passwordError && (
                    <div className='error-container'>
                        <span>{passwordError}</span>
                        </div>
                )}
                </span>
            </div>
            <div className='form-container'>
                <div className='form-field'>
                    <input className={`form-input ${usernameError ? "form-input-error" : undefined}`}
                    type="text"
                    name="username"
                    id="username"
                    placeholder='Username'
                    value={usernameInput}
                    onChange={(e) => usernameOnChange(e.target.value)}
                    onFocus={()=> setUsernameOnFocus(true)}
                    onBlur={()=> setUsernameOnBlur(true)}
                    />
                </div>
                <div>
                <span className='form-input-error'>
                {usernameError && (
                    <div className='error-container'>
                        <span>{usernameError}</span>
                        </div>
                )}
                </span>
                </div>
            
 
                 <button className='form-button'>Submit</button>
            
          
            </div>
        </form>
        <div className='sign-up__login-cta'>
              <small>Already Signed up? <Link to="/login">click here to login</Link></small>
            </div>
    </div>
</div>
  )
}

export default Signup
=======
export default Signup;
>>>>>>> a4f1198db717b7b4412dc0aa16507502d13641f2
