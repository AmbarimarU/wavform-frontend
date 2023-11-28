import React, {useEffect} from 'react'
import axios from 'axios'

function GetAllUsers() {
    useEffect(() => {
        fetchAllUsers();
      }, []);

      async function fetchAllUsers(){
        try {
           
           //let result = await Axios.get("/users")
           
           
            let result = await axios.get("http://localhost:3001/users",
            {
                headers: {
                    authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                },
            });
            
            
            console.log(result)
        } catch (error) {
            console.log(error)
            
        }
      }
      


  
  
    return (
    <div>GetAllUsers</div>
  )
}

export default GetAllUsers