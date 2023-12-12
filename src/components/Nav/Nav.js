import React, {useState} from 'react'
import {Link, NavLink} from 'react-router-dom'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";

import './Nav.css'

function Nav({user, logout}) {

const [sidebar, setSidebar] = useState(false);

const showSidebar = () => setSidebar(!sidebar);

return (
  <IconContext.Provider value={{ color: "#fff" }}>
   <div className='header-container'>
     <button onClick={showSidebar} className='nav-icon' >
	<FaIcons.FaBars />
	</button>
       <div className='logo'>
       <Link to="/"> <img src='./4.png' alt='' /> </Link> 
        </div>
        <h1 className='title'> Wavform </h1>
          <div  className='sidebar-nav' style={{ left: sidebar ? "0" : "-100%"}}>
                    <div className='sidebar-wrap'>
                     <button onClick={showSidebar} className='nav-icon'>
	                 <AiIcons.AiOutlineClose />
	                 </button>
                     {SidebarData.map((item, index) => {
                            return (
                                <SubMenu
                                    item={item}
                                    key={index}
                                />
                            );
                        })}
                    </div>
                </div >
         <div className='nav-links'>
        {user ?(
           <>
           {" "}
           <NavLink 
           to="/welcome"
           className={({isActive}) => 
           isActive ? "active-nav-link" : undefined
           }
           >
           Home
           </NavLink>
           <NavLink 
           to="/about"
           className={({isActive}) => 
           isActive ? "active-nav-link" : undefined
           }
           >
           About
           </NavLink>
          
           <NavLink
           to="/profile"
           className={({isActive}) => 
           isActive ? "active-nav-link" : undefined
           }
           >
            Hello {user.username} <FaIcons.FaRegUser/>
           </NavLink>
           <NavLink
           to="/"
           className={({isActive}) => 
           isActive ? "active-nav-link" : undefined
           }
           onClick={logout}
           >
           Logout
           </NavLink>
           </>
        ):(
          <>
          {" "}
          <NavLink 
          to="/welcome"
          className={({isActive}) => 
          isActive ? "active-nav-link" : undefined
          }
          >
          Home
          </NavLink>
          <NavLink 
          to="/about"
          className={({isActive}) => 
          isActive ? "active-nav-link" : undefined
          }
          >
          About
          </NavLink>
         
          <NavLink
          to="/signup"
          className={({isActive}) => 
          isActive ? "active-nav-link" : undefined
          }
          >
          Sign up
          </NavLink>
          <NavLink
          to="/login"
          className={({isActive}) => 
          isActive ? "active-nav-link" : undefined
          }
          >
          Login
          </NavLink>
          </>
        )}
     </div>

    </div>
    </IconContext.Provider>
  )
}


export default Nav;
