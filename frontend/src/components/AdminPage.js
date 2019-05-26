import React, {Component} from 'react'

class AdminPage extends Component {
    state = {
        name: '',
        description: '',
        categories: null
    };
    getCategories = () => {
        console.log(this.state.name, this.state.description);
        this.setState({
            categories: [1, 2, 0, 3, 0, 0, 5]
        })
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
        var categoriesList = this.state.categories ? this.state.categories.join(" ") : null;
        var categories = this.state.categories ? (
            <div>
                <div className="h3">Рекомендуемые параметры:</div>
                <label htmlFor="admin-sight-name">История Война Искусство Религия Природа Интересные Архитектура</label>
                <input id="admin-sight-name" onChange={this.handleCategoriesChange} className="form-control mb-2 w-75" type="text" value={categoriesList}/>
                <button onClick={this.sendNewSign} className="btn btn-primary">Отправить</button>
            </div>
        ) : <button onClick={this.getCategories} className="btn btn-primary">Подобрать параметры</button>;
        return (
            <center>
                <div className="h4">Добавить новую достопримечательность:</div>
                <label htmlFor="admin-sight-name">Название</label>
                <input id="admin-sight-name" onChange={this.handleNameChange} className="form-control mb-2 w-75" type="text" value={this.state.name}/>
                <label htmlFor="admin-sight-description">Описание</label>
                <input id="admin-sight-description" onChange={this.handleDescriptionChange} className="form-control mb-2 w-75" type="text" value={this.state.description}/>
                {categories}
            </center>
        )
    }
}

export default AdminPage