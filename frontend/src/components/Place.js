import React, {Component} from 'react'

class Place extends Component {
    render() {
        const { sight } = this.props;
        return (
            <center>
                <div className="h3">{sight.fields.name}</div>
                <img className="w-75" src={sight.fields.photo} alt=""/>
                <p>{sight.fields.description}</p>
                <button className="btn btn-danger mr-2" onClick={() => this.props.dislike(sight.pk)}>Не нравится</button>
                <button className="btn btn-success" onClick={() => this.props.like(sight.pk)}>Нравится</button>
                <br/>
                <button className="btn btn-primary mt-2" onClick={() => this.props.endSelecting()}>Закончить подбор мест</button>
            </center>
        )
    }
}

export default Place