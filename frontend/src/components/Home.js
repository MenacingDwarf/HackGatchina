import React, {Component} from 'react'

class Home extends Component {
    state = {
        text: 'Loading...'
    };

    componentDidMount() {
        let getText = (comp) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "http://127.0.0.1:8000/", true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function () {
                if (this.readyState === 4) {
                    comp.setState({
                        text: JSON.parse(this.responseText).text
                    })
                }
            };

            xhr.send();
        };

        getText(this);
    }

    render() {
        return (
            <h1>{this.state.text}</h1>
        )
    }
}

export default Home