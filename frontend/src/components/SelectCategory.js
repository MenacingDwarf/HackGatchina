import React, {Component} from 'react'
import Category from './Category'
import History from '../images/history.png'
import War from '../images/war.png'

class SelectCategory extends Component {
    state = {
        categories: [
            {id: 0, title: "История", image: History, answer: 0},
            {id: 1, title: "Война", image: War, answer: 0},
            {id: 2, title: "Искусство", image: "", answer: 0},
            {id: 3, title: "Религия", image: "", answer: 0},
            {id: 4, title: "Природа", image: "", answer: 0},
            {id: 5, title: "Интересные места", image: "", answer: 0},
            {id: 6, title: "Архитектура", image: "", answer: 0}
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

    render() {
        return (
            <div>
                <Category category={this.state.categories[this.state.current]} prevCategory={this.prevCategory}
                          nextCategory={this.nextCategory} />
            </div>
        )
    }
}

export default SelectCategory