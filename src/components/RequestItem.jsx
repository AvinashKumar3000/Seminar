import React from "react";
import {Card} from 'react-bootstrap'

import db from '../services/crud'
import '../css/Items.css'



const Items =  (props) => {

    const handleAccept = async(e) => {
       
        e.preventDefault()
        window.alert("wait for a moment please...")
        const ref = await db.getRef().collection("AcceptRequest")
        const delRef = await db.getRef().collection("Requests")
        const manRef = await db.getRef().collection("Management")
        
        manRef.get().then((snap)=> {
            var tempLi = []
            snap.forEach( (doc) => {
                tempLi.push(doc.data())
            })

            manRef.doc(props.val.seminar).set(
                { 
                    ItemsList: [
                        ...tempLi,
                        { 
                            RecurrenceRule: null,
                            StartTimezone: null,
                            Description: props.val.email + "; " + props.val.desc,
                            EndTime: props.val.to,
                            EndTimezone: null,
                            IsAllDay: false,
                            Location: '', 
                            Subject: props.val.topic,
                            StartTime: props.val.from,
                            Id: parseInt(Math.random()*100)
                        }
                    ]
            }
            ).then(()=>{
                console.log("the data is added to the calendar")
                console.log("the calendar name:"+props.val.seminar)
            })
        })
        
        

        delRef.doc(props.val.id).delete().then( () => {
            console.log("the data is now got deleted in the requests list")
            ref.add(props.val).then( () => {
                console.log("the data is now got added to accept list")
                props.reload(e)
            })
        })
        
        
        
    }
    const handleReject = async(e) => {
        e.preventDefault();
        window.prompt("wait for a moment please...")
        const ref = await db.getRef().collection("RejectRequest")
        const delRef = await db.getRef().collection("Requests")
        delRef.doc(props.val.id).delete().then(() => {
                ref.add(props.val).then( () => {
                    props.reload(e)
                })
            }
        )
        
    }
    return (
           <div className="app-req-item">
                <Card style={{ width: '100%' }}>
                    <Card.Body>
                        <Card.Title>{ props.val.seminar }</Card.Title>
                        <Card.Title>{ props.val.topic }</Card.Title>
                        
                        <Card.Subtitle className="mb-2 text-muted"> FROM - { props.val.from.toDate().toString() } </Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted"> TO - { props.val.to.toDate().toString() } </Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted"> DEPT - { props.val.dept } </Card.Subtitle>
                        
                        <Card.Text>
                            <div> EMAIL : { props.val.email  } <br></br>
                             desc : { props.val.desc }</div>
                        </Card.Text>
                        <div>
                            <button className="u-btn btn-primary" onClick={handleAccept}>accept</button>
                            <button className="u-btn btn-primary" onClick={handleReject}>refect</button>
                        </div>
                    </Card.Body>
                </Card>   
            </div>
   
    )

}

export default Items;