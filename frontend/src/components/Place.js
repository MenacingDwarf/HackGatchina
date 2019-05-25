import React, {Component} from 'react'

class Place extends Component {
    render() {
        const { sight } = this.props;
        return (
            <center>
                <div className="h3">{sight.name}</div>
                <img className="w-75" src={sight.photo} alt=""/>
                <p>{sight.description}</p>
            </center>
        )
    }
}

export default Place