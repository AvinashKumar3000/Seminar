import React from "react";

import '../css/Items.css'

const items =  (props) => {
    return (
       <div className="app-req-item">
           <div className="content">
               {props.val}
           </div>
           <div className="btn">
               accept
           </div>
           <div className="btn">
               reject
           </div>
       </div>
    )
}

export default items;