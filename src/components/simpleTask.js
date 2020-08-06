import React from 'react'
import Axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../App.css'

export default class simpleTask extends React.Component
{
    constructor()
    {
        super()
        this.state = {date: new Date()}
        this.text =""
        this.id =""
        this.taskId = ""
        this.count = 1
        this.countt = 1
        this.tasks = []
    }
    componentDidMount()
    {
        this.removeClass()
        this.getUsers()
        this.getTasks()
    }
    editTask(id, content, date)
    {
        Axios.put(`https://academlo-todolist.herokuapp.com/tasks/`+id, 
        {   
            params:   
            {  
                content:  content,
                date: date
            }

        }).then(res =>
        {
            console.log(res)        
            
        }).catch((error)=>
        {
            console.log(error)
        });
    }
    deleteTask(id)
    {
        Axios.delete(`https://academlo-todolist.herokuapp.com/tasks/`+id, 
        {   

        }).then(res =>
        {
            console.log(res)        
            
        }).catch((error)=>
        {
            console.log(error)
        });
    }
    printTasks=()=>
    {
        let html = []
        this.tasks.forEach(task =>
        {
            html.push (<div className="shadow-sm m-1 p-1 rounded bg-white" id={task._id}>
                            <label className="text-muted">{task.date}</label>
                            <label className="text-info">{task.content}</label>
                            <div className="float-right">
                                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-cloud-upload icon-styles rounded-circle"fillRule="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
                                    <path fillRule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                </svg>
                                <svg width="1.5em" height="1.5em" onClick={() => this.editTask(task._id, task.content, task.date)} viewBox="0 0 16 16" className="bi bi-pencil icon-styles rounded-circle" fillRule="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
                                    <path fillRule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
                                </svg>
                                <svg width="1.5em" height="1.5em" onClick={() => this.deleteTask(task._id)} viewBox="0 0 16 16" className="bi bi-x icon-styles rounded-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                                    <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                                </svg>
                            </div>
                         </div>) 
                                
        })
            return html;
    }
    getTasks=()=>
    {
        Axios.get(`https://academlo-todolist.herokuapp.com/tasks`, 
        {
            params:   
            {  
                page:  this.countt,
                limit: 20 
            }
        
        }).then(res =>
        {
            this.tasks = res.data.results
            console.log(res)
            console.log(this.tasks)
            this.printTasks()
            this.setState({date: new Date()})        
            if(this.countt < res.data.totalPages)
            {
                this.countt++
                this.getTasks()
            }
            else
            {
                this.countt = 1
                this.tasks = ""
            }
               
        }).catch((error)=>
        {
            console.log(error)
        });
    }
    getUsers=()=>
    {
        Axios.get(`https://academlo-todolist.herokuapp.com/users`, 
        {
            params :   
            {  
             page:  this.count,
             limit: 20
            }
        
        }).then(res =>
        {
            this.id = res.data.results.filter(result =>{
              return result.email == this.props.email
            })
            
            if(this.id[0] == null)
            {
                console.log(this.count)
                this.count++
                this.getUsers()
            }
            else
            {
                this.id = this.id[0]._id
                console.log(this.id)
                this.count = 1;
            }
               
        }).catch((error)=>
        {
            console.log(error)
        });
    }
    removeClass=()=>
    {
        let bgPrincipal = document.getElementsByClassName("bg-principal")
        let bgOpacity = document.getElementsByClassName("bg-opacity")
        bgPrincipal[0].classList.remove("bg-principal")
        bgOpacity[0].classList.remove("justify-content-center")
        bgOpacity[0].classList.remove("position-relative")
        bgOpacity[0].classList.remove("d-flex")
        bgOpacity[0].classList.remove("align-items-center")    
        bgOpacity[0].classList.remove("bg-opacity")

    }
    onChange =(date)=>
    {
        this.setState({date: date})
    }
    addTask=()=>
    {
        Axios.post(`https://academlo-todolist.herokuapp.com/tasks`, 
        {
            content: this.text.value, 
            date: this.state.date,
            user_id: this.id

        }).then(res => 
            {
                console.log(res.data);  
                toast.success('Registro correcto')

            }).catch((error) => {
                console.log(error)
                toast.error(error)
                });
        
    }
    render()
    {
        function handleClick(e) 
        {
            e.preventDefault()
            console.log('The link was clicked.')
           
        }
        
        return(
            <div className="p-3">
                <h1>welcome to simple task</h1>
                <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-plus-circle icon-styles rounded-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
                    <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                </svg>
                <div>
                    <label htmlFor="InputPassword1">date</label> <br></br>
                    <DatePicker selected={this.state.date} onChange={this.onChange} dateFormat="dd/MM/yyyy"/><br></br>
                    <label htmlFor="exampleFormControlTextarea1">notes</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" ref={txt => this.text = txt} rows="3"></textarea>
                    <button className="btn btn-primary" onClick={this.addTask}>save task</button>
                </div>
                <div id="tasks" className="border bg-light p-3">
                    {this.printTasks()}
                </div>
            </div>
        );
    }
}