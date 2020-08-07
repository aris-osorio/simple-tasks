import React, {useState, useEffect} from 'react';
import Principal from './components/principal'
import Loading from './components/loading'
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
                      <div className="vh-100 d-flex justify-content-center align-items-center position-relative bg-opacity">
                        <Principal />
                      </div>
                    </div>
                  )
  }
  
  return (
    <div>
      {showWindow}
    </div>  
  )
   
}


