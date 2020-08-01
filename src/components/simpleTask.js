import React from 'react'
import axios from 'axios'
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

export default class simpleTask extends React.Component
{
    constructor()
    {
        super()
        this.id ="";
        this.count = 1;
    }
    componentDidMount()
    {
        this.getUsers()
    }
    getUsers=()=>
    {
        axios.get(`https://academlo-todolist.herokuapp.com/users`, 
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
                this.count++
                console.log(this.count)
                this.getUsers()
            }
            else
            {
                this.id = this.id[0]._id
                console.log(this.id)
            }
               
        }).catch((error)=>
        {
            console.log(error)
        });
    }
    render()
    {
        return(
            <div className="shadow p-3 mb-5 bg-white rounded position-absolute">
                <h1>welcome to simple task</h1>
                <h2>{this.props.email}</h2>
                <h2>{this.props.pwd}</h2>
                <button className="btn btn-primary">Get users</button>          
            </div>
        );
    }
}