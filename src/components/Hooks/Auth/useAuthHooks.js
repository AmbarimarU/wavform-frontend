import {useState, useEffect} from 'react';
import { jwtDecode }  from 'jwt-decode'

function useAuthHooks() {
  const [user, setUser] = useState(null);

  const jwtToken = window.localStorage.getItem("jwtToken")

  let decodedToken;

  if(jwtToken){
    decodedToken = jwtDecode(jwtToken)
  }

  useEffect(() => {
    let user = checkToken()

    if(!user){
        setUser(null)
    } else {
        setUser({
            email:decodedToken.email,
            username: decodedToken.username,
            id: decodedToken.id,
        })
    }
  
    
  }, [])
  

  function checkToken () {
    if (jwtToken){
        const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime){
        window.localStorage.removeItem("jwtToken");
        return false
    } else {
        return true
      }
    }
  }
    return [user, setUser, checkToken]
}

export default useAuthHooks;