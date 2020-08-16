import React from 'react'
import PubSub from 'pubsub-js'

export default function Navbar(props)
{
    return(
            <nav className="navbar navbar-light bg-light">
                <span className="navbar-brand mb-0 h1">Navbar</span>
                <span className="navbar-brand mb-0 h1">
                    <button className="btn-task" onClick={()=>{PubSub.publish('Modal-New', true)}}>New Task</button>
                </span>
                <input type="text" className="input-txt"  id="input-search" onChange={()=>{PubSub.publish('state', document.getElementById("select-tasks").value);}}   placeholder="Search your content task here"></input>
                <select className ="input-txt" id="select-tasks"  onChange={()=>{PubSub.publish('state', document.getElementById("select-tasks").value);}}>
                    <option value="All">All Tasks</option>
                    <option value="Today">Today</option>
                    <option value="Week">This Week</option>
                    <option value="Month">This Month</option>
                    <option value="Old">Old Tasks</option>
                </select>
            </nav>
          )
}