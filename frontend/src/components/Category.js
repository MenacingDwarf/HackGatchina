import React, {Component} from 'react'

class Category extends Component {
    state = {
      value: 0
    };

    handleSubmit = (e) => {
        this.props.nextCategory(this.state.value);
        this.setState({
            value: 0
        })
    };
    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    };
    handleClick = (e) => {
        this.props.prevCategory(this.state.value);
        this.setState({
            value: 0
        })
    };
    render() {
        var prev = this.props.category.id !== 0 ? <button className="btn btn-primary" onClick={this.handleClick}>Назад</button> : null;
        var next = this.props.category.id !== 6 ? <button className="btn btn-primary" onClick={this.handleSubmit}>Дальше</button> : null;
        return (
            <center>
                <div className="h3">{this.props.category.title}</div>
                <img src={this.props.category.image} alt="" className="w-100"/>
                    <div className="form-group">
                        <label htmlFor="formControlRange">Ваше предпочтение для этой категории</label>
                        <input type="range" onChange={this.handleChange} className="form-control-range mb-2"
                               id="formControlRange" value={this.state.value}/>
                        {prev}
                        {next}
                    </div>
            </center>
        )
    }
}

export default Category