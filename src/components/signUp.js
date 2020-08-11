import React, {useState} from 'react'
import Axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

export default function SignUp(props)
{
    let fname =""
    let lname =""
    let email =""
    let password =""

    const dataRegistrer = () =>
    {
        Axios.post(`https://academlo-todolist.herokuapp.com/register`, 
        {
            name: fname.value, 
            lastname: lname.value,
            email: email.value,
            password: password.value

        }).then(res => 
            {
                console.log(res);
                resetForm()
                toast.success('Registro correcto')

            }).catch((error) => {

                toast.error('error de registro')
                console.log(error)      
            });
    }

    const resetForm=()=>
    {
        document.getElementById("Inputfname1").value = "";
        document.getElementById("Inputlname1").value = "";
        document.getElementById("InputEmail1").value = "";
        document.getElementById("InputPassword1").value = "";
    }

    document.title = 'Sign up';
    return(
            <div className="shadow p-5 bg-white rounded">
                <div className="text-center logo-container position-relative">
                    <h1 className="font-weight-light color-blue-1">SIMPLE</h1>
                    <h1 className="font-weight-light position-absolute txt-task-position color-blue-1">TASK</h1>
                </div>
                <div className="form-group">
                    <label htmlFor="Inputfname1" className="color-blue-1">First name</label>
                    <br></br>
                    <input type="text" className="input-txt" ref={txt => fname = txt} id="Inputfname1"  placeholder="Richard"></input>
                </div>
                <div className="form-group">
                        <label htmlFor="Inputlname1" className="color-blue-1">Last name</label>
                        <br></br>
                        <input type="text" className="input-txt" ref={txt => lname = txt} id="Inputlname1"  placeholder="Brodie"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="InputEmail1" className="color-blue-1">Email</label>
                    <br></br>
                    <input type="email" className="input-txt" ref={txt => email = txt} id="InputEmail1" aria-describedby="emailHelp" placeholder="xyz@domain.com"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="InputPassword1" className="color-blue-1">Password</label>
                    <br></br>
                    <input type="password" className="input-txt" ref={txt => password = txt} id="InputPassword1" placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"></input>
                    <small id="singUpHelp" className="form-text color-blue-1">Already have account?&nbsp;<a className="link" href='#' onClick={() => props.element("Login")}>Login</a></small>
                </div>
                <div className="d-flex">
                    <button className="btn-task ml-1" onClick={dataRegistrer}>Sing up</button>
                </div>     
            </div>                            
    )
}