import React, {Component} from 'react'
import Category from './Category'
import History from '../images/history.png'
import War from '../images/war.png'

class SelectCategory extends Component {
    state = {
        categories: [
            {id: 0, name: "history", title: "История", image: History, answer: 0},
            {id: 1, name: "war", title: "Война", image: War, answer: 0},
            {id: 2, name: "art", title: "Искусство", image: "", answer: 0},
            {id: 3, name: "religion", title: "Религия", image: "", answer: 0},
            {id: 4, name: "nature", title: "Природа", image: "", answer: 0},
            {id: 5, name: "interesting", title: "Интересные места", image: "", answer: 0},
            {id: 6, name: "architecture", title: "Архитектура", image: "", answer: 0}
            ],
        current: 0,
    };

    nextCategory = (value) => {
        let categories = [...this.state.categories];
        categories[this.state.current].answer = value;
        let current = this.state.current + 1;
        this.setState({
            categories: categories,
            current: current,
        })
    };
    prevCategory = (value) => {
        let categories = [...this.state.categories];
        categories[this.state.current].answer = value;
        let current = this.state.current - 1;
        this.setState({
            categories: categories,
            current: current,
        })
    };
    sendCategories = () => {
        var obj = '{';
        this.state.categories.forEach(cat => {
            obj += '"' + cat.name + '": ' + cat.answer + ', ';
        });
        obj = obj.slice(0,-2);
        obj += "}";
        this.props.getCategories(JSON.parse(obj));
        this.props.history.push('/places')
    };
    render() {
        return (
            <div>
                <Category category={this.state.categories[this.state.current]} prevCategory={this.prevCategory}
                          nextCategory={this.nextCategory} end={this.sendCategories}/>
            </div>
        )
    }
}

export default SelectCategory