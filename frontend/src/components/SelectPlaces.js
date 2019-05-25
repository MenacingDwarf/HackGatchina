import React, {Component} from 'react'
import Place from "./Place";

class SelectPlaces extends Component {
    state = {
        categories: [],
        sights: [],
        current: 0,
        liked: [],
        cancelled: []
    };

    sendToServer(comp, cancelled) {
        var xhr = new XMLHttpRequest();
        var body = '?info={';
        comp.props.categories.forEach(cat => {
            body += '"' + cat.category + '": ' + cat.value + ', '
        });
        body = body.slice(0, -2) + '}';
        var accepted = comp.state.liked.map(sight => {
            return sight.pk
        });
        var ncancelled = cancelled.map(sight => {
            return sight.fields.categories
        });
        body += '&accepted=' + JSON.stringify(accepted);
        body += '&cancelled=' + JSON.stringify(ncancelled);
        console.log(body);
        xhr.open("GET", 'http://127.0.0.1:8000/vector' + body, true);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            var answer = JSON.parse(decodeURIComponent(this.responseText));
            answer.sights = JSON.parse(answer.sights);
            comp.setState({
                sights: answer.sights,
                categories: answer.info
            });
        };

        xhr.send(body);
    };

    componentDidMount() {

        this.sendToServer(this, [])
    }

    likeSight = (id) => {
        let current = this.state.current + 1;
        let liked = [...this.state.liked, this.state.sights.find(sight => {
            return sight.pk === id
        })];
        console.log("liked", liked);
        this.setState({
            current: current,
            liked: liked
        });
    };

    dislikeSight = (id) => {
        let cancelled = [...this.state.cancelled, this.state.sights.find(sight => {
            return sight.pk === id
        })];
        console.log("cancelled", cancelled);
        this.setState({
            current: 0,
            cancelled: cancelled,
            sights: []
        });
        this.sendToServer(this,cancelled)
    };

    endSelecting = () => {
        var liked = this.state.liked;
        this.props.endSelecting(liked);
        this.props.history.push('/')
    };

    render() {
        var sight = this.state.sights.length !== 0 ?
            <Place sight={this.state.sights[this.state.current]} like={this.likeSight}
                   dislike={this.dislikeSight} endSelecting={this.endSelecting}/> :
            <div>Loading...</div>;
        return (
            <div>
                {sight}
            </div>
        )
    }
}

export default SelectPlaces