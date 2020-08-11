import React from 'react'
import Axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {toast} from 'react-toastify'
import PanelTask from './panelTask'
import 'react-toastify/dist/ReactToastify.css'
import '../App.css'

export default function SimpleTask(props)
{   
    
    document.title = 'Simple task';
    return(
            <div className="p-3">
                <h1>welcome to simple task</h1>
                <div>
                    <label htmlFor="InputPassword1">date</label> <br></br>
                    <label htmlFor="exampleFormControlTextarea1">notes</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    <button className="btn btn-primary" >save task</button>
                </div>
                
            </div>
          )
    
}