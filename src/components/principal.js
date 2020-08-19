import React, { useState } from 'react'
import Login from './login'
import SignUp from './signUp'
import SimpleTask from './simpleTask'

export default function Principal(props) {
    const [component, setComponents] = useState("Login");
    let showComponent;

    const changeComponents = (state) => {
        setComponents(state)
    }

    if (component === "Login") {
        showComponent = <Login element={changeComponents} windows={props.windows} />
    }
    else if (component === "SignUp") {
        showComponent = <SignUp element={changeComponents} />
    }
    else if (component === "simpleTask") {
        showComponent = <SimpleTask element={changeComponents} />
    }

    return (
        <div className="principal-container">
            {showComponent}
        </div>
    )
}