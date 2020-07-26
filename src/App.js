import React from 'react';
import Principal from './components/principal'
import Loading from './components/loading'
import './App.css';

export default class App extends React.Component 
{
  constructor()
  {
    super();
    this.state = {window : "loading"};
  }

  componentDidMount() 
  {
    setTimeout(() => this.setState({ window: "principal" }), 2000);
  }

  render()
  {
    switch(this.state.window)
    {
      case "loading":
        return (
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <Loading />
          </div>
        );
      case "principal":
        return (
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <Principal />
          </div>
        );
    }
  }
  
}


