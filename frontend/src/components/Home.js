import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Home extends Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div id="carouselExampleControls" className="carousel slide w-100 mx-auto" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="http://1945.sputnik.ru/img/city/gatchina.jpg" className="d-block w-100"
                                     alt="..."/>
                            </div>
                            <div className="carousel-item">
                                <img
                                    src="http://www.museums.severstal.com/wp-content/uploads/2016/01/GMZ-Gatchina-720x445.jpg"
                                    className="d-block w-100" alt="..."/>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button"
                           data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button"
                           data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
                <div className="row">
                    <center>
                        <div className="h3">Добро пожаловать в Гатчину!</div>
                        <p>Мы привествуем всех гостей Гатчины и хотим предложить вам сконструировать свою
                            персонализированную прогулку по прекрасному городу Гатчина!</p>
                        <Link to="/categories">
                            <button className="btn btn-primary">Подготовить маршрут</button>
                        </Link>
                    </center>
                </div>

            </div>
        )
    }
}

export default Home