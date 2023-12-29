import React, { useState } from "react";
import { MusicToolHelpData } from "./MusicToolHelpData";
//import MusicToolHelpPage from "./MusicToolHelpPage";
import {useNavigate} from 'react-router-dom'
import "./MusicToolHelp.css";

function MusicToolHelp() {

    const [page] = useState(MusicToolHelpData)

    const [selectedItem, setSelectedItem] = useState(null)

    const navigate = useNavigate()

    
  
    const handleItemClick = (index) => {
        setSelectedItem(index === selectedItem ? null : index)
        navigate(`/musictoolhelp/${index}`)
      }

    // const [page, setPage] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [itemsPerPage] = useState(5);
    // const [pageNumberLimit] = useState(15);
    // const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(15);
    // const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
    // const topRef = useRef(null);

    // useEffect(() => {
    //     const getPage = async () => {
    //         const result = await MusicToolHelpData;
    //         setPage(result);
    //     };
    //     getPage();
    // }, []);
    // useEffect(() => {
    //     if (topRef.current) {
    //         topRef.current.scrollIntoView({ behavior: "smooth" });
    //     }
    // }, [currentPage]);
    // const indexOfLastPost = currentPage * itemsPerPage;
    // const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    // const currentPosts = page.slice(indexOfFirstPost, indexOfLastPost);

    // const pages = [];

    // for (let i = 1; i <= Math.ceil(page.length / itemsPerPage); i++) {
    //     pages.push(i);
    //     console.log(page.length);
    // }

    // const handleClick = (event) => {
    //     setCurrentPage(Number(event.target.id));
    // };

    // const renderPageNumbers = pages.map((number) => {
    //     return (
    //         <li
    //             key={number}
    //             id={number}
    //             onClick={handleClick}
    //             className={currentPage === number ? "active" : null}
    //         >
    //             {number}
    //         </li>
    //     );
    // });

    // const handleNextbtn = () => {
    //     setCurrentPage(currentPage + 1);

    //     if (currentPage + 1 > maxPageNumberLimit) {
    //         setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
    //         setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    //     }
    // };

    // const handlePrevbtn = () => {
    //     setCurrentPage(currentPage - 1);

    //     if ((currentPage - 1) % pageNumberLimit === 0) {
    //         setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    //         setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    //     }
    // };

    // let pageIncrementBtn = null;
    // if (pages.length > maxPageNumberLimit) {
    //     pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
    // }

    // let pageDecrementBtn = null;
    // if (minPageNumberLimit >= 1) {
    //     pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
    // }

    return (
        <div className="help">
            <h1 className="help-heading" >
                Music Tool Help
            </h1>
            <hr />
            <div className="MusicToolHelp">
      <div className="button-container">
        {page.map((item, index) => (
          <button key={item.id} className="help-buttons" onClick={() => handleItemClick(index)}>
          {item.title}
            </button>
         
        ))}
         {/* <MusicToolHelpPage page={page} />  */}
      </div>
    </div>
          
           {/* <MusicToolHelpPage page={currentPosts} /> */}

            {/* <div className="pageNumbers-container">
                <ul className="pageNumbers">
                    <li>
                        <button
                            onClick={handlePrevbtn}
                            disabled={currentPage === pages[0] ? true : false}
                            className="help-button"
                        >
                            Prev
                        </button>
                    </li>
                    {pageDecrementBtn}
                    {renderPageNumbers}
                    {pageIncrementBtn}
                    <li>
                        <button
                            onClick={handleNextbtn}
                            disabled={
                                currentPage === pages[pages.length - 1]
                                    ? true
                                    : false
                            }
                            className="help-button"
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </div> */}
        </div> 
    );
}

export default MusicToolHelp;
