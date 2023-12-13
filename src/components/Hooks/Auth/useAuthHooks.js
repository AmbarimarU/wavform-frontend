import {useState, useEffect, useCallback} from 'react';
import { jwtDecode }  from 'jwt-decode'

function useAuthHooks() {
  const [user, setUser] = useState(null);
  const jwtToken = window.localStorage.getItem("jwtToken")

  let decodedToken;

  if(jwtToken){
    decodedToken = jwtDecode(jwtToken)
  }

  const checkToken = useCallback(() => {
    if (jwtToken && decodedToken) {
      const currentTime = Date.now() / 1000;
      return decodedToken.exp >= currentTime;
    }
    return false;
  }, [jwtToken, decodedToken])

  const isAuthenicate = checkToken(decodedToken)

  const checkUser = useCallback (() => {
     if(!isAuthenicate){
        setUser(null)
    } else {
        setUser({
            email:decodedToken?.email,
            username: decodedToken?.username,
            id: decodedToken?.id,
        })
    } 
    

  }, [ isAuthenicate, decodedToken?.email, decodedToken?.username, decodedToken?.id])


  useEffect(() => {

    
    checkUser();
  
    
  }, [ checkUser])
  
 return [user, setUser, checkToken]
 
}

export default useAuthHooks;