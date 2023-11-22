import { useState, useEffect } from "react";
import { isStrongPassword } from "validator";

function PasswordCheck() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [onBlur, setOnBlur] = useState(false);
  const [onFocus, setOnFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("")

  const [passwordButtonState, setPasswordButtonState] = useState(true)

useEffect(() => {
  if(onBlur || (onFocus && input.length > 1)){
    if (confirmPassword !== input){
        setError("Password does not match");
        setPasswordButtonState(true)
    }else{
            setError(false)
            setPasswordButtonState(false)
        }
    }
  
}, [input, confirmPassword])


  useEffect(() => {
    if (onBlur || (onFocus && input.length > 1)) {
      if (input.length === 0) {
        setError(`Password cannot be empty`);
        setPasswordButtonState(true)
      } else if (!isStrongPassword(input)) {
        setError(`Password must be at least 8 characters longs, 1 uppercase, 1 lowercase, 1 number, and 1 special characters`);
        setPasswordButtonState(true)
      } else {
        setError(false);
        setPasswordButtonState(false)
      }
    }
  }, [input, onBlur, onFocus]);

  return [input, setInput, error, setOnFocus, setOnBlur, confirmPassword, setConfirmPassword, passwordButtonState];
}

export default PasswordCheck;