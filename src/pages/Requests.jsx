import React,{useState} from "react";

import Items from "../components/RequestItem";
import db from '../services/crud'

import '../css/common.css'
import '../css/Requests.css'

const Requests = (props) => {
    
    const [listItems, setlistItems] = useState([])

    const load = async(e) => {
        e.preventDefault();
        const ref = await db.getRef().collection("Requests")
        
        ref.get().then( (snap) => {
            var li = []
            snap.forEach( (doc) => {
                var obj = doc.data()
                obj["id"] = doc.id
                li.push(obj)
            })
            setlistItems(li)
            console.log(" the data is getting reloaded.. wait")
            window.alert("the data is reloaded successfully...")
        })
    }

   

    return (
        <div className="app-requests">
            <div className="a-app-head">
                REQUESTS PAGE
                <button className="btn btn-success" style={{float:"right"}} onClick={(e) => load(e)}> REFRESH </button>
            </div>
            <div className="app-body">
                <div className="section">
                    {
                        listItems.map( (ele,i) => {
                            return (
                                <Items val={ele} key={i+""} reload={load} ></Items>
                            )
                        })
                    }
                </div>
            </div>
            
        </div>
    );
}

export default Requests;