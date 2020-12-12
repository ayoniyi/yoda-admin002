import React, { Component } from 'react';


//css
import '../css/Sidemenu.css'

// assets
import Logo from '../assets/svg/logo2.svg'
import Girl from '../assets/png/girl.png'


class Header extends Component {

    render () {
        return (
            <div>
                <section className="header-top">
                    <div className="header-top-box">
                        <div className="header-top-content">
                            <img src={Logo} alt="logo" />
                            <div className="pro">
                                <img src={Girl} alt="profile-pic" />
                                <p>Chidinma</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Header;