import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const handleLogin = () => {
        navigate('/login')
    }
    const handleRegister = () => {
        navigate('/Register')
    }
    const logout = () => {
        localStorage.clear();
        navigate('/')
    }

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    return (

        <div className="container">
            <nav className="navbar navbar-expand-lg ">

                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        {
                            role === 'admin' &&
                            <>
                                <li className="nav-item">

                                    <Link to="/manage-product" className="nav-link">Manage Product</Link>
                                </li>
                            </>

                        }
                        {
                            role === 'user' &&
                            <>
                                <li className="nav-item">

                                    <Link to="/product" className="nav-link">Product</Link>
                                </li>
                                <li className="nav-item">

                                    <Link to="/about" className="nav-link">About</Link>
                                </li>
                                <li className="nav-item">

                                    <Link to="*" className="nav-link">Contact</Link>
                                </li>
                                <li className="nav-item">

                                    <Link to="/add-to-cart" className="nav-link">Cart</Link>
                                </li>
                                <li className="nav-item">

                                    <Link to="/order" className="nav-link">Order</Link>
                                </li>
                            </>
                        }

                    </ul>

                    <div className='d-flex gap-3'>
                        {
                            token ?
                                <>
                                    <div className="btn btn-danger" onClick={logout}>Logout</div>
                                </>
                                :
                                <>
                                    <div className="btn btn-success" onClick={handleLogin}>Login</div>
                                    <div className="btn btn-primary" onClick={handleRegister}>Register</div>
                                </>
                        }
                    </div>
                </div>

            </nav>
        </div>
    )
}

export default Navbar