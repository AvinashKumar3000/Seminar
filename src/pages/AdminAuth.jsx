import React, { useState } from 'react'

import Login from '../components/Login'
import AdminDashBOard from '../pages/AdminDashBoard'

const AdminAuth = () => {
    const [authstatus, setauthstatus] = useState(false)
    const changeAuth = (status) => {
        setauthstatus(status)
    }
    const handleAuth = (username,password) => {
        if( username === "root" && password === "root"){
           setauthstatus(true)  
        }else{
            window.alert("username or password is incorrect...")
        }
    }

    const login = (<Login handleClick={handleAuth}></Login>)
    const dashBoard = (<AdminDashBOard changeAuth={changeAuth}></AdminDashBOard>)
    const renderObject = authstatus ? dashBoard:login
    
    return (
        <div className="adminauth-main-app">
            {renderObject}
        </div>
    )
}

export default AdminAuth



