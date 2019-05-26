import React, {Component} from 'react'

class SelectCategory extends Component {
    state = {
        categories: [
            {
                id: 0,
                name: "history",
                title: "История",
                image: "https://pp.userapi.com/c855628/v855628470/4c096/h1MwiY05BrE.jpg",
                answer: 0
            },
            {
                id: 1,
                name: "war",
                title: "Война",
                image: "https://pp.userapi.com/c855628/v855628470/4c09e/bvgl1IPnaAA.jpg",
                answer: 0
            },
            {
                id: 2,
                name: "art",
                title: "Искусство",
                image: "https://pp.userapi.com/c855628/v855628470/4c0a6/BIthWHXb65s.jpg",
                answer: 0
            },
            {
                id: 3,
                name: "religion",
                title: "Религия",
                image: "https://pp.userapi.com/c855628/v855628470/4c0b7/NQmtiWW7Mc4.jpg",
                answer: 0
            },
            {
                id: 4,
                name: "nature",
                title: "Природа",
                image: "https://pp.userapi.com/c855628/v855628470/4c0bf/VF7D5x64HcA.jpg",
                answer: 0
            },
            {
                id: 5,
                name: "interesting",
                title: "Интересные места",
                image: "https://pp.userapi.com/c855628/v855628470/4c0c7/RNkGnusugeQ.jpg",
                answer: 0
            },
            {
                id: 6,
                name: "architecture",
                title: "Архитектура",
                image: "https://pp.userapi.com/c855628/v855628470/4c0e1/wlT1T-zOthI.jpg",
                answer: 0
            }
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
        });
        if (current >= 7) {
            this.sendCategories();
        }
    };
    prevCategory = (value) => {
        let categories = [...this.state.categories];
        categories[this.state.current].answer = value;
        let current = this.state.current - 1;
        this.setState({
            categories: categories,
            current: current,
        });
    };
    sendCategories = () => {
        var obj = '{';
        this.state.categories.forEach(cat => {
            obj += '"' + cat.name + '": ' + cat.answer + ', ';
        });
        obj = obj.slice(0, -2);
        obj += "}";
        this.props.getCategories(JSON.parse(obj));
        this.props.history.push('/places')
    };
    handleChange = (e) => {
        let cats = this.state.categories;
        cats[this.state.current].answer = e.target.value;
        this.setState({
            categories: cats
        })
    };

    render() {
        let images = this.state.categories.map(cat => {
            return (
                <div className="w-100" key={cat.id}>
                    <img style={{borderRadius: "10px", width: "50%"}} src={cat.image} alt=""/>
                    <span style={{fontSize: "0.7em"}}>{cat.answer}/100</span>
                </div>
            )
        });
        let category = this.state.categories[this.state.current];
        var prev = category.id !== 0 ? <button className="btn btn-primary mr-2" onClick={() => this.prevCategory(category.answer)}>Назад</button> : null;
        var next = category.id !== 6 ? <button className="btn btn-primary" onClick={() => this.nextCategory(category.answer)}>Дальше</button> :
            <button className="btn btn-primary" onClick={() => this.nextCategory(category.answer)}>Закончить</button>;
        return (
            <div>
                <center className="row mb-2">
                    <div className="col-4">
                        {images}
                    </div>
                    <div className="col-8">
                        <center>
                            <div className="h4">{category.title}</div>
                            <img src={category.image} alt="" className="w-100"/>
                            <div className="form-group">
                                <label htmlFor="formControlRange">Ваше предпочтение для этой категории</label>
                                <input type="range" onChange={this.handleChange} className="form-control-range mb-3 w-100"
                                       id="formControlRange" value={category.answer}/>
                            </div>
                        </center>
                    </div>
                </center>
                <center>
                        {prev}
                        {next}
                </center>
            </div>
        )
    }
}

export default SelectCategory