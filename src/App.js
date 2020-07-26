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
          <Loading />
        );
      case "principal":
        return (
          <Principal />
        );
    }
  }
  
}


