import React from 'react'
import Navbar from './navBar'
import NewTask from './newTask'
import ModalDelete from './modalDelete'
import ModalEdit from './modalEdit'
import PanelTask from './panelTask'
import Footer from './footer'
import '../App.css'


export default function SimpleTask()
{   

    document.title = 'Simple task';
    return(
            <div>
                <Navbar />
                <NewTask />
                <ModalDelete />
                <ModalEdit />
                <PanelTask />
                <Footer />
            </div>
          )   
}