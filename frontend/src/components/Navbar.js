import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home <span className="sr-only">Home</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contacts">Contacts<span className="sr-only">Home</span></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar