import React, {Component} from 'react'
import MyMap from "./MyMap";

class SelectRoute extends Component {
    state = {
        places: this.props.places,
        mapinfo: null
    };

    sendToServer(comp) {
        var xhr = new XMLHttpRequest();
        var places = this.props.places.map(place => {
            return {name: place.fields.name, lat: place.fields.lat, lon: place.fields.lon}
        });
        var body = '?places=' + JSON.stringify(places);
        console.log(body);
        xhr.open("GET", 'https://hackgatchina.herokuapp.com/route' + body, true);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            console.log(this.responseText);
            var answer = JSON.parse(decodeURIComponent(this.responseText));
            console.log(answer);
            comp.setState({
                mapinfo: answer
            })
        };

        xhr.send(body);
    };

    componentDidMount() {
        var places = this.props.places.map(place => {
            return {name: place.fields.name, lat: place.fields.lat, lon: place.fields.lon}
        });
        var body = '?places=' + JSON.stringify(places);
        window.location.href = "https://hackgatchina.herokuapp.com/route"+body;
        // this.sendToServer(this)
    }

    render() {
        console.log('wtf');
        var mapinfo = this.state.mapinfo ? <MyMap mapinfo={this.state.mapinfo}/> : <div>Построение маршрута...</div>;
        return (
            <div>
                {mapinfo}
            </div>
        )
    }
}

export default SelectRoute