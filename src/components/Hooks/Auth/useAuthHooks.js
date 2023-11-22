import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

function useAuthHooks() {
  const [user, setUser] = useState(null);
  const jwtToken = window.localStorage.getItem('jwtToken');

  useEffect(() => {
    let decodedToken;

    if (jwtToken) {
        console.log(jwtToken)
      decodedToken = jwtDecode(jwtToken);

      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        window.localStorage.removeItem('jwtToken');
        setUser(null);
      } else {
        setUser({
          email: decodedToken.email,
          username: decodedToken.username,
          id: decodedToken.id,
        });
      }
    }
  }, [jwtToken]);

  function checkToken() {
    return user !== null;
  }

  return [user, setUser, checkToken];
}

export default useAuthHooks;
