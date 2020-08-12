import React, {useState,useEffect} from 'react'
import Axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'

export default function PanelTask(props)
{  
    let showList
    let tasks = []
    let count = 1

    const [task, setTasks] = useState("Inicial");

    useEffect(() => 
    {
       getTasks();

    }, [])
   
    const getTasks=()=>
    {
       Axios.get(`https://academlo-todolist.herokuapp.com/tasks`, 
       {
           params:   
           {  
               page:  count,
               limit: 20 
           }
       
       }).then(res =>
       {
           tasks.push(res.data.results)
           if(count < res.data.totalPages)
           {
               count++
               getTasks()         
           }
           else
           {   
               setTasks(tasks)
           }
              
       }).catch((error)=>
       {
           console.log(error)
       });
    }     
    const printTask=()=>
    {
        let html = [] 
        let key = 0

        for(let i = 0; i < task.length; i++)
        {
          for(let j = 0; j< task[i].length;j++)
          {
            html.push(
                        <div key={key++} class="col-sm-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">{task[i][j].date}</h5>
                                    <p class="card-text">{task[i][j].content}</p>
                                </div>
                            </div>
                        </div>
                     )
          }
        }
        return html
    }

    if(task === "Inicial")
    {
        showList = (<h1>no hay nada master</h1>)
    }
    else 
    {
        showList = printTask()  
    }
    return(
  
        <div id="tasks" className="border bg-light p-1">
            <div class="row">
                {showList} 
            </div>   
        </div>
    )
}