import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './components/Home'
import Contacts from "./components/Contacts";
import Navbar from "./components/Navbar";
import SelectCategory from "./components/SelectCategory";
import SelectPlaces from "./components/SelectPlaces";

class App extends Component {
    state = {
        categories: []
    };

    getCategories = (categories) => {
        this.setState({
            categories
        })
    };

    getLiked = (liked) => {
        console.log(liked)
    };

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar/>
                    <div className="container">
                        <Route exact path='/' component={Home}/>
                        <Route path='/contacts' component={Contacts}/>
                        <Route path='/route' render={(routeProps) => (
                            <SelectCategory {...routeProps} getCategories={this.getCategories}/>
                        )}/>

                        <Route path='/places' render={(routeProps) => (
                            <SelectPlaces {...routeProps} categories={this.state.categories} endSelecting={this.getLiked}/>
                        )} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
