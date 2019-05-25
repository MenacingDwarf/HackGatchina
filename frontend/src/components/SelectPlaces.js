import React, {Component} from 'react'
import Place from "./Place";

class SelectPlaces extends Component {
    state = {
        categories: this.props.categories,
        sights: [],
        current: 0,
        passed: [],
        liked: [],
        cancelled: []
    };

    sendToServer(comp, passed, cancelled) {
        var xhr = new XMLHttpRequest();
        var body = '?info=' + JSON.stringify(comp.state.categories);
        var ncancelled = cancelled ? cancelled.fields.categories : "{}";
        body += '&accepted=' + JSON.stringify(passed);
        body += '&cancelled=' + ncancelled.toString();
        console.log(body);
        xhr.open("GET", 'http://127.0.0.1:8000/vector' + body, true);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            var answer = JSON.parse(decodeURIComponent(this.responseText));
            answer.sights = JSON.parse(answer.sights);
            console.log(answer.info);
            console.log(answer.sights.map(s => s.fields.name));
            comp.setState({
                sights: answer.sights,
                categories: answer.info
            });
        };

        xhr.send(body);
    };

    componentDidMount() {

        this.sendToServer(this, [],null)
    }

    likeSight = (id) => {
        let current = this.state.current + 1;
        let liked = [...this.state.liked, this.state.sights.find(sight => {
            return sight.pk === id
        })];
        let passed = [...this.state.passed, id];
        console.log("liked", liked);
        this.setState({
            current: current,
            liked: liked,
            passed: passed
        });
    };

    dislikeSight = (id) => {
        let cancelled = this.state.sights.find(sight => {
            return sight.pk === id
        });
        let passed = [...this.state.passed, id];
        console.log("cancelled", cancelled);
        this.setState({
            current: 0,
            cancelled: cancelled,
            sights: [],
            passed: passed
        });
        this.sendToServer(this,passed,cancelled)
    };

    endSelecting = () => {
        var liked = this.state.liked;
        this.props.endSelecting(liked);
        this.props.history.push('/route')
    };

    render() {
        var sight = this.state.sights.length !== 0 ?
            <Place sight={this.state.sights[this.state.current]} like={this.likeSight}
                   dislike={this.dislikeSight} endSelecting={this.endSelecting}/> :
            <div>Подбираем для вас лучшие варианты...</div>;
        return (
            <div>
                {sight}
            </div>
        )
    }
}

export default SelectPlaces