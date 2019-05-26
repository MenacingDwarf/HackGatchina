import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './components/Home'
import Contacts from "./components/Contacts";
import Navbar from "./components/Navbar";
import SelectCategory from "./components/SelectCategory";
import SelectPlaces from "./components/SelectPlaces";
import SelectRoute from "./components/SelectRoute";
import AdminPage from "./components/AdminPage";

class App extends Component {
    state = {
        categories: [],
        places: []
    };

    getCategories = (categories) => {
        this.setState({
            categories
        })
    };

    getLiked = (liked) => {
        this.setState({
            places: liked
        })
    };

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar/>
                    <div className="container">
                        <Route exact path='/' component={Home}/>
                        <Route path='/contacts' component={Contacts}/>
                        <Route path='/categories' render={(routeProps) => (
                            <SelectCategory {...routeProps} getCategories={this.getCategories}/>
                        )}/>

                        <Route path='/places' render={(routeProps) => (
                            <SelectPlaces {...routeProps} categories={this.state.categories} endSelecting={this.getLiked}/>
                        )} />
                        <Route path='/route' render={(routeProps) => (
                            <SelectRoute {...routeProps} places={this.state.places} />
                        )}/>
                        <Route path='/admin' component={AdminPage} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
