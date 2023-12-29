import React, {useState} from 'react';
import { MusicToolHelpData } from "./MusicToolHelpData";
import {useParams} from 'react-router-dom'
import './MusicToolHelp.css';

function MusicToolHelpPage() {
  
  const [page] = useState(MusicToolHelpData)

  const {id} = useParams()

  const selectedItem = page.find(item => item.id === parseInt(id, 10));

  console.log(selectedItem)

  if (!selectedItem) {
    return <div>Item not found</div>;
  }
  
  // const Collapse = ({ title, children }) => {
  //   const [isCollapsed, setIsCollapsed] = useState(false);

  //   return (
  //     <>
  //       <button
  //         className="collapse-button"
  //         onClick={() => setIsCollapsed(!isCollapsed)}
  //       >
  //       <span className={`button-text ${isCollapsed ? '' : 'expanded-text'}`}>
  //           {title}
  //       </span>
  //       <span className={`arrow ${isCollapsed ? '' : 'arrow-expanded'}`}>
  //           {isCollapsed ? '▼' : '▲'}
  //       </span>
  //       </button>
  //       <div
  //         className={`collapse-content ${isCollapsed ? 'collapsed' : 'expanded'}`}
  //         aria-expanded={isCollapsed}
  //       >
  //         {children}
  //       </div>
  //     </>
//    );
//  };

  return (
    <div className="MusicToolHelp">
      <ul>
        {/* {page.map((item) => (
        */}
            <div className='collapse-container' key={selectedItem.id}>
              <h3>{selectedItem.title}</h3>
              <img src={selectedItem.image} className= "collapse-image" alt='' />
              <p>{selectedItem.content}</p>
            </div>
          
        {/* ))} */}
      </ul>
    </div>
  );
}

export default MusicToolHelpPage;

