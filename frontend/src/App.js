import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home'
import Contacts from "./components/Contacts";
import Navbar from "./components/Navbar";
import SelectCategory from "./components/SelectCategory";

class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <Navbar/>
            <div className="container">
              <Route exact path='/' component={Home} />
              <Route path='/contacts' component={Contacts} />
              <Route path='/route' component={SelectCategory} />
            </div>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
