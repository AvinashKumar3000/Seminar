import React,{useState} from "react";
import {Navbar,Nav,Form} from 'react-bootstrap'

import Requests from '../pages/Requests'
import Home from "../pages/Home";
import AcceptRequest from "../pages/AcceptRequest";
import RejectRequest from "../pages/RejectRequest";


import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AdminDash.css'



const AdminDash = (props) => {
    const [st,setst] = useState(1)

    const defaultColor = {color:"grey"}
    const active = {color:"skyblue"}

    const page1 = (<Home></Home>)
    const page2 = (<Requests></Requests>)
    const page3 = (<AcceptRequest></AcceptRequest>)
    const page4 = (<RejectRequest></RejectRequest>)
    let result = ""

    if( st === 1 ){
        result = page1
    }else if( st === 2 ){
        result = page2
    }else if(st === 3){
        result = page3
    }else{
        result = page4
    }

    const page1style = st === 1 ? active : defaultColor
    const page2style = st === 2 ? active : defaultColor
    const page3style = st === 3 ? active : defaultColor
    const page4style = st === 4 ? active : defaultColor
    
    
    return (
        <div className="app-admin">
            <div className="dash-heading">ADMIN DASH BOARD</div>
            
            <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                    <Nav.Link onClick={ (e) => { setst(1) }} ><p style={page1style}>HOME</p></Nav.Link>
                    <Nav.Link onClick={ (e) => { setst(2) }} ><p style={page2style}>REQUESTS</p></Nav.Link>
                    <Nav.Link onClick={ (e) => { setst(3) }} ><p style={page3style}>ACCEPTS</p></Nav.Link>
                    <Nav.Link onClick={ (e) => { setst(4) }} ><p style={page4style}>REJECTS</p></Nav.Link>
                </Nav>
                <Form inline>
                    <button className="btn btn-primary" style={{width:"100px"}}
                        onClick={(e)=>{
                            props.changeAuth("false")
                        }}
                    >Log out</button>
                </Form>
            </Navbar>
            
            {result}
        </div>
    )
}

export default AdminDash;