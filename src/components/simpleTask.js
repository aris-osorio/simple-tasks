import React from 'react'
import Axios from 'axios'
import {toast} from 'react-toastify'
import NewTask from './newTask'
import PanelTask from './panelTask'
import '../App.css'
import Navbar from './navBar'

export default function SimpleTask(props)
{   
    document.title = 'Simple task';
    return(
            <div>
                <Navbar />
                <NewTask />
                <PanelTask />
            </div>
          )
    
}