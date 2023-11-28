import { useState, useEffect } from "react";
//import { isStrongPassword } from "validator";

function PasswordCheck() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [onBlur, setOnBlur] = useState(false);
  const [onFocus, setOnFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordButtonState, setpasswordButtonState] = useState(true);

  useEffect(() => {
    if (onBlur || (onFocus && input.length > 1)) {
      if (confirmPassword !== input) {
        setError("password and confirm password must match");
        setpasswordButtonState(true);
      } else {
        setError(false);
        setpasswordButtonState(false);
      }
    }
  }, [input, confirmPassword]);

  useEffect(() => {
    if (onBlur || (onFocus && input.length > 1)) {
      if (input.length === 0) {
        setError(`Password cannot be empty`);
        setpasswordButtonState(true);
      } else {
        setError(false);
        setpasswordButtonState(false);
      }
    }
  }, [input, onBlur, onFocus]);

  return [
    input,
    setInput,
    error,
    setOnFocus,
    setOnBlur,
    confirmPassword,
    setConfirmPassword,
    passwordButtonState,
  ];
}

export default PasswordCheck;