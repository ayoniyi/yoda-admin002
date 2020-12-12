import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import axios from 'axios';

//css
import '../css/Wallet.css'

// components
import Sidemenu5 from '../components/menus/SideMenu5'
import Header from '../components/Header'

//assets
//import User from '../assets/png/user1.png'
//import Loadicon from '../assets/png/loadgr.gif'
import Arrowr from '../assets/svg/pg-right.svg'
//import Green from '../assets/svg/icons/gr-dot.svg'

class WalletFund extends Component {

    render () {

        //localStorage.setItem("merchantid",this.state.merchantid );
        
        return (
            <div>
                <Header />
                <Sidemenu5 />
                <section className="wallet">
                    <div className="wallet-content animate__animated animate__fadeIn animate__slow">
                        <div className="wallet-top">
                            <h1 className="page-title">Fund Wallet</h1>
                            <div className="pg-nav1">
                                <Link to="wallet">
                                    <p className="p-active">Wallet</p>
                                </Link>
                                <img src={Arrowr} alt="right"/>
                                <p>Fund Wallet</p>
                            </div>
                        </div>
                        <div className="fund-container">
                            <div className="fund-box">
                                <form>
                                    <div className="fund-inputs">
                                        <p>Amount</p>
                                        <input className="fund-fields" type="text" placeholder="Enter amount" required/>
                                    </div>
                                    <div className="fund-inputs">
                                        <input className="fund-fields" type="text" placeholder="Card Number" required />
                                    </div>
                                    <div className="fund-inputs-sm">
                                        <input className="fund-fields-sm" type="text" placeholder=" YY"  maxlength="2" required />
                                        <input className="fund-fields-sm" type="text" placeholder="MM"  maxlength="2" required />
                                        <input className="fund-fields-sml" type="text" placeholder="CVV"  maxlength="2" required />
                                    </div>
                                    <div className="fund-inputs-sub">
                                        <input className="fund-btn" type="submit" value="Fund Wallet" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default WalletFund;