import React, {Component} from 'react'
import Place from "./Place";

class SelectPlaces extends Component {
    state = {
        sights: null
    };

    componentDidMount() {
        function sendCategories(comp) {
            var xhr = new XMLHttpRequest();
            var body = '?info={';
            comp.props.categories.forEach(cat => {
                body += '"' + cat.category + '": ' + cat.value + ', '
            });
            body = body.slice(0, -2) + '}';
            xhr.open("GET", 'http://127.0.0.1:8000/vector' + body, true);
            xhr.onreadystatechange = function () {
                if (this.readyState !== 4) return;
                var sights = JSON.parse(decodeURIComponent(this.responseText));
                console.log(sights);
                comp.setState({
                    sights: sights
                });
            };

            xhr.send(body);
        }

        sendCategories(this)
    }

    render() {
        var sight = this.state.sights ? <Place sight={this.state.sights[0].fields} /> : <div>Loading...</div>;
        return (
            <div>
                {sight}
            </div>
        )
    }
}

export default SelectPlaces