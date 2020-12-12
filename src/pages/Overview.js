import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
//import axios from 'axios';

//css
//import '../css/Login.css'
import '../css/Overview.css'

// components
import Sidemenu from '../components/menus/SideMenu'
import Header from '../components/Header'

//assets
import Graph from '../assets/png/graph1.png'
import blue1 from '../assets/svg/icons/blue1.svg'
import red1 from '../assets/svg/icons/red1.svg'
import yellow1 from '../assets/svg/icons/yellow1.svg'
import green1 from '../assets/svg/icons/green1.svg'
import locations from '../assets/png/locations.png'



class Overview extends Component {

    render () {
        return (
            <div>
                <Header />
                <Sidemenu />
                <section className="overview">
                    <div className="overview-content ">
                        <h1 className="page-title">Dashboard</h1>
                        <div className="overview-boxesa animate__animated animate__fadeIn animate__slow">
                            <div className="overboxa-left">
                                <div className="boxa-left-top">
                                    <div className="topa-1">
                                        <p className="topa-title">Investments Vs Returns</p>
                                    </div>
                                    <div className="topa-2">
                                        <input className="input-date" type="date"/>
                                        <input className="input-date" type="date"/> 
                                    </div>
                                </div>
                                <img src={Graph} alt="graph" />
                            </div>
                            <div className="overboxa-right">
                                <p className="topa-title">Return Summary</p>
                                <div className="line"></div>
                                <div className="rightbox-a">
                                    <p className="boxtl-small">Total Amount Invested:</p>
                                    <p><strong>₦20,000,000.00</strong></p>
                                </div>
                                <div className="rightbox-a">
                                    <p className="boxtl-small">Total Return:</p>
                                    <p><strong>₦25,050,965.00</strong></p>
                                </div>
                                <div className="rightbox-a">
                                    <p className="boxtl-small">Profit:</p>
                                    <p><strong>₦5,050,965.00</strong></p>
                                </div>
                                <div className="righta-bottom">
                                    <p className="">Outstanding balance</p>
                                    <p><strong>₦2,045,000.00</strong></p>
                                </div>
                            </div>
                        </div>
                        <div className="overview-4boxes animate__animated animate__fadeIn animate__slow">
                                <div className="overview-4box">
                                    <div className="box4-top">
                                        <p>Loan Amt. Available</p>
                                        <img src={blue1} alt="icon" />
                                    </div>
                                    <p><strong>₦1,235,000</strong></p>
                                </div>
                                <div className="overview-4box">
                                    <div className="box4-top">
                                        <p>Loan Amt. Collected</p>
                                        <img src={green1} alt="icon" />
                                    </div>
                                    <p><strong>₦1,235,000</strong></p>
                                </div>
                                <div className="overview-4box">
                                    <div className="box4-top">
                                        <p> Amt. Not Paid</p>
                                        <img src={red1} alt="icon" />
                                    </div>
                                    <p><strong>₦1,235,000</strong></p>
                                </div>
                                <div className="overview-4box-l">
                                    <div className="box4-top">
                                        <p>Amt. Under Process</p>
                                        <img src={yellow1} alt="icon" />
                                    </div>
                                    <p><strong>₦1,235,000</strong></p>
                                </div>
                        </div>
                        <div className="overview-boxesb animate__animated animate__fadeIn animate__slow">
                            <div className="overviewboxb-left">
                                <p>Loan Wallet</p>
                                <div className="wallet-card">
                                    <p>Available Balance</p>
                                    <p><strong>₦23,000,000.00</strong></p>
                                </div>
                            </div>
                            <div className="overviewboxb-right">
                                <p>User Locations</p>
                                <img src={locations} alt="locations"/>
                            </div>
                        </div>  
                        <div className="overview-c animate__animated animate__fadeIn animate__slow">
                            <div className="overc-top">
                                <p>Upcoming Payments</p>
                                <p className="a-link">View All</p>
                            </div>
                            <div className="overc-table">
                                <div className="overc-table-top">
                                    <p>Name</p>
                                    <p>Loan Terms</p>
                                    <p>Interest(%)</p>
                                    <p>Due date</p>
                                    <p>Status</p>
                                </div>
                                <div className="overc-table-body">
                                    <div className="overc-single">
                                        <p>Olowu John</p>
                                        <p>1 Month</p>
                                        <p>10.75%</p>
                                        <p>12-02-2020</p>
                                        <p>Pending</p>
                                    </div>
                                    <div className="overc-single">
                                        <p>Olowu John</p>
                                        <p>1 Month</p>
                                        <p>10.75%</p>
                                        <p>12-02-2020</p>
                                        <p>Pending</p>
                                    </div>
                                    <div className="overc-single">
                                        <p>Olowu John</p>
                                        <p>1 Month</p>
                                        <p>10.75%</p>
                                        <p>12-02-2020</p>
                                        <p>Pending</p>
                                    </div>
                                    <div className="overc-single">
                                        <p>Olowu John</p>
                                        <p>1 Month</p>
                                        <p>10.75%</p>
                                        <p>12-02-2020</p>
                                        <p>Pending</p>
                                    </div>
                                    <div className="overc-single">
                                        <p>Olowu John</p>
                                        <p>1 Month</p>
                                        <p>10.75%</p>
                                        <p>12-02-2020</p>
                                        <p>Pending</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
    

export default Overview ;