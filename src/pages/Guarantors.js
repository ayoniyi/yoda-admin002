import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import axios from 'axios';

//css
import '../css/Loans.css'


// components
import Sidemenu6 from '../components/menus/SideMenu6'
import Header from '../components/Header'

//assets
/*
import Bar from '../assets/png/bar1.png'
import Greencal from '../assets/svg/icons/cal-green.svg'
import Ycal from '../assets/svg/icons/cal-yellow.svg'
import ocal from '../assets/svg/icons/cal-orange.svg'
import Bcal from '../assets/svg/icons/cal-blue.svg'
*/


class Guarantors extends Component {

    render () {
        return (
            <div>
                <Header />
                <Sidemenu6 />
                <section className="loan-request">
                    <div className="loans-nav">
                        <Link to="/guarantors">
                            <div className="loan-nav-item-a">
                                <p>New Requests</p>
                            </div>
                        </Link>
                        <Link to="/guarantorsa">
                            <div className="loan-nav-item">
                                <p>All Guarantors</p>
                            </div>
                        </Link>
                    </div>
                    <div className="loan-req-content animate__animated animate__fadeIn animate__slow">
                        <div className="lr-top">
                            <div className="lr-top-left">
                                <h1 className="page-title">New Requests</h1>
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
                        <div class="lr-table">
                            <div class="lrtable-top3">
                                <p>Sender's name</p>
                                <p>Guarantor's name</p>
                                <p>Phone no.</p>
                                <p>Email address</p>
                                <p>Date</p>
                                <p>Status</p>
                            </div>
                            <div class="lr-single3">
                                <p>Olowu John</p>
                                <p>Obemebe Tosin</p>
                                <p>08035907867</p>
                                <p>info@medplus.com</p>
                                <p>12-02-2020</p>
                                <p className="green-txt">Approved</p>
                            </div>
                            <div class="lr-single3">
                                <p>Olowu John</p>
                                <p>Obemebe Tosin</p>
                                <p>08035907867</p>
                                <p>info@medplus.com</p>
                                <p>12-02-2020</p>
                                <p className="green-txt">Approved</p>
                            </div>
                            <div class="lr-single3">
                                <p>Olowu John</p>
                                <p>Obemebe Tosin</p>
                                <p>08035907867</p>
                                <p>info@medplus.com</p>
                                <p>12-02-2020</p>
                                <p className="green-txt">Approved</p>
                            </div>
                            <div class="lr-single3">
                                <p>Olowu John</p>
                                <p>Obemebe Tosin</p>
                                <p>08035907867</p>
                                <p>info@medplus.com</p>
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

export default Guarantors;