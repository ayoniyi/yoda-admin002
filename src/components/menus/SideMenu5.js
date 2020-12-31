import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import axios from 'axios';

//css
import '../../css/Sidemenu.css'

// assets

import Overview from '../../assets/svg/icons/overview.svg'
import Loans from '../../assets/svg/icons/loans.svg'
import Users from '../../assets/svg/icons/users.svg'
import Merchants from '../../assets/svg/icons/merchants.svg'
import Wallet from '../../assets/svg/icons/wallet-a.svg'
import Guarantors from '../../assets/svg/icons/guarant.svg'
//import Notifications from '../../assets/svg/icons/notifications.svg'
import Settings from '../../assets/svg/icons/settings.svg'
import Logout from '../../assets/svg/icons/logout.svg'



class SideMenu5 extends Component {

    

    render () {
        return (
            <div>
                <section className="sidemenu">
                    <div className="sidemenu-box">
                        <div className="sidemenu-content" id="sidemenu-content">
                           
                            <div className="sidemenu-nav">
                                <div className="sidemenu-links">
                                    <Link to="/overview" className="side-links">
                                        <div className="side-active">
                                            <img src={Overview} alt="" />
                                        </div>
                                        <p>Overview</p>
                                    </Link>
                                </div>
                                <div className="sidemenu-links">
                                    <Link to="/loans" className="side-links">
                                            <img src={Loans} alt="" />
                                        <p>Loans</p>
                                    </Link>
                                </div>
                                <div className="sidemenu-links">
                                    <Link to="/users" className="side-links">
                                            <img src={Users} alt="" />
                                        <p>Users</p>
                                    </Link>
                                </div>
                                <div className="sidemenu-links">
                                    <Link to="/merchants" className="side-links">
                                            <img src={Merchants} alt="" />
                                        <p>Merchants</p>
                                    </Link>
                                </div>
                                <div className="sidemenu-links-a">
                                    <Link to="/wallet" className="side-links">
                                            <img src={Wallet} alt="" />
                                        <p>Wallet</p>
                                    </Link>
                                </div>
                                <div className="sidemenu-links">
                                    <Link to="/guarantors" className="side-links">
                                            <img src={Guarantors} alt="" />
                                        <p>Guarantors</p>
                                    </Link>
                                </div>
                                <div className="line-space"></div>

                                {/*<div className="sidemenu-links">
                                    <Link to="/notifications" className="side-links">
                                            <img src={Notifications} alt="" />
                                        <p>Notifications</p>
                                    </Link>
                                </div>*/}
                                <div className="sidemenu-links">
                                    <Link to="/settings" className="side-links">
                                            <img src={Settings} alt="" />
                                        <p>Settings</p>
                                    </Link>
                                </div>
                                <div className="sidemenu-links">
                                    <Link to="/" className="side-links">
                                            <img src={Logout} alt="" />
                                        <p>Logout</p>
                                    </Link>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
    

export default SideMenu5 ;