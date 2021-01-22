import { Button } from "react-bootstrap";
import React, { useState } from "react";
import DateTimePicker from 'react-datetime-picker';

import db from "../services/crud";
import {auth} from '../Firebase'
import '../css/common.css';
import '../css/user.css';



const UserDashBoard = (props) => {
    const [userAuth,setuserAuth] = useState(false)
    const [seminarList,setseminarList] = useState([])
    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(new Date());
    const [email, setemail] = useState("")
    const [seminar, setseminar] = useState("Main_Auditorium")
    const [topic, setTopic] = useState("")
    const [dept, setdept] = useState("CSE")
    const [desc, setDesc] = useState("")

    const emailValidation = (txt) => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(txt))
        {
            return (true)
        }
        alert("You have entered an invalid email address!")
        return (false)
    }

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
        if(emailValidation(email) === false){
            return false
        }
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
                window.alert("There is a promblem with the network")
            });
            setemail("")
            setTopic("")
            setDesc("")
        }else{
            window.alert("the input fields cannot be empty")
        }
        return true;
    }

    const openAuth = async(e) => {
            e.preventDefault()
            var provider = new auth.GoogleAuthProvider();
            var res = await auth().signInWithPopup(provider).then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                // The signed-in user info.
                var user = result.user;
                console.log(credential)
                console.log(user.email)
                setemail(user.email)
                setuserAuth(true)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                setuserAuth(false)
            });
            console.log(res)
    }

    const logout = async(e) => {
        e.preventDefault()
        const res = await auth().signOut().then(() => {
            // Sign-out successful.
            setuserAuth(false)
            setTopic("")
            setDesc("")
          }).catch((error) => {
            // An error happened.
          });
          
          console.log(res)
    }
    if(userAuth){
        return (
            <div className="app-user">
                <div className="app-head page-heading">
                    User
                    <button onClick={(e)=>logout(e)} className="btn btn-primary" style={{float:"right",marginTop:"-20px"}}> log out </button>
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
                                    readOnly={true}
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
    }else{
        return (
            <div className="app" >
                <div class="container p-3 my-3 bg-dark text-white">
                    <h1>User authentication page</h1>
                    <p>Every user must signin with google inorder to submit your seminar booking.</p>
                </div>
                <div className="container col"
                    style={{
                        marginTop:"100px"
                    }}
                >
                    <img src="https://www.google.co.in/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
                    alt="google pic"
                    style={
                        {
                        height:"100px",
                        width:"250px",
                        margin:"auto",
                    }
                        
                    }
                    
                    />
                    <div class="row">
                        <div class="col-md-12" >
                            <div class="btn btn-lg btn-google btn-block btn-outline"  onClick={(e)=>{e.preventDefault();openAuth(e)}}>
                            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="google logo" style={{marginRight:"20px"}}/> Sign in with Google
                        </div> 
                        </div>
                    </div> 
                </div>
            </div>
        )
    }
}
export default UserDashBoard