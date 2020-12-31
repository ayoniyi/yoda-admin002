import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import axios from 'axios';

//css
import '../css/Loans.css'


// components
import Sidemenu2 from '../components/menus/SideMenu2'
import Header from '../components/Header'

//assets
/*
import Bar from '../assets/png/bar1.png'
import Greencal from '../assets/svg/icons/cal-green.svg'
import Ycal from '../assets/svg/icons/cal-yellow.svg'
import ocal from '../assets/svg/icons/cal-orange.svg'
import Bcal from '../assets/svg/icons/cal-blue.svg'
*/


class LoanRequest extends Component {

    render () {
        return (
            <div>
                <Header />
                <Sidemenu2 />
                <section className="loan-request">
                    <div className="loans-nav">
                        <Link to="/loans">
                            <div className="loan-nav-item">
                                <p>Overview</p>
                            </div>
                        </Link>
                        <Link to="/loanrequest">
                            <div className="loan-nav-item-a">
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
                    <div className="loan-req-content animate__animated animate__fadeIn animate__slow">
                        <div className="lr-top">
                            <div className="lr-top-left">
                                <h1 className="page-title">Loan Requests</h1>
                                <div className="lr-cal">
                                    <input className="input-date" type="date"/>
                                    <input className="input-date" type="date"/> 
                                </div>
                            </div>
                            <div className="lr-top-right">
                                <form>
                                    <input className="search-field" type="text" placeholder="Search" />
                                    <input className="search-submit" type="submit" value="Search" />
                                </form>
                            </div>
                        </div>
                        <div className="lr-table">
                            <div className="lrtable-top">
                                <p>Name</p>
                                <p>Amount</p>
                                <p>Loan Terms</p>
                                <p>Interest (%)</p>
                                <p>Payback date</p>
                                <p>Status</p>
                            </div>
                            <div className="lr-single">
                                <p>Olowu John</p>
                                <p>₦5000</p>
                                <p>30 days</p>
                                <p>10.75%</p>
                                <p>12-02-2020</p>
                                <p className="green-txt">Approved</p>
                            </div>
                            <div className="lr-single">
                                <p>Olowu John</p>
                                <p>₦5000</p>
                                <p>30 days</p>
                                <p>10.75%</p>
                                <p>12-02-2020</p>
                                <p className="green-txt">Approved</p>
                            </div>
                            <div className="lr-single">
                                <p>Olowu John</p>
                                <p>₦5000</p>
                                <p>30 days</p>
                                <p>10.75%</p>
                                <p>12-02-2020</p>
                                <p className="green-txt">Approved</p>
                            </div>
                            <div className="lr-single">
                                <p>Olowu John</p>
                                <p>₦5000</p>
                                <p>30 days</p>
                                <p>10.75%</p>
                                <p>12-02-2020</p>
                                <p className="green-txt">Approved</p>
                            </div>
                            <div className="lr-single">
                                <p>Olowu John</p>
                                <p>₦5000</p>
                                <p>30 days</p>
                                <p>10.75%</p>
                                <p>12-02-2020</p>
                                <p className="green-txt">Approved</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default LoanRequest;