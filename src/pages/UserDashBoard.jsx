import { Button } from "react-bootstrap";
import React, { useState } from "react";
import DateTimePicker from 'react-datetime-picker';

import '../css/common.css';
import '../css/user.css';

const UserDashBoard = (props) => {
    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(new Date());
    const [email, setemail] = useState("")
    const [topic, setTopic] = useState("")
    const [desc, setDesc] = useState("")
    
    const validate = () => {
        if(email === "" || topic === "" || desc === ""){
            return false;
        }
        return true;
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // handle the submit action
        if(validate()){
            console.log(from)
            console.log(to)
            console.log(topic)
            console.log(desc)
            setemail("")
            setTopic("")
            setDesc("")
        }else{
            window.alert("the input fields cannot be empty")
        }
        return true;
    }

    return (
        <div className="app-user">
            <div className="app-head page-heading">
                User
            </div>
            <div className="app-body">
                <div className="sub-heading">
                    APPLICATION FORM
                </div>
                <form  className="user-app-form">
                      
                    <div className="row">
                        <div className="col">
                            <div>FROM</div>
                            <DateTimePicker
                                onChange={setFrom}
                                value={from}
                            />
                        </div>
                        <div className="col">
                            <div>TO</div>
                            <DateTimePicker
                                onChange={setTo}
                                value={to}
                            />
                        </div>
                                        
                    </div>
                    <div className="row">
                        <div className="col-100">
                            <div>email</div>
                            <input 
                                value={email} 
                                type="email"
                                onChange={ (e) => {
                                    setemail(e.target.value)
                                }} 
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-100">
                            <div>TOPIC</div>
                            <input 
                                value={topic} 
                                onChange={ (e) => {
                                    setTopic(e.target.value)
                                }} 
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-100">
                            <div>DESCRIPTION</div>
                            <textarea 
                                value={desc} 
                                onChange={ (e) => {
                                    setDesc(e.target.value)
                                }} 
                            />
                        </div>
                    </div>
                    <div className="submit-btn">
                         <Button className="btn" as="input" type="button" value="APPLY" onClick={ (e) => handleSubmit(e)} />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default UserDashBoard