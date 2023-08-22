import React from "react";
import { FaTh } from "react-icons/fa";
import { FiClipboard } from "react-icons/fi";
import { IoMdAddCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";
import "../App.css";

function Sidebar({ children }) {
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
            <div className="side__bar">
                <div className="top__section">
                    <h1 className="logo">Logo</h1>
                </div>
            
                {menu.map((item, index) => (
                    <NavLink to={item.path} key={index} className="link" activeClassName="active">
                          <div className="icon">{item.icon}</div>
                          <div className="link__text">{item.Name}</div>
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
