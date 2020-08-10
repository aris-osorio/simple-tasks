import React, {useState} from 'react'
import Axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

export default function SignUp(props)
{
    const [sign, setSign] = useState("one");
    
    let showSign;
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

    if(sign ==="one")
    {
        showSign = (    
                        <div>
                            <div className="form-group">
                                <label htmlFor="Inputfname1" className="color-blue-1">First name</label>
                                <br></br>
                                <input type="text" className="input-txt" ref={txt => fname = txt} id="Inputfname1" aria-describedby="emailHelp" placeholder="Richard"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Inputlname1" className="color-blue-1">Last name</label>
                                <br></br>
                                <input type="text" className="input-txt" ref={txt => lname = txt} id="Inputlname1" aria-describedby="emailHelp" placeholder="Brodie"></input>
                                <small id="singUpHelp" className="form-text color-blue-1">Already have account?&nbsp;<a className="link" href='#' onClick={() => props.element("Login")}>Login</a></small>
                            </div>
                            <div className="text-center">
                                <button className="btn-task" onClick={() => setSign("two")}>Page 2</button>
                            </div>
                        </div>
                    )                 
    }

    if(sign ==="two")
    {
        showSign = (    
                        <div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" className="color-blue-1">Email</label>
                                <br></br>
                                <input type="email" className="input-txt" ref={txt => email = txt} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="xyz@domain.com"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="color-blue-1">Password</label>
                                <br></br>
                                <input type="password" className="input-txt" ref={txt => password = txt} id="exampleInputPassword1" placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"></input>
                                <small id="singUpHelp" className="form-text color-blue-1">Already have account?&nbsp;<a className="link" href='#' onClick={() => props.element("Login")}>Login</a></small>
                            </div>
                            <div className="text-center">
                                <button className="btn-task" onClick={dataRegistrer}>Sing up</button>
                            </div>
                        </div>
                    )                 
    }

    document.title = 'Sign up';
    return(
            <div className="shadow p-5 bg-white rounded">
                <div className="text-center logo-container position-relative">
                    <h1 className="font-weight-light color-blue-1">SIMPLE</h1>
                    <h1 className="font-weight-light position-absolute txt-task-position color-blue-1">TASK</h1>
                    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
                        <path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                </div>
                {showSign}
            </div>                            
    )
}