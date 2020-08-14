import React from 'react'
import Navbar from './navBar'
import NewTask from './newTask'
import PanelTask from './panelTask'
import '../App.css'
import Footer from './footer'

export default function SimpleTask()
{   

    document.title = 'Simple task';
    return(
            <div>
                <Navbar />
                <NewTask />
                <PanelTask />
                <Footer />
            </div>
          )   
}