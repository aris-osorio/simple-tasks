import React, {useState,useEffect} from 'react'
import DatePicker from 'react-datepicker'
import 'react-toastify/dist/ReactToastify.css'
import Axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

export default function NewTask()
{   
    let content 
    const [startDate, setStartDate] = useState(new Date());

    const addTask=()=>
    {
        Axios.post(`https://academlo-todolist.herokuapp.com/tasks`, 
        {
            content: content.value, 
            date: startDate,

        }).then(res => 
            {
                console.log(res.data);
                toast.success('Tarea Agregada con exito')
                resetContent()      

            }).catch((error) => {
                console.log(error)
                toast.error('Error al agregar tarea')
                
        });
        console.log(content.value+" "+startDate)
    }

    const resetContent=()=>
    {
        document.getElementById("Inputcontent1").value = "";
    }

    return(

        <div>
            <div className="row p-3">
               <div className="form-group col-12">
                   <h1 className="color-blue-1">Add new task</h1>
               </div>   
            </div>    
            <div className="d-flex row p-3">  
                <div className="form-group col-4">
                    <label htmlFor="Inputcontent1" className="color-blue-1">Content</label>
                    <br></br>
                    <input type="text" className="input-txt" ref={txt => content = txt} id="Inputcontent1"  placeholder="Put your tasks here"></input>
                </div>
                <div className="form-group col-4">
                        <label htmlFor="Inputdate1" className="color-blue-1">Date</label>
                        <br></br>
                        <DatePicker className="input-txt" id="Imputdate1" selected={startDate} onChange={date => setStartDate(date)} />
                </div>
                <div className="form-group col-4">
                    <button className="btn-task" onClick={addTask}>New task</button>
                </div>
             </div>
        </div>
    )
}