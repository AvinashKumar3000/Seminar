import React from "react";
import { Link } from 'react-router-dom'

import '../css/NavBar.css'

const NavBar = (props) => {
    return (
        <div className="app-nav">
            {props.items.map( (ele) => {
                return (
                    <Link className="nav-item" to={ele.path}>{ele.name}</Link>
                )
            })}
            
        </div>
    )
}

export default NavBar;