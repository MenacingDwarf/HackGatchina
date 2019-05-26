import React, {Component} from 'react'

class AdminPage extends Component {
    state = {
        name: '',
        description: '',
        categories: null,
        image: null
    };
    getFromServer(comp) {
        var xhr = new XMLHttpRequest();
        let text = {name: comp.state.name, description: comp.state.description};
        var body = '?text=' + JSON.stringify(text);
        console.log(body);
        xhr.open("GET", 'http://127.0.0.1:8000/predict' + body, true);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            var answer = JSON.parse(decodeURIComponent(this.responseText));
            console.log(answer);
            comp.setState({
                categories: answer.answer,
                image: answer.link
            });
        };

        xhr.send(body);
    };
    getCategories = (e) => {
        this.getFromServer(this);
        e.target.innerHTML = "Загрузка...";
    };
    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    };
    handleDescriptionChange = (e) => {
        this.setState({
            description: e.target.value
        })
    };
    handleCategoriesChange = (e) => {
        var categories = e.target.value.split(' ');
        this.setState({
            categories: categories
        })
    };
    sendNewSign = () => {
        console.log(this.state)
    };
    render() {
        var categoriesList = this.state.categories ? this.state.categories.join(' ') : null;
        var categories = this.state.categories ? (
            <div>
                <div className="h5">Рекомендуемые параметры:</div>
                <label htmlFor="admin-sight-name">Архитектура Искусство История Интересные Природа Религия Война</label>
                <input id="admin-sight-name" onChange={this.handleCategoriesChange} className="form-control mb-2 w-75" type="text" value={categoriesList}/>
                <button onClick={this.sendNewSign} className="btn btn-primary">Отправить</button>
            </div>
        ) : <button onClick={this.getCategories} className="btn btn-primary">Подобрать параметры</button>;
        var img = this.state.image ? <img src={this.state.image} alt="" className="w-100" /> : null;
        return (
            <center>
                {img}
                <div className="h5">Добавить новую достопримечательность:</div>
                <label htmlFor="admin-sight-name">Название</label>
                <input id="admin-sight-name" onChange={this.handleNameChange} className="form-control mb-2 w-75" type="text" value={this.state.name}/>
                <label htmlFor="admin-sight-description">Описание</label>
                <textarea id="admin-sight-description" onChange={this.handleDescriptionChange} rows="3" className="form-control mb-2 w-75" value={this.state.description}/>
                {categories}
            </center>
        )
    }
}

export default AdminPage