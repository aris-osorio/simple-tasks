import React from 'react'
import PubSub from 'pubsub-js'

export default function Navbar(props) {
    const titleStyle = {
        height: '90px',
    };

    return (
        <nav className="navbar text-center">
            <div className="col-12 p-0 ">
                <div style={titleStyle}>
                    <h1 className="font-weight-light color-blue-1">SIMPLE</h1>
                    <h1 className="font-weight-light color-blue-1  position-relative task-position">TASK</h1>
                </div>
            </div>
            <input type="text" className="input-txt col-12 mb-4" id="input-search" onChange={() => { PubSub.publish('state', document.getElementById("select-tasks").value); }} placeholder="Search your content task here"></input>
            <select className="input-txt col-12 mb-4" id="select-tasks" onChange={() => { PubSub.publish('state', document.getElementById("select-tasks").value); }}>
                <option value="All">All Tasks</option>
                <option value="Today">Today</option>
                <option value="Week">This Week</option>
                <option value="Month">This Month</option>
                <option value="Old">Old Tasks</option>
            </select>
            <span className="navbar-brand mb-0 h1 col-12 p-0">
                <button className="btn-task" onClick={() => { PubSub.publish('Modal-New', true) }}>New Task</button>
            </span>
        </nav>
    )
}