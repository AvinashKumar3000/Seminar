import React,{useState} from "react";

import {Card} from 'react-bootstrap'
import db from '../services/crud'

import '../css/common.css'
import '../css/Requests.css'

const AcceptRequest = (props) => {
    
    const [listItems, setlistItems] = useState([])
    const load = async(e) => {
        e.preventDefault() 
        const ref = await db.getRef().collection("AcceptRequest")
        
        ref.get().then( (snap) => {
            var li = []
            snap.forEach( (doc) => {
                var obj = doc.data()
                li.push(obj)
            })
            console.log(li)
            setlistItems(li)
            window.alert("data reloaded successfully")
        })
    }

    return (
        <div className="app-requests">
            <div className="a-app-head">
                ACCEPT REQUEST LIST
                <button className="btn btn-success" style={{float:"right"}} onClick={(e) => load(e)}> REFRESH </button>
            </div>
            <div className="app-body">
                <div className="section bg-green">
                    {
                        listItems.map( (ele,i) => {
                            return (
                                <div className="app-req-item ">
                                    <Card style={{ width: '100%' }}>
                                        <Card.Body>
                                            <Card.Title>{ ele.seminar }</Card.Title>
                                            
                                            <Card.Subtitle className="mb-2 text-muted"> FROM - { ele.from.toDate().toString() } </Card.Subtitle>
                                            <Card.Subtitle className="mb-2 text-muted"> TO - { ele.to.toDate().toString() } </Card.Subtitle>
                                            <Card.Subtitle className="mb-2 text-muted"> DEPT - { ele.dept } </Card.Subtitle>
                                            
                                            <Card.Text>
                                                <div> EMAIL : { ele.email  } <br></br>
                                                desc : { ele.desc }</div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>   
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default AcceptRequest;