import React from 'react'
import SimpleTask from './simpleTask'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



toast.configure();
export default class Principal extends React.Component
{
    constructor()
    {
        super();
        this.state= {principal: "login"};
        this.fname = "";
        this.lname = "";
        this.email = "";
        this.pwd = "";
    }
    login = () =>
    {
        this.setState( {principal: "login"}, () => { 
            console.log(this.state.principal);
        });
        
    }
    signUp =  () =>
    {
        this.setState( {principal: "signUp"}, () => { 
            console.log(this.state.principal);
         });
    }
    dataCheck =() =>
    {
        axios.post(`https://academlo-todolist.herokuapp.com/login`, 
        {
            email: this.email.value,
            password: this.pwd.value
        
        }).then(res => 
            {
                console.log(res);
                console.log(res.data);

                this.setState( {principal: "simpleTask"}, () => { 
                    console.log(this.state.principal);
                });

                toast.success('inicio de sesion correcto : bienvenido')

            }).catch((error) => {
                console.log(error)
                toast.error('error datos invalidos')
                });

                console.log(this.email.value + "\n" + this.pwd.value);
    }
    dataRegistrer = () =>
    {
        axios.post(`https://academlo-todolist.herokuapp.com/register`, 
        {
            name: this.fname.value, 
            lastname: this.lname.value,
            email: this.email.value,
            password: this.pwd.value

        }).then(res => 
            {
                console.log(res);
                console.log(res.data);
                
                this.resetForm();
                
                toast.success('Registro correcto')

            }).catch((error) => {
                console.log(error)
                toast.error(error)
                });
        
            console.log(this.fname.value + "\n" + this.lname.value + "\n" + this.email.value + "\n" + this.pwd.value);
    }
    resetForm=()=>
    {
        document.getElementById("exampleInputEmail1").value = "";
        document.getElementById("exampleInputPassword1").value = "";
        document.getElementById("Inputfname1").value = "";
        document.getElementById("Inputlname1").value = "";
        document.getElementById("InputEmail1").value = "";
        document.getElementById("InputPassword1").value = "";
    }
    render()
    {
        switch(this.state.principal)
        {
            case "login":
                return(    
                    <div className="shadow p-3 mb-5 bg-white rounded position-absolute">
                        <h1>Login</h1>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" ref={txt => this.email = txt} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="xyz@domain.com"></input>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" ref={txt => this.pwd = txt} id="exampleInputPassword1" placeholder="Password"></input>
                            <small id="singUpHelp" className="form-text text-muted">Not a member?&nbsp;<a href='#' onClick={this.signUp}>Sing Up now</a></small>
                        </div>
                        <button className="btn btn-primary" onClick={this.dataCheck}>Login</button>
                    </div>     
                );

            case "signUp":
                return(    
                    <div className="shadow p-3 mb-5 bg-white rounded position-absolute">
                        <h1>Sing Up</h1>
                        <div className="form-group">
                            <label htmlFor="Inputfname1">Name</label>
                            <input className="form-control" ref={txt => this.fname = txt} id="Inputfname1" placeholder="Name"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Inputlname1">Last Name</label>
                            <input className="form-control" ref={txt => this.lname = txt} id="Inputlname1" placeholder="Last Name"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="InputEmail1">Email address</label>
                            <input type="email" className="form-control" ref={txt => this.email = txt} id="InputEmail1" aria-describedby="emailHelp" placeholder="xyz@domain.com"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="InputPassword1">Password</label>
                            <input type="password" className="form-control" ref={txt => this.pwd = txt} id="InputPassword1" placeholder="Password"></input>
                            <small id="singUpHelp" className="form-text text-muted">Already have account?&nbsp;<a href='#' onClick={this.login}>Login</a></small>
                        </div>
                        <button className="btn btn-primary" onClick={this.dataRegistrer}>Sing up</button>
                    </div>     
                );

            case "simpleTask":
                return(
                    <SimpleTask email = {this.email.value} pwd = {this.pwd.value} />
                );    
                
        }
    }
}