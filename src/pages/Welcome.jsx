import React, {useState} from "react";
import db from "../services/crud";

import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Welcome.css';

import {
    Inject, 
    ScheduleComponent, Week, Month,
    Day
  } from '@syncfusion/ej2-react-schedule'
  


const Welcome = (props) => {
    const ID = props.match.params.id
    const [items, setitems] = useState([])

    const refresh = () => {
        var doc = db.getRef().collection("Management").doc(ID)
        
        doc.get().then( (snap) => {
            console.log(snap.data())
            var itemsList = snap.data().ItemsList
            itemsList.forEach((ele,idx) => {
                itemsList[idx].StartTime = ele.StartTime.toDate()
                itemsList[idx].EndTime = ele.EndTime.toDate()
            })
            setitems(itemsList)
        })
        return 0;
    }

    const save = () => {
        // change the undefined value in the 
        if(window.confirm("Are you sure you want to save ?")){
                var va = items;
                va.forEach((ele,i) => {
                if(Object.keys(ele).includes("Description")){
                    if(ele.Description === undefined)
                        ele.Description  = ""
                    if(ele.Location === undefined)
                        ele.Location = ""
                }
            });
            setitems(va)
            
            var doc = db.getRef().collection("Management").doc(ID)
            
            doc.set({
                ItemsList:va 
            }).then( (ele) => {
                window.alert("your data is saved successfully")
            })

        }

    }

    const reset = () => {
        if(window.confirm("Are you sure you want to reset all data.")){
            var doc = db.getRef().collection("Management").doc(ID)
            doc.set({
                ItemsList:[]
            }).then( (ele) => {
                window.alert("You had successfully reset.")
                refresh()
            })
        }
    }

    return (
        <div className="main-section">
            
            <div className="header">
                <Button variant="success" className="btn" as="input" type="button" value="SAVE" onClick={ () => {save()}} />
                <Button className="btn" as="input" type="button" value="REFRESH" onClick={ () => {refresh()}} />
                <Button variant="danger" className="btn" as="input" type="button" value="RESET" onClick={ () => {reset()}} />
                <h5 class="welcome-heading">{ ID }</h5>
            </div>
            <div className="Calender">
                <ScheduleComponent 
                    currentView="Month" 
                    selectedDate={new Date()}
                    eventSettings={{ dataSource: items }}
                >
                    <Inject services={[Day,Week,Month]}></Inject>
                </ScheduleComponent>
            </div>
        </div>
    )
}

export default Welcome;