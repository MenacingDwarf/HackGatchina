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
        xhr.open("GET", 'https://hackgatchina.herokuapp.com/predict' + body, true);
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
        var categories = this.state.categories ? (
            <div className="mb-2">
                <div className="h5">Рекомендуемые параметры:</div>
                <center style={{display: "inline-block", width: "14%"}}>
                    <img src="https://pp.userapi.com/c855628/v855628470/4c0e1/wlT1T-zOthI.jpg" alt="Архитектура" className="w-100"/>
                    <input style={{textAlign: "center", padding: "5px", width: "90%"}} type="text" className="form-control" value={this.state.categories[0]}/>
                </center>
                <center style={{display: "inline-block", width: "14%"}}>
                    <img src="https://pp.userapi.com/c855628/v855628470/4c0a6/BIthWHXb65s.jpg" alt="Искусство" className="w-100"/>
                    <input style={{textAlign: "center", padding: "5px", width: "90%"}} type="text" className="form-control" value={this.state.categories[1]}/>
                </center>
                <center style={{display: "inline-block", width: "14%"}}>
                    <img src="https://pp.userapi.com/c855628/v855628470/4c096/h1MwiY05BrE.jpg" alt="История" className="w-100"/>
                    <input style={{textAlign: "center", padding: "5px", width: "90%"}} type="text" className="form-control" value={this.state.categories[2]}/>
                </center>
                <center style={{display: "inline-block", width: "14%"}}>
                    <img src="https://pp.userapi.com/c855628/v855628470/4c0c7/RNkGnusugeQ.jpg" alt="Интересные места" className="w-100"/>
                    <input style={{textAlign: "center", padding: "5px", width: "90%"}} type="text" className="form-control" value={this.state.categories[3]}/>
                </center>
                <center style={{display: "inline-block", width: "14%"}}>
                    <img src="https://pp.userapi.com/c855628/v855628470/4c0bf/VF7D5x64HcA.jpg" alt="Природа" className="w-100"/>
                    <input style={{textAlign: "center", padding: "5px", width: "90%"}} type="text" className="form-control" value={this.state.categories[4]}/>
                </center>
                <center style={{display: "inline-block", width: "14%"}}>
                    <img src="https://pp.userapi.com/c855628/v855628470/4c0b7/NQmtiWW7Mc4.jpg" alt="Религия" className="w-100"/>
                    <input style={{textAlign: "center", padding: "5px", width: "90%"}} type="text" className="form-control" value={this.state.categories[5]}/>
                </center>
                <center style={{display: "inline-block", width: "14%"}}>
                    <img src="https://pp.userapi.com/c855628/v855628470/4c09e/bvgl1IPnaAA.jpg" alt="Война" className="w-100"/>
                    <input style={{textAlign: "center", padding: "5px", width: "90%"}} type="text" className="form-control" value={this.state.categories[6]}/>
                </center>

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