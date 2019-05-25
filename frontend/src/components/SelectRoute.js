import React, {Component} from 'react'

class SelectRoute extends Component {
    state = {
      places: this.props.places
    };

    sendToServer(comp) {
        var xhr = new XMLHttpRequest();
        var places = this.props.places.map(place => {
            return {name: place.fields.name, lat: place.fields.lat, lon: place.fields.lon}
        });
        var body = '?places=' + places.toString();
        console.log(body);
        xhr.open("GET", 'http://127.0.0.1:8000/route' + body, true);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            var answer = JSON.parse(decodeURIComponent(this.responseText));
            console.log(answer)
        };

        xhr.send(body);
    };

    componentDidMount() {
        this.sendToServer(this)
    }

    render() {
        return (
            <div>Hello</div>
        )
    }
}

export default SelectRoute