import React from 'react';

import admin from './admin.svg';
import user from './student.svg';

import './App.css';

const App = () => {
  
  return (
    <div className="App" >
      <div className="App-header">
        <p>SEMINAR HALL MANAGEMENT</p>
      </div>
      <div className="App-body">
          <div className="app-box flex">
            <div className="flex">
                <div className="app-user-logo">
                  <img src={user} alt="user Logo" />
                </div>
                <div className="app-container">
                    <div className="head">User Panel</div>
                    <div>
                       <ul>
                         <li> The users are can apply for the seminar hall booking here.</li>
                         <li> Apply for the seminar and wait.</li>
                       </ul>
                    </div>
                    <div className="link">
                        <a href="/user" >proceed</a>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="app-admin-logo">
                  <img src={admin} alt="admin Logo" />
                </div>`
                <div className="app-container">
                    <div className="head">Admin Panel</div>
                    <div>
                       <ul>
                         <li> Admin will accept or reject the requests send by the users.</li>
                         <li> Need admin authentication.</li>
                       </ul>
                    </div>
                    <div className="link">
                    <a href="/admin" >proceed</a>
                    </div>
                </div>
            </div>
          </div>
          <div className="app-foot">
          <div className="app-container">
                    <div className="head">contact details</div>
                    <div>
                       <ul>
                         <li> PHONE NUMBER : 452154245</li>
                         <li> EMAIL ID : sample@gmail.com</li>
                         <li> WHATSAPP NUMBER : 154548</li>
                       </ul>
                    </div>
                   
                </div>
          </div>
      </div>
    </div>
   
  );
}

export default App;
