import { useState, useEffect } from "react";
import { isEmail } from "validator";

function EmailCheck() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [onBlur, setOnBlur] = useState(false);
  const [onFocus, setOnFocus] = useState(false);

  const [emailButtonState, setEmailButtonState] = useState(true)

  useEffect(() => {
    if (onBlur || (onFocus && input.length > 1)) {
      if (input.length === 0) {
        setError(`${input} cannot be empty`);
        setEmailButtonState(true)
      } else if (!isEmail(input)) {
        setError(`${input} is not a valid email, Please try again`);
        setEmailButtonState(true)
      } else {
        setError(false);
        setEmailButtonState(false)
      }
    }
  }, [input, onBlur, onFocus]);

  return [input, setInput, error, setOnFocus, setOnBlur, emailButtonState];
}

export default EmailCheck;