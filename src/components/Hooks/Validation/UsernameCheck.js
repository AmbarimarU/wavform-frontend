import {useState, useEffect} from 'react'
import {isAlphanumeric} from 'validator'

function UsernameCheck() {
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);
    const [onBlur, setOnBlur] = useState(false);
    const [onFocus, setOnFocus] = useState(false);
    const [usernameButtonState, setUsernameButtonState] = useState(true)
  
    useEffect(() => {
        if (onBlur || (onFocus && input.length > 1)) {
          if (input.length === 0) {
            setError(`Username cannot be empty`);
            setUsernameButtonState(true)
          } else if (!isAlphanumeric(input)) {
            setError(`Username cannot have special characters, only characters and numbers`);
            setUsernameButtonState(true)
          } else {
            setError(false);
            setUsernameButtonState(false)
          }
        }
      }, [input, onBlur, onFocus]);
    
      return [input, setInput, error, setError, setOnFocus, setOnBlur, usernameButtonState];
    }


export default UsernameCheck