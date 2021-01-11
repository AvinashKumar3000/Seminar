import React from "react";

import Items from "../components/RequestItem";
import '../css/common.css'
import '../css/Requests.css'



const Requests = (props) => {
    

    return (
        <div className="app-requests">
            <div className="a-app-head">
                REQUESTS PAGE
            </div>
            <div className="app-body">
               
                <div className="section">
                    <Items val="hai"></Items>
                </div>
            </div>
        </div>
    );
}

export default Requests;