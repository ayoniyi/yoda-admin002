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
import Loadicon from '../assets/png/loadgr.gif'


class LoanRequest extends Component {

    state = {
        LoansA: [],
        isLoaded: false,
    };

    componentDidMount() {
        const token = localStorage.getItem("tokenset");
        //console.log(token)
        if (token === null ) {
            window.location="/"
        }
    
        let axiosConfig = {
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
            }
        };

        const baseURL = localStorage.getItem("baseURL")

        axios.get(`${baseURL}/admin/loan?limit=5`, axiosConfig)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);

            this.setState({ 
                LoansA: res.data.data.transactions.docs,
                isLoaded: true
            });

          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
           // this.setState({ nullres : "No Users Found" });
            
            this.setState({ isLoaded: true });
          })  
    }

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
                                {/*<div className="lr-cal">
                                    <input className="input-date" type="date"/>
                                    <input className="input-date" type="date"/> 
                                </div>*/}
                            </div>
                            <div className="lr-top-right">
                               {/*} <form>
                                    <input className="search-field" type="text" placeholder="Search" />
                                    <input className="search-submit" type="submit" value="Search" />
                             </form>*/}
                            </div>
                        </div>
                        {this.state.isLoaded ?  (
                        <div className="lr-table">
                            <div className="lrtable-top">
                                <p>Name</p>
                                <p>Amount</p>
                                <p>Loan Terms</p>
                                <p>Interest (%)</p>
                                <p>Payback date</p>
                                <p>Status</p>
                            </div>
                            <div>
                                {this.state.LoansA.map (loans1 =>
                                <div className="lr-single" key={loans1._id}>
                                   <p>{loans1.customer.firstName + " " + loans1.customer.lastName}</p>
                                   <p>₦{loans1.amount}</p>
                                   {loans1.paybackInterestRate === 5 && (
                                        <p >30 days</p>
                                    )}
                                    {loans1.paybackInterestRate === 10 && (
                                        <p >60 days</p>
                                    )}
                                    {loans1.paybackInterestRate === 15 && (
                                        <p >90 days</p>
                                    )}
                                   <p>₦{loans1.paybackInterestRate}%</p>
                                   <p>{loans1.paybackDate.substring(0,10)}</p>
                                    <p className="green-txt">Approved</p>
                                </div>
                                )}
                            </div>
                        </div>
                        ): ( 
                            <div className="load-animation">
                                <img  className="icon-load" src={Loadicon}  alt="loading"/> 
                            </div>
                        )}
                    </div>
                </section>
            </div>
        )
    }
}

export default LoanRequest;