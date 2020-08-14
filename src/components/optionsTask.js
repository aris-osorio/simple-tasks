import React from 'react'
import PubSub from 'pubsub-js'
import Axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function OptionTasks(props)
{
    const editTask=()=>
    {
        Axios.put(`https://academlo-todolist.herokuapp.com/tasks/`+props.id, 
        {   
            params:   
            {  
                content:  props.content,
                date: props.date
            }

        }).then(res =>
        {
            console.log(res)
            toast.success('Tarea guardada con exito')
            PubSub.publish('state', document.getElementById("select-tasks").value)        
            
        }).catch((error)=>
        {   
            toast.error('Hubo un error al borrar la tarea')
            console.log(error)
        });
    }
    const deleteTask=()=>
    {
        Axios.delete(`https://academlo-todolist.herokuapp.com/tasks/`+props.id, 
        {   

        }).then(res =>
        {
            console.log(res)
            toast.success('Tarea eliminada con exito')
            PubSub.publish('state', document.getElementById("select-tasks").value)        
            
        }).catch((error)=>
        {
            console.log(error)
        });
    }

    return(
            <div className="">
                <svg width="2em" height="2em" onClick={deleteTask} viewBox="0 0 16 16" className="bi bi-x icon-option" fillRule="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                    <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                </svg>
                <svg width="2em" height="2em" onClick={editTask} viewBox="0 0 16 16" className="bi bi-pencil-square icon-option" fillRule="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </div>
    )
}