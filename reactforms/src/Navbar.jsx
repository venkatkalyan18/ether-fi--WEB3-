import React from "react";
import './App.css'
import logo from './header_logo.webp'

const Navbar= () =>{
    return(
        <nav className="main-nav-div">
            <img src={logo} alt="logo" className="nav-logo"/>
            <ul>
                <li>Market</li>
                <li>Exchange</li>
                <li>Tutorials</li>
                <li>Wallets</li>
            </ul>
        </nav>
    )
}

export default Navbar;