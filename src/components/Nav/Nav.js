import React, {useState} from 'react'
import {Link, NavLink} from 'react-router-dom'
import styled from "styled-components";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";

import './Nav.css'

// const Nav = styled.div`
// background: #15171c;
// height: 80px;
// display: flex;
// justify-content: flex-start;
// align-items: center;
// `;

const NavIcon = styled(Link)`
margin-left: 2rem;
font-size: 2rem;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const SidebarNav = styled.nav`
background: #15171c;
width: 250px;
height: 100vh;
display: flex;
justify-content: center;
position: fixed;
top: 0;
left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
transition: 350ms;
z-index: 10;
`;

const SidebarWrap = styled.div`
width: 100%;
`;

function Nav({user, logout}) {

const [sidebar, setSidebar] = useState(false);

const showSidebar = () => setSidebar(!sidebar);

 return (
  <IconContext.Provider value={{ color: "#fff" }}>
   <div className='header-container'>
   
   <NavIcon to="#">
	
  					<FaIcons.FaBars
							onClick={showSidebar}
						/>
	</NavIcon>
       <div className='logo'>
        {/* //incorporate element from sidebar into navbar */}
         <Link to="/"> <img src='./4.png' alt='' /> </Link> 
        </div>
        <h1 className='title'> Wavform </h1>
          <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                        <NavIcon to="#">
                            <AiIcons.AiOutlineClose
                                onClick={showSidebar}
                            />
                        </NavIcon>
                        {SidebarData.map((item, index) => {
                            return (
                                <SubMenu
                                    item={item}
                                    key={index}
                                />
                            );
                        })}
                    </SidebarWrap>
                </SidebarNav>
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
