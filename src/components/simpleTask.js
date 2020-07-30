import React from 'react'
import axios from 'axios'
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

export default class simpleTask extends React.Component
{
    constructor()
    {
        super();
    }
    getUsers=()=>
    {
       axios.get(`https://academlo-todolist.herokuapp.com/users`, 
       {
            params :   
            {  
                page: 2,
                limit: 20
            }
           
       }).then(res =>
        {
            console.log(res.data);

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
                <button className="btn btn-primary" onClick={this.getUsers}>Get users</button>          
            </div>
        );
    }
}