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


class LoanData extends Component {

    render () {
        return (
            <div>
                <Header />
                <Sidemenu2 />
                <section className="loan-data">
                    <div className="loans-nav">
                        <Link to="/loans">
                            <div className="loan-nav-item">
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
                            <div className="loan-nav-item-a">
                                <p>Data</p>
                            </div>
                        </Link>
                    </div>

                    <div className="loan-data-content animate__animated animate__fadeIn animate__slow">
                        <div className="ld-top">
                            <div className="ld-top-content">
                                <h1 className="page-title">Data</h1>
                                <div className="ld-cal2">
                                    <select className="select-edit" >
                                        <option disabled selected>Filter by Loan terms</option>
                                        <option value=" In Progress ">In Progress</option>
                                        <option value=" Due ">Due</option>
                                        <option value=" Paid ">Paid</option>
                                    </select>
                                    <select className="select-edit" >
                                        <option disabled selected>Filter by Interest</option>
                                        <option value=" In Progress ">In Progress</option>
                                        <option value=" Due ">Due</option>
                                        <option value=" Paid ">Paid</option>
                                    </select>
                                    <select className="select-edit" >
                                        <option disabled selected>Filter by Status</option>
                                        <option value=" In Progress ">In Progress</option>
                                        <option value=" Due ">Due</option>
                                        <option value=" Paid ">Paid</option>
                                    </select>
                                    <input className="input-date" type="date"/>
                                    <input className="input-date" type="date"/> 
                                    <input className="search-submit" type="submit" value="Filter" />
                                </div>
                            </div>
                           
                        </div>
                    </div>

                </section>
            </div>
        )
    }

}

export default LoanData;