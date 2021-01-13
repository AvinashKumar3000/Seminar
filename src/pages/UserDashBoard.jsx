import { Button } from "react-bootstrap";
import React, { useState } from "react";
import DateTimePicker from 'react-datetime-picker';

import db from "../services/crud";

import '../css/common.css';
import '../css/user.css';


const UserDashBoard = (props) => {
    const [seminarList,setseminarList] = useState([])
    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(new Date());
    const [email, setemail] = useState("")
    const [seminar, setseminar] = useState("Main_Auditorium")
    const [topic, setTopic] = useState("")
    const [dept, setdept] = useState("CSE")
    const [desc, setDesc] = useState("")


    const getSeminarList = async () => {
        var ref = await db.getRef().collection("Management")
        ref.get().then( (snap) => {
            var li = []
            snap.forEach( (doc) => {
                li.push(doc.id)
            })
            setseminarList(li)
        })
    }

    getSeminarList()
    const validate = () => {
        if(email === "" || topic === "" || desc === ""){
            return false;
        }
        return true;
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // handle the submit action
        if(validate()){
            var doc = db.getRef().collection("Requests")
            doc.add({
                from:from,
                to:to,
                topic:topic,
                email:email,
                desc:desc,
                dept:dept,
                seminar:seminar
            }).then(
                window.alert("Your have submitted successfully")
            ).catch(function(error) {
                window.prompt("There is a promblem with the network")
            });
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
                                key="setFrombtn"
                            />
                        </div>
                        <div className="col">
                            <div>TO</div>
                            <DateTimePicker
                            key="setTobtn"
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
                        <div className="col-100">DEPARTMENT</div>
                        <div>
                            <select value={dept} onChange={(e) => setdept(e.target.value)} >
                                <option value="CSE">CSE</option>
                                <option value="ECE">ECE</option>
                                <option value="EEE">EEE</option>
                            </select>
                        </div>
                    </div>
                    <div  className="row">
                        <div className="col-100">SEMINAR HALL</div>
                        <div>
                            <select value={seminar} onChange={(e) => setseminar(e.target.value)} >
                                {
                                    seminarList.map( (ele) => {
                                        return (
                                            <option value={ele}>{ele}</option>
                                        )
                                    })
                                }       
                            </select>
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
                         <Button key="userBtn" className="btn" as="input" type="button" value="APPLY" onClick={ (e) => handleSubmit(e)} />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default UserDashBoard