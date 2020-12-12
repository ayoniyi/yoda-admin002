import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
//import axios from 'axios';

//css
import '../css/Wallet.css'

// components
import Sidemenu7 from '../components/menus/SideMenu7'
import Header from '../components/Header'

//assets
import User from '../assets/png/user1.png'
//import Loadicon from '../assets/png/loadgr.gif'
//import Green from '../assets/svg/icons/gr-dot.svg'


class Notifications extends Component {

    render () {

        //localStorage.setItem("merchantid",this.state.merchantid );
        
        return (
            <div>
                <Header />
                <Sidemenu7 />
                <section className="wallet">
                    <div className="wallet-content animate__animated animate__fadeIn animate__slow">
                        <div className="wallet-top">
                            <h1 className="page-title">Notifications</h1>
                        </div>

                        <div className="notif-single">
                            <p className="small-txt2">Today</p>
                            <div className="notif-box">
                                <div className="notif-img">
                                    <img src={User} alt="profile" />
                                </div>
                                <div className="notif-txt">
                                    <p>Bukola Saraki created a user sccount</p>
                                </div>
                            </div>
                        </div>
                        <div className="notif-single">
                            <p className="small-txt2">Today</p>
                            <div className="notif-box">
                                <div className="notif-img">
                                    <img src={User} alt="profile" />
                                </div>
                                <div className="notif-txt">
                                    <p>Bukola Saraki created a user sccount</p>
                                </div>
                            </div>
                        </div>
                        

                    </div>
               </section>
            </div>
        )

    }

}

export default Notifications;
