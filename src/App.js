import React, {useState, useEffect} from 'react';
import Loading from './components/loading'
import Principal from './components/principal'
import SimpleTask from './components/simpleTask'
import './App.css';

export default function App()
{
  const [window, setWindows] = useState("Loading");
  let showWindow;

  useEffect(() => 
  {
    const timer = setTimeout(() => {
      setWindows("Principal")
  }, 2000);

    return () => clearTimeout(timer);

  }, [])

  const changeWindows =(state)=>
  {
      setWindows(state)
  }

  if(window ==="Loading")
  {
    showWindow = (
                    <div className="vh-100 d-flex justify-content-center align-items-center">
                      <Loading />
                    </div>
                 )
  }
  else if(window ==="Principal")
  {
    showWindow = (
                    <div className="vh-100 bg-principal">
                      <div className="vh-100 d-flex justify-content-center align-items-center bg-opacity">
                        <Principal windows = {changeWindows} />
                      </div>
                    </div>  
                 )
  }
  else if(window ==="SimpleTask")
  {
    showWindow = (
                    <SimpleTask windows = {changeWindows}/>
                 )
  }
  
  return (
    <div>
      {showWindow}
    </div>  
  )
   
}


