import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-1">
                <div className="collapse navbar-collapse container" id="navbarSupportedContent">
                    <ul className="nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Главная<span className="sr-only">Home</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contacts">Контакты<span className="sr-only">Home</span></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar