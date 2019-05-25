import React, {Component} from 'react'

class SelectPlaces extends Component {
    componentDidMount() {
        function sendCategories(comp) {
            var xhr = new XMLHttpRequest();
            var body = '?info={';
            comp.props.categories.forEach(cat => {
                body += '"' + cat.category + '": ' + cat.value + ', '
            });
            body = body.slice(0, -2) + '}';
            xhr.open("GET", 'http://127.0.0.1:8000/vector' + body, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function () {
                if (this.readyState !== 4) return;
                console.log(JSON.parse(decodeURIComponent(this.responseText)));
            };

            xhr.send(body);
        }

        sendCategories(this)
    }

    render() {
        var cat = this.props.categories.map(cat => <div key={cat.category}>{cat.category}: {cat.value}</div>);
        return (
            <div>{cat}</div>
        )
    }
}

export default SelectPlaces