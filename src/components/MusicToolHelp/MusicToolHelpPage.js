import React from 'react'
import './MusicToolHelp.css'

function MusicToolHelpPage({page}) {
 
return (
    <div className='MusicToolHelp'>
        <ul>
        {page.map((item) => {
            return(
                <div key={item.id}>
                    <h3>{item.title}</h3>
                     <p>{item.content}</p>
                    
                </div>
            )
         })}
         
        </ul>
    </div>
  )
}

export default MusicToolHelpPage