import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import axios from 'axios';

//css
import '../css/Loans.css'


// components
import Sidemenu2 from '../components/menus/SideMenu2'
import Header from '../components/Header'

//assets
import Bar from '../assets/png/bar1.png'
import Greencal from '../assets/svg/icons/cal-green.svg'
import Ycal from '../assets/svg/icons/cal-yellow.svg'
import ocal from '../assets/svg/icons/cal-orange.svg'
import Bcal from '../assets/svg/icons/cal-blue.svg'


class Loans extends Component {

    render () {
        return (
            <div>
                <Header />
                <Sidemenu2 />
                <section className="loans ">
                    <div className="loans-nav">
                        <Link to="/loans">
                            <div className="loan-nav-item-a">
                                <p>Overview</p>
                            </div>
                        </Link>
                        <Link to="/loanrequest">
                            <div className="loan-nav-item">
                                <p>Requests</p>
                            </div>
                        </Link>
                        <Link to="/loansall">
                            <div className="loan-nav-item">
                                <p>All Loans</p>
                            </div>
                        </Link>
                        <Link to="/loandata">
                            <div className="loan-nav-item">
                                <p>Data</p>
                            </div>
                        </Link>
                    </div>
                    <div className="loans-content animate__animated animate__fadeIn animate__slow">
                        <h1 className="page-title">Loan Overview</h1>
                        <div className="loan-boxes-a">
                            <div className="loan-box1">
                                <p className="lb-title">Loan Disbursed History</p>
                                <img src={Bar} alt="chart" />
                            </div>
                            <div className="loan-box2">
                                <div className="loan-box-top">
                                    <p className="lb-title">Outstanding Delay Status</p>
                                    <div className="cal-in">
                                        <input className="input-date" type="date"/>
                                        <input className="input-date" type="date"/> 
                                    </div>
                                </div>
                                <div className="loan-box-body">
                                    <div className="lcubes">
                                        <div className="ltwo">
                                            <div className="lbox">
                                                <div className="lbox-top">
                                                    <img src={Greencal} alt="cal" />
                                                    <p>On-time</p>
                                                </div>
                                                <p className="l-amt">₦23,000,000</p>
                                                <p className="lbox-ps">54 Memebers &gt; </p>
                                            </div>
                                            <div className="lbox">
                                                <div className="lbox-top">
                                                    <img src={Bcal} alt="cal" />
                                                    <p>30 Days Late</p>
                                                </div>
                                                <p className="l-amt">₦23,000,000</p>
                                                <p className="lbox-ps">12 Memebers &gt;</p>
                                            </div>
                                        </div>
                                        <div className="ltwo">
                                            <div className="lbox">
                                                <div className="lbox-top">
                                                    <img src={Ycal} alt="cal" />
                                                    <p>60 Days Late</p>
                                                </div>
                                                <p className="l-amt">₦23,000,000</p>
                                                <p className="lbox-ps">5 Memebers &gt;</p>
                                            </div>
                                            <div className="lbox">
                                                <div className="lbox-top">
                                                    <img src={ocal} alt="cal" />
                                                    <p>90 Days Late</p>
                                                </div>
                                                <p className="l-amt">₦23,000,000</p>
                                                <p className="lbox-ps">4 Memebers &gt;</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="loan-boxes-a">
                            <div className="loan-box3">
                                <div className="lb-top2">
                                    <p>New Loan Requests</p>
                                    <Link to="/loanrequest">
                                        <p className="a-link">View All</p>
                                    </Link>
                                </div>
                                
                                <div className="lb-table">
                                    <div className="lb-table-top">
                                        <p>Name</p>
                                        <p>Loan Terms</p>
                                        <p>Interest(%)</p>
                                        <p>Due date</p>
                                    </div>
                                    <div className="lb-table-body">
                                        <div className="lb-single">
                                            <p>Olowu John</p>
                                            <p>1 Month</p>
                                            <p>10.75%</p>
                                            <p>12-02-2020</p>
                                        
                                        </div>
                                        <div className="lb-single">
                                            <p>Olowu John</p>
                                            <p>1 Month</p>
                                            <p>10.75%</p>
                                            <p>12-02-2020</p>
                                        
                                        </div>
                                        <div className="lb-single">
                                            <p>Olowu John</p>
                                            <p>1 Month</p>
                                            <p>10.75%</p>
                                            <p>12-02-2020</p>
                                        
                                        </div>
                                        <div className="lb-single">
                                            <p>Olowu John</p>
                                            <p>1 Month</p>
                                            <p>10.75%</p>
                                            <p>12-02-2020</p>
                                        
                                        </div>
                                        <div className="lb-single">
                                            <p>Olowu John</p>
                                            <p>1 Month</p>
                                            <p>10.75%</p>
                                            <p>12-02-2020</p>
                                        
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            
                        <div className="loan-box4">
                            <div className="lb-top2">
                                <p>Defaulters</p>
                                <p className="a-link">View All</p>
                            </div>
                            
                            <div className="lb-table">
                                    <div className="lb-table-top">
                                        <p>Name</p>
                                        <p>Loan Terms</p>
                                        <p>Interest(%)</p>
                                        <p>Due date</p>
                                       
                                    </div>
                                    <div className="lb-table-body">
                                        <div className="lb-single">
                                            <p>Olowu John</p>
                                            <p>1 Month</p>
                                            <p>10.75%</p>
                                            <p>12-02-2020</p>
                                           
                                        </div>
                                        <div className="lb-single">
                                            <p>Olowu John</p>
                                            <p>1 Month</p>
                                            <p>10.75%</p>
                                            <p>12-02-2020</p>
                                           
                                        </div>
                                        <div className="lb-single">
                                            <p>Olowu John</p>
                                            <p>1 Month</p>
                                            <p>10.75%</p>
                                            <p>12-02-2020</p>
                                           
                                        </div>
                                        <div className="lb-single">
                                            <p>Olowu John</p>
                                            <p>1 Month</p>
                                            <p>10.75%</p>
                                            <p>12-02-2020</p>
                                           
                                        </div>
                                        <div className="lb-single">
                                            <p>Olowu John</p>
                                            <p>1 Month</p>
                                            <p>10.75%</p>
                                            <p>12-02-2020</p>
                                         
                                        </div>
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

export default Loans;