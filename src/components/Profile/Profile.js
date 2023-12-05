import React,{useState} from 'react';
import profile from './profile.png'
import Avatar from 'react-avatar'
import './Profile.css'

function Profile({user}) {
   
  const [file, setFile] = useState();
    
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
 



  return (
    <div>
       {/* <div style={{ display: "flex" }}>
      <h4>How to use Avatar Component in ReactJS?</h4>
      <Avatar
        style={{ border: "2px solid gray", margin: 10 }}
        alt="GeeksforGeeks Pic 1"
        src={profile}

      />
      {/* <Avatar
        style={{ border: "1px solid black", margin: 20 }}
        alt="GeeksforGeeks Pic 2"
        src=
"https://write.geeksforgeeks.org/static/media/Group%20210.08204759.svg"
      /> */}
    <div className='table-heading'>
             <h1>{user.username}'s Profile</h1>
        </div>
    <div className='table-container'>
       <table id='profile'>
        <tbody>
                <tr>
                    <th>
                    <Avatar
                    style={{ border: "2px solid gray", margin: 10 }}
                    alt="GeeksforGeeks Pic 1"
                    src={file? file : profile}
                    
                    />
                    <input type="file" onChange={handleChange} />
                        {user.username} Saved Sequences</th>
                </tr>
            <tr> <td>Username: {user.username}</td> </tr>
            <tr> <td>Email: {user.email}</td> </tr>
            <tr><td>{user.username} Saved Sequences: Add saved sequences here</td> </tr>
            </tbody>
     </table>
          
       </div>
      
    </div>
  );
}

export default Profile;
