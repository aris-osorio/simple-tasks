import React from 'react'
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
            }).catch((error) => console.log(error));
        
            console.log(this.fname.value + "\n" + this.lname.value + "\n" + this.email.value + "\n" + this.pwd.value);
    }
    render()
    {
        switch(this.state.principal)
        {
            case "login":
                return(
                    <div>
                    <h1>Login</h1> 
                    <button onClick={this.signUp}>ir a registro</button>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" ref={txt => this.email = txt}></input><br></br>
                    <label for="pwd">Pasword:</label>
                    <input type="password" id="pwd" name="pwd" ref={txt => this.pwd = txt}></input><br></br>
                    <button onClick={this.dataCheck}>iniciar sesion</button>
                    </div>
                  );
            
            case "signUp":
                return(
                    
                    <div>
                        <h1>
                      Sign Up <button onClick={this.login}>ir a Login</button>
                    </h1>
                        <label for="fname">First name:</label>
                        <input type="text"  id="fname" name="fname" ref={txt => this.fname = txt}></input><br></br>
                        <label for="lname">Last name:</label>
                        <input type="text" id="lname" name="lname" ref={txt => this.lname = txt}></input><br></br>
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" ref={txt => this.email = txt}></input><br></br>
                        <label for="pwd">Pasword:</label>
                        <input type="password" id="pwd" name="pwd" ref={txt => this.pwd = txt}></input><br></br>
                        <button onClick={this.dataRegistrer}>registro</button>
                  </div>         
                );

            case "simpleTask"  :
                return(
                    <div>
                         <h1>welcome to simple simpleTask</h1>
                    </div>
                ); 
        }
    }
}