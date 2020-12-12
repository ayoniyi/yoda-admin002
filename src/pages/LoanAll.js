import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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


class LoanAll extends Component {

    state = {
        LoansA: [],
        isLoaded: false,
        searchParam: ""
    };

    componentDidMount() {
        const token = localStorage.getItem("tokenset");
        console.log(token)
        if (token === null ) {
            window.location="/"
        }
    
        let axiosConfig = {
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
            }
        };

        axios.get(`https://yoda-backend.herokuapp.com/admin/loan?startDate=2020-11-29&endDate=2020-12-01`, axiosConfig)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);

            this.setState({ 
                LoansA: res.data.data.users.docs,
                isLoaded: true
            });

            this.setState({ nullres : "" })

            /*if( this.state.LoansA.totalDocs === 0){
                this.setState({ nullres : "No Users Found" });
            }*/

          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
           // this.setState({ nullres : "No Users Found" });
            
            this.setState({ isLoaded: true });
          })  
    }

    render () {

        localStorage.setItem("loanid",this.state.loanid );

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
                            <div className="loan-nav-item">
                                <p>Requests</p>
                            </div>
                        </Link>
                        <Link to="/loansall">
                            <div className="loan-nav-item-a">
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
                                <h1 className="page-title">All Loans</h1>
                                <div className="lr-cal2">
                                    <select className="select-edit" >
                                        <option disabled selected>Filter by Status</option>
                                        <option value=" In Progress ">In Progress</option>
                                        <option value=" Due ">Due</option>
                                        <option value=" Paid ">Paid</option>
                                    </select>
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
                            <div class="lrtable-top2">
                                <p>Name</p>
                                <p>Amount</p>
                                <p>Loan Terms</p>
                                <p>Interest (%)</p>
                                <p>Payback amount</p>
                                <p>Payback date</p>
                                <p>Status</p>
                            </div>
                            <div class="lr-single2">
                                <p>Olowu John</p>
                                <p>₦5000</p>
                                <p>30 days</p>
                                <p>10.75%</p>
                                <p>N5500</p>
                                <p>12-02-2020</p>
                                <p className="green-txt">Approved</p>
                            </div>
                            <div class="lr-single2">
                                <p>Olowu John</p>
                                <p>₦5000</p>
                                <p>30 days</p>
                                <p>10.75%</p>
                                <p>N5500</p>
                                <p>12-02-2020</p>
                                <p className="green-txt">Approved</p>
                            </div>
                            <div class="lr-single2">
                                <p>Olowu John</p>
                                <p>₦5000</p>
                                <p>30 days</p>
                                <p>10.75%</p>
                                <p>N5500</p>
                                <p>12-02-2020</p>
                                <p className="green-txt">Approved</p>
                            </div>
                            <div class="lr-single2">
                                <p>Olowu John</p>
                                <p>₦5000</p>
                                <p>30 days</p>
                                <p>10.75%</p>
                                <p>N5500</p>
                                <p>12-02-2020</p>
                                <p className="green-txt">Approved</p>
                            </div>
                            <div class="lr-single2">
                                <p>Olowu John</p>
                                <p>₦5000</p>
                                <p>30 days</p>
                                <p>10.75%</p>
                                <p>N5500</p>
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

export default LoanAll;