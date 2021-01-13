import React, {useState} from 'react'

import db from "../services/crud";
import '../css/home.css'

const Home = () => {
    const [name, setname] = useState("")
    const [items,setItems] = useState([])
    
    const load = async(e) => {
        var ref = await db.getRef().collection("Management")
        ref.get().then(function(docs) {
            var li = []
            docs.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                li.push(doc.id)
            });
            setItems(li)
        })
        
    }
    const addItem = async(e) => {
        if(name!=="" && !name.includes(" ")){
            e.preventDefault();
            setItems([...items,name])
            console.log(items)
            setname("")

            var ref = await db.getRef().collection("Management")
            ref.doc(name).set({
                ItemsList:[]
            })

        }else{
            window.alert("empty input or space cannot be used as a input.")
        }
        return true;
    }

    const deleteItem = async (e,id) => {
        e.preventDefault()
        if(window.confirm("are you sure you want to delete : "+ items[id])){
            var ref = await db.getRef().collection("Management")
            ref.doc(items[id]).delete();
            setItems(
                items.filter( (v,i) => {
                    return (i!==id)
                })
            )    
        }else{
            window.alert("delete operation cancelled")
        }
        
       return true;
    }
    load();
    return (
        <div className="app-home">
            <div className="">
                HOME PAGE        
            </div>
            <br/>
            <div className="app-form">
                <div className="form-group">
                    <label>Seminar hall name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter seminar hall name" 
                        onChange={ e => setname(e.target.value)} 
                        value={name}
                    />
                </div>
                <button className="btn btn-dark btn-lg btn-block" style={{width: "200px"}} onClick={(e) => addItem(e)}> Add seminar</button>
            </div>
            
            <div className="app-list-items">
                
                {
                    items.map( (ele,i) => {
                        return(
                            <div className="app-item" key={(i)+""}>
                                <div className="seminar-name">{ele}</div>
                                <button className="btn btn-dark btn-block" onClick={(e) => deleteItem(e,i)} >DELETE</button>
                                <button className="btn btn-dark btn-block" style={{margin:"20px"}}><a style={{textDecoration:"none",color:"white",margin:"0px"}} href={"/Welcome/"+ele}  target="_blank" rel="noreferrer">OPEN</a></button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;