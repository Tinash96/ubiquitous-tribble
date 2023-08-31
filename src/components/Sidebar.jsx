import React,{useState} from "react";
import { FaTh,FaBars } from "react-icons/fa";
import { FiClipboard } from "react-icons/fi";
import { IoMdAddCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { GiMountaintop } from "react-icons/gi";

import "../App.css";


function Sidebar({ children }) {
    const [IsOpen,setIsOpen]= useState(false);
    const toggle=()=>setIsOpen(!IsOpen);
    const menu = [
        {
            path: "/",
            Name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/questionnaire",
            Name: "Questionnaire",
            icon: <FiClipboard />
        },
        {
            path: "/create",
            Name: "Create",
            icon: <IoMdAddCircle />
        }
    ];

    return (
        <div className="container">
            <div style={{width: IsOpen? " 300px": "50px"}}className="side__bar">
                <div className="top__section">
                    <h1 style={{display: IsOpen? "block": "none"}}className="logo">
                        < GiMountaintop /></h1>
                    <div style={{marginLeft: IsOpen? "50px" : "0px"}}className="bars">
                        <FaBars onClick={toggle}/>
                    </div>
                </div>
            
                {menu.map((item, index) => (
                    <NavLink to={item.path} key={index} className="link" activeClassName="active">
                          <div className="icon">{item.icon}</div>
                          <div style={{display: IsOpen? "block" : "none"}} className="link__text">{item.Name}</div>
                    </NavLink>
               ))}
            </div>
            <main>
                {children}
            </main>
        </div>
    );
}

export default Sidebar;
