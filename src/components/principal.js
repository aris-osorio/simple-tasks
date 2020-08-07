import React ,{useState}from 'react'
import Login from './login'
import SignUp from './signUp'
import SimpleTask from './simpleTask'

export default function Principal()
{
    const [component, setComponents] = useState("Login");
    let showComponent;

    const changeComponents =(state)=>
    {
        setComponents(state)
    }

    if(component==="Login")
    {
        showComponent = <Login  element = {changeComponents} />
    }
    else if(component === "SignUp")
    {
        showComponent = <SignUp element = {changeComponents} />
    }
    else if(component === "simpleTask")
    {
        showComponent = <SimpleTask element = {changeComponents} />
    }

    return(
        <div>
            {showComponent}
        </div>
    )
}