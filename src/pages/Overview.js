import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import NumberFormat from 'react-number-format';


//css
//import '../css/Login.css'
import '../css/Overview.css'

// components
import Sidemenu from '../components/menus/SideMenu'
import Header from '../components/Header'
import Chart2 from '../components/Chart2'

//assets
//import Graph from '../assets/png/graph1.png'
import blue1 from '../assets/svg/icons/blue1.svg'
import red1 from '../assets/svg/icons/red1.svg'
import yellow1 from '../assets/svg/icons/yellow1.svg'
import green1 from '../assets/svg/icons/green1.svg'
// import locations from '../assets/png/locations.png'
import Loadicon from '../assets/png/loadgr.gif'



class Overview extends Component {

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

        ///////// Investment Vs Returns


          ////////    Return Summarry

          axios.get(`${baseURL}/admin/loan/returns`, axiosConfig)
          .then((res2) => {
            //console.log("RESPONSE RECEIVED: ", res2);

           this.setState({ 
                totalInvested: Math.round(res2.data.data.stats.totalAmountInvested), 
                totalReturns: Math.round(res2.data.data.stats.totalReturns), 
                totalProfit: Math.round(res2.data.data.stats.profit), 
                outsBal: Math.round(res2.data.data.stats.outstandingBalance),
                isLoaded: true 
            }); 
            //console.log(this.state.)

          })
          .catch((err2) => {
            console.log("AXIOS ERROR: ", err2);
            
            this.setState({ isLoaded: true });
          }) 
          
          
          /////////   Other Loan Stats

          axios.get(`${baseURL}/admin/loan/stats`, axiosConfig)
          .then((res3) => {
            //console.log("RESPONSE RECEIVED: ", res3);

           this.setState({ 
                amtAvailable: res3.data.data.stats.loanAmountAvailable, 
                amtCollected: res3.data.data.stats.loanAmountCollected, 
                amtDue: res3.data.data.stats.loadAmountDue, 
                amtProcess: res3.data.data.stats.loanAmountProcessing, 
                isLoaded: true
            }); 


          })
          .catch((err3) => {
            console.log("AXIOS ERROR: ", err3);
            
            this.setState({ isLoaded: true });
          }) 

          //////////   Upcoming payments
          axios.get(`${baseURL}/admin/loan?limit=60`, axiosConfig)
            .then((res4) => {
               console.log("RESPONSE RECEIVED: ", res4);

                this.setState({ 
                    LoansA: res4.data.data.transactions.docs,
                    isLoaded: true
                });


            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
                
                this.setState({ isLoaded: true });
            }) 

            /// Wallet
            axios.get(`${baseURL}/admin/wallet`, axiosConfig)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);

                this.setState({ 
                    walletBalance: Math.round(res.data.data.balance[0].balance),
                   
                });


            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
                
            })  
            
    }

    render () {

        // todays date

        let today = new Date();

        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        let today1 = yyyy + '-' + mm + '-' + dd ;

        return (
            <div>
                <Header />
                <Sidemenu />
                <section className="overview">
                    <div className="overview-content ">
                        <h1 className="page-title">Dashboard</h1>
                        {this.state.isLoaded ?  (
                        <div>
                        <div className="overview-boxesa animate__animated animate__fadeIn animate__slow">
                            <div className="overboxa-left">
                                <div className="boxa-left-top">
                                    <div className="topa-1">
                                        <p className="topa-title">Investments Vs Returns</p>
                                    </div>
                                    {/*<div className="topa-2">
                                        <input className="input-date" type="date"/>
                                        <input className="input-date" type="date"/> 
                                    </div>*/}
                                </div>
                                {/*<img src={Graph} alt="graph" />*/}
                                <Chart2 />
                            </div>
                            <div className="overboxa-right">
                                <p className="topa-title">Return Summary</p>
                                <div className="line"></div>
                                <div className="rightbox-a">
                                    <p className="boxtl-small">Total Amount Invested:</p>
                                    {this.state.totalInvested === undefined && (
                                       <p>
                                       <strong>₦0.00</strong>
                                       </p> 
                                    )}
                                    {this.state.totalInvested !== undefined && (
                                    <p>
                                        <strong>
                                        <NumberFormat value={this.state.totalInvested} 
                                        displayType={'text'} 
                                        thousandSeparator={true} prefix={' ₦'} /> 
                                        .00
                                        </strong>
                                    </p>
                                    )}
                                </div>
                                <div className="rightbox-a">
                                    <p className="boxtl-small">Total Return:</p>
                                    {this.state.totalReturns === undefined && (
                                       <p>
                                       <strong>₦0.00</strong>
                                       </p> 
                                    )}
                                    {this.state.totalReturns !== undefined && (
                                    <p>
                                        <strong>
                                        <NumberFormat value={this.state.totalReturns} 
                                        displayType={'text'} 
                                        thousandSeparator={true} prefix={'₦'} /> 
                                        .00
                                        </strong>
                                    </p>
                                    )}
                                </div>
                                <div className="rightbox-a">
                                    <p className="boxtl-small">Profit:</p>
                                    {this.state.totalProfit === undefined && (
                                       <p>
                                       <strong>₦0.00</strong>
                                       </p> 
                                    )}
                                    {this.state.totalProfit !== undefined && (
                                    <p>
                                        <strong>
                                        <NumberFormat value={this.state.totalProfit} 
                                        displayType={'text'} 
                                        thousandSeparator={true} prefix={'₦'} /> 
                                        .00
                                        </strong>
                                    </p>
                                    )}
                                </div>
                                <div className="righta-bottom">
                                    <p className="">Outstanding balance</p>
                                    {this.state.outsBal === undefined && (
                                       <p>
                                       <strong>₦0.00</strong>
                                       </p> 
                                    )}
                                    {this.state.outsBal !== undefined && (
                                    <p>
                                        <strong>
                                        <NumberFormat value={this.state.outsBal} 
                                        displayType={'text'} 
                                        thousandSeparator={true} prefix={' ₦'} /> 
                                        .00
                                        </strong>
                                    </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="overview-4boxes animate__animated animate__fadeIn animate__slow">
                                <div className="overview-4box">
                                    <div className="box4-top">
                                        <p>Loan Amt. Available</p>
                                        <img src={blue1} alt="icon" />
                                    </div>
                                    {this.state.amtAvailable === undefined && (
                                       <p>
                                       <strong>₦0.00</strong>
                                       </p> 
                                    )}
                                    {this.state.amtAvailable !== undefined && (
                                    <p>
                                        <strong>
                                        <NumberFormat value={this.state.amtAvailable} 
                                        displayType={'text'} 
                                        thousandSeparator={true} prefix={' ₦'} /> 
                                        .00
                                        </strong>
                                    </p>
                                    )}
                                </div>
                                <div className="overview-4box">
                                    <div className="box4-top">
                                        <p>Loan Amt. Collected</p>
                                        <img src={green1} alt="icon" />
                                    </div>
                                    {this.state.amtCollected === undefined && (
                                       <p>
                                       <strong>₦0.00</strong>
                                       </p> 
                                    )}
                                    {this.state.amtCollected !== undefined && (
                                    <p>
                                        <strong>
                                        <NumberFormat value={this.state.amtCollected} 
                                        displayType={'text'} 
                                        thousandSeparator={true} prefix={' ₦'} /> 
                                        .00
                                        </strong>
                                    </p>
                                    )}
                                </div>
                                <div className="overview-4box">
                                    <div className="box4-top">
                                        <p> Amt. Not Paid</p>
                                        <img src={red1} alt="icon" />
                                    </div>
                                    {this.state.amtDue === undefined && (
                                       <p>
                                       <strong>₦0.00</strong>
                                       </p> 
                                    )}
                                    {this.state.amtDue !== undefined && (
                                    <p>
                                        <strong>
                                        <NumberFormat value={this.state.amtDue} 
                                        displayType={'text'} 
                                        thousandSeparator={true} prefix={' ₦'} /> 
                                        .00
                                        </strong>
                                    </p>
                                    )}
                                </div>
                                <div className="overview-4box-l">
                                    <div className="box4-top">
                                        <p>Amt. Under Process</p>
                                        <img src={yellow1} alt="icon" />
                                    </div>
                                    {this.state.amtProcess === undefined && (
                                        <p>
                                        <strong>₦0.00</strong>
                                        </p> 
                                    )}
                                    {this.state.amtProcess !== undefined && (
                                    <p>
                                        <strong>
                                        <NumberFormat value={this.state.amtProcess} 
                                        displayType={'text'} 
                                        thousandSeparator={true} prefix={' ₦'} /> 
                                        .00
                                        </strong>
                                    </p>
                                    )}
                                </div>
                        </div>
                        <div className="overview-boxesb animate__animated animate__fadeIn animate__slow">
                            <div className="overviewboxb-left">
                                <p>Loan Wallet</p>
                                <div className="wallet-card">
                                    <p>Available Balance</p>
                                    <p>
                                        <strong>
                                            <NumberFormat value= {this.state.walletBalance} 
                                            displayType={'text'} 
                                            thousandSeparator={true} prefix={'₦'} />
                                            .00 
                                        </strong>
                                    </p>
                                </div>
                            </div>
                            {/* <div className="overviewboxb-right">
                                <p>User Locations</p>
                                <img src={locations} alt="locations"/>
                            </div> */}
                            <div className="overviewboxb-right animate__animated animate__fadeIn animate__slow">
                                <div className="overc-top">
                                    <p>Upcoming Payments</p>
                                    <Link to="loansall">
                                    <p className="a-link">View All</p>
                                    </Link>
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
                                    {this.state.LoansA.map (loans1 =>
                                        <div key={loans1._id}>
                                        {loans1.paybackDate.substring(0,10) >= today1 && ( 
                                        <div className="overc-single" >
                                            <p>{loans1.customer.firstName + " " + loans1.customer.lastName}</p>
                                            <p>1 Month</p>
                                            <p>₦{/*10.75%*/}{loans1.paybackInterest}</p>
                                            <p>{loans1.paybackDate.substring(0,10)}</p>
                                            <p>Pending</p>
                                        </div>
                                        )}
                                        </div>
                                    )}   
                                    </div>
                                </div>
                            </div>
                        </div>  
                        {/* <div className="overview-c animate__animated animate__fadeIn animate__slow">
                            <div className="overc-top">
                                <p>Upcoming Payments</p>
                                <Link to="loansall">
                                <p className="a-link">View All</p>
                                </Link>
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
                                {this.state.LoansA.map (loans1 =>
                                    <div key={loans1._id}>
                                    {loans1.paybackDate.substring(0,10) >= today1 && ( 
                                    <div className="overc-single" >
                                        <p>{loans1.customer.firstName + " " + loans1.customer.lastName}</p>
                                        <p>1 Month</p>
                                        <p>₦{loans1.paybackInterest}</p>
                                        <p>{loans1.paybackDate.substring(0,10)}</p>
                                        <p>Pending</p>
                                    </div>
                                    )}
                                    </div>
                                )}   
                                </div>
                            </div>
                        </div> */}
                        </div>): ( 
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
    

export default Overview ;