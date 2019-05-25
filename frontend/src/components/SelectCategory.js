import React, {Component} from 'react'
import Category from './Category'

class SelectCategory extends Component {
    state = {
        categories: [
            {id: 0, name: "history", title: "История", image: "https://pp.userapi.com/c855628/v855628470/4c096/h1MwiY05BrE.jpg", answer: 0},
            {id: 1, name: "war", title: "Война", image: "https://pp.userapi.com/c855628/v855628470/4c09e/bvgl1IPnaAA.jpg", answer: 0},
            {id: 2, name: "art", title: "Искусство", image: "https://pp.userapi.com/c855628/v855628470/4c0a6/BIthWHXb65s.jpg", answer: 0},
            {id: 3, name: "religion", title: "Религия", image: "https://pp.userapi.com/c855628/v855628470/4c0b7/NQmtiWW7Mc4.jpg", answer: 0},
            {id: 4, name: "nature", title: "Природа", image: "https://pp.userapi.com/c855628/v855628470/4c0bf/VF7D5x64HcA.jpg", answer: 0},
            {id: 5, name: "interesting", title: "Интересные места", image: "https://pp.userapi.com/c855628/v855628470/4c0c7/RNkGnusugeQ.jpg", answer: 0},
            {id: 6, name: "architecture", title: "Архитектура", image: "https://pp.userapi.com/c855628/v855628470/4c0e1/wlT1T-zOthI.jpg", answer: 0}
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