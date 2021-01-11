import React,{useState} from "react";
import {Navbar,Nav} from 'react-bootstrap'

import Requests from '../pages/Requests'
import Home from "../pages/Home";


import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AdminDash.css'



const AdminDash = () => {
    const [st,setst] = useState(1)

    const defaultColor = {color:"grey"}
    const active = {color:"skyblue"}

    const page1 = (<Home></Home>)
    const page2 = (<Requests></Requests>)
    const result = st === 1 ? page1 : page2

    const page1style = st === 1 ? active : defaultColor
    const page2style = st === 2 ? active : defaultColor
    
    return (
        <div className="app-admin">
            <div className="dash-heading">ADMIN DASH BOARD</div>
            
            <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                    <Nav.Link onClick={ (e) => { setst(1) }} ><p style={page1style}>HOME</p></Nav.Link>
                    <Nav.Link onClick={ (e) => { setst(2) }} ><p style={page2style}>REQUESTS</p></Nav.Link>
                </Nav>
            </Navbar>
            {result}
        </div>
    )
}

export default AdminDash;