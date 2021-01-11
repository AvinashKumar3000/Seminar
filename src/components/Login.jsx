import React,{useState} from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AdminAuth.css';

const Login = (props) => {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    
    return (
         <div className="adminauth-app">
             <div className="form">

                    <h3>ADMIN LOG IN </h3>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Enter username" onChange={(e) => setusername(e.target.value) }/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => setpassword(e.target.value) }/>
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button onClick={() => props.handleClick(username,password)} className="btn btn-dark btn-lg btn-block" style={{width: "100px"}} >Sign in</button>
                    
            </div>
         </div>
    )
}

export default Login