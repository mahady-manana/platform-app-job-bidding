import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import { TopContext } from "../TopContext";
import Auth from '../user-component/auth/auth.api';
import HeaderProfile from "../user-component/header-profile";
import CallToAction from "./call-to-action";

const Menu = () => {
const [isValid, setValidation] = useState(false)
const {topContext} = useContext(TopContext);

useEffect(() => {
    let cleanup = false;
    if (Auth.isAuthenticated() && Auth.isAuthenticated().user.firstname === topContext.firstname) {
        setValidation(true)
    } else {
        setValidation(false)
    }
    return () => {
        cleanup = true;
    }
}, [topContext])

const renderExactcompoent = () => {
    if (isValid) {
        return (<HeaderProfile/>)
    } else {
        return (<CallToAction/>)
    }
}

return (
<>
<div className="top-header" style={{background : '#ffe6ed'}}>
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-3">
                <div className="logo-content text-center">
                    <Link to='/'><img src='/images/logo.png' alt='Go inside' style={{maxHeight : '80px'}}/></Link>
                </div>
            </div>
            <div className="col-md-3">
            </div>
            <div className="col-md-6">
                {renderExactcompoent()} 
            </div>
        </div>
    </div>
</div>
<div className='main-header' id='header_main'>
    <div>
        <nav className="navbar navbar-expand-sm justify-content-center mbgc-3">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/about">About us</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/service">Services</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/use-reducer">UseReducer</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/exmaplecontext/">Context</Link>
                </li>
            </ul>
        </nav>
    </div>
</div>
</>
)
}
export default Menu;
