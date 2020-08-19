import React from 'react'
import Axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

export default function Login(props) {
    let email = ""
    let password = ""

    const loginCheck = () => {
        Axios.post(`https://academlo-todolist.herokuapp.com/login`,
            {
                email: email.value,
                password: password.value

            }).then(res => {
                console.log(res);
                toast.info('Welcome to Simple Task')
                props.windows("SimpleTask")

            }).catch((error) => {

                console.log(error)
                toast.error('Failed to login')

            });
    }

    document.title = 'Login';
    return (
        <div className="shadow p-5 bg-white rounded">
            <div className="text-center logo-container position-relative">
                <h1 className="font-weight-light color-blue-1">SIMPLE</h1>
                <h1 className="font-weight-light position-absolute txt-task-position color-blue-1">TASK</h1>
            </div>
            <h2 className="color-blue-1">Login</h2>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="color-blue-1">Email</label>
                <br></br>
                <input type="email" className="input-txt" ref={txt => email = txt} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="xyz@domain.com"></input>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1" className="color-blue-1">Password</label>
                <br></br>
                <input type="password" className="input-txt" ref={txt => password = txt} id="exampleInputPassword1" placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"></input>
                <small id="singUpHelp" className="form-text color-blue-1">Not a member?&nbsp;<span><p className="link" href='#' onClick={() => props.element("SignUp")}>Sign Up now</p></span></small>
            </div>
            <div className="text-center">
                <button className="btn-task" onClick={loginCheck}>Login</button>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    )
}