import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import NumberFormat from 'react-number-format';

//css
import '../css/Loans.css'


// components
import Sidemenu2 from '../components/menus/SideMenu2'
import Header from '../components/Header'
import Chart1 from '../components/Chart1'

//assets
//import Bar from '../assets/png/bar1.png'
import Greencal from '../assets/svg/icons/cal-green.svg'
import Ycal from '../assets/svg/icons/cal-yellow.svg'
import ocal from '../assets/svg/icons/cal-orange.svg'
import Bcal from '../assets/svg/icons/cal-blue.svg'
import Loadicon from '../assets/png/loadgr.gif'


class Loans extends Component {

    state = {
        LoansA: [],
        LoansB: [],
        isLoaded: false,
        searchParam: "",
        pagebtns: []
    };

    componentDidMount() {
        const token = localStorage.getItem("tokenset");
       // console.log(token)
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

        // Query All

        axios.get(`${baseURL}/admin/loan?limit=60`, axiosConfig)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);

            this.setState({ 
                LoansA: res.data.data.transactions.docs,
                isLoaded: true
            });

            this.setState({ nullres : "" })

            //// total paid loans ( on-time )

                const totalPaid0 = res.data.data.transactions.docs.filter(tP => tP.status === "paid")
            
                const totalPaid1 = totalPaid0.map(ttp => {
                    return (
                        ttp.amount
                    )
                })

                const totalPaidlength = totalPaid0.length
                console.log(totalPaid1)
            

                this.setState({ 
                    totalPaid: Math.round(totalPaid1.reduce((a, b) => a + b, 0)),
                    totalPaidLength: totalPaidlength
                })
           

            ////

          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            
            this.setState({ isLoaded: true });
          }) 
          
        // Query recent

        axios.get(`${baseURL}/admin/loan?limit=5`, axiosConfig)
        .then((res2) => {
            console.log("RESPONSE RECEIVED: ", res2);

            this.setState({ 
                LoansB: res2.data.data.transactions.docs,
                isLoaded: true
            });

          })
          .catch((err2) => {
            console.log("AXIOS ERROR: ", err2);
            
            this.setState({ isLoaded: true });
          })  

          // Query 30 days 
          axios.get(`${baseURL}/admin/loan?daysLate=30`, axiosConfig)
          .then((res3) => {
              //console.log("RESPONSE RECEIVED: ", res3);

              const lateLoans30 = res3.data.data.transactions.docs
  

              const late30 = lateLoans30.map(l30 => {
                  return (
                      l30.amount
                  )
              })

              const late30length = lateLoans30.length
             

              this.setState({ 
                lateLoans30: Math.round(late30.reduce((a, b) => a + b, 0)),
                lateLoans30Length: late30length
            })
  
            })
            .catch((err3) => {
              console.log("AXIOS ERROR: ", err3);
              
            }) 

          // Query 60 days 
          axios.get(`${baseURL}/admin/loan?daysLate=60`, axiosConfig)
          .then((res4) => {
              //console.log("RESPONSE RECEIVED: ", res4);
  
              const lateLoans60 = res4.data.data.transactions.docs
  

              const late60 = lateLoans60.map(l60 => {
                  return (
                      l60.amount
                  )
              })

              const late60length = lateLoans60.length
              
            this.setState({ 
                lateLoans60: Math.round(late60.reduce((a, b) => a + b, 0)),
                lateLoans60Length: late60length
            })
  
            })
            .catch((err4) => {
              console.log("AXIOS ERROR: ", err4);
              
            }) 

          // Query 90 days 
          axios.get(`${baseURL}/admin/loan?daysLate=90`, axiosConfig)
          .then((res5) => {
              //console.log("RESPONSE RECEIVED: ", res5);
  
              const lateLoans90 = res5.data.data.transactions.docs

              const late90 = lateLoans90.map(l90 => {
                  return (
                      l90.amount
                  )
              })

              const late90length = lateLoans90.length
            //   console.log(late90)
            //   console.log(late90length)

            this.setState({ 
                lateLoans90: Math.round(late90.reduce((a, b) => a + b, 0)),
                lateLoans90Length: late90length
            })
  
  
            })
            .catch((err5) => {
              console.log("AXIOS ERROR: ", err5);
              
            }) 
    }

    render () {

    // Today's date 
    let today = new Date();

    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    let today1 = yyyy + '-' + mm + '-' + dd ;

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
                        {this.state.isLoaded ?  (
                        <div>    
                        <div className="loan-boxes-a">
                            <div className="loan-box1">
                                <p className="lb-title">Loan Disbursed History</p>
                                
                                <Chart1 />
                            </div>
                            <div className="loan-box2">
                                <div className="loan-box-top">
                                    <p className="lb-title">Outstanding Delay Status</p>
                                    {/*<div className="cal-in">
                                        <input className="input-date" type="date"/>
                                        <input className="input-date" type="date"/> 
                                    </div>*/}
                                </div>
                                <div className="loan-box-body">
                                    <div className="lcubes">
                                        <div className="ltwo">
                                            <div className="lbox">
                                                <div className="lbox-top">
                                                    <img src={Greencal} alt="cal" />
                                                    <p>On-time</p>
                                                </div>
                                                <p className="l-amt">
                                                    <NumberFormat value= {this.state.totalPaid} 
                                                    displayType={'text'} 
                                                    thousandSeparator={true} prefix={'₦'} />
                                                </p>
                                                <Link to="ontime">
                                                    <p className="lbox-ps">{this.state.totalPaidLength} Memeber(s) &gt; </p>
                                                </Link>
                                            </div>
                                            <div className="lbox">
                                                <div className="lbox-top">
                                                    <img src={Bcal} alt="cal" />
                                                    <p>30 Days Late</p>
                                                </div>
                                                <p className="l-amt">
                                                    <NumberFormat value= {this.state.lateLoans30} 
                                                    displayType={'text'} 
                                                    thousandSeparator={true} prefix={'₦'} />
                                                </p>
                                                <Link to="late30">
                                                    <p className="lbox-ps"> {this.state.lateLoans30Length} Memeber(s) &gt;</p>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="ltwo">
                                            <div className="lbox">
                                                <div className="lbox-top">
                                                    <img src={Ycal} alt="cal" />
                                                    <p>60 Days Late</p>
                                                </div>
                                                <p className="l-amt">
                                                    <NumberFormat value= {this.state.lateLoans60} 
                                                    displayType={'text'} 
                                                    thousandSeparator={true} prefix={'₦'} />
                                                </p>
                                                <Link to="late60">
                                                    <p className="lbox-ps"> {this.state.lateLoans60Length} Memeber(s) &gt;</p>
                                                </Link>
                                            </div>
                                            <div className="lbox">
                                                <div className="lbox-top">
                                                    <img src={ocal} alt="cal" />
                                                    <p>90 Days Late</p>
                                                </div>
                                                <p className="l-amt">
                                                    <NumberFormat value= {this.state.lateLoans90} 
                                                    displayType={'text'} 
                                                    thousandSeparator={true} prefix={'₦'} />
                                                </p>
                                                <Link to="late90">
                                                    <p className="lbox-ps"> {this.state.lateLoans90Length} Memeber(s) &gt;</p>
                                                </Link>
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
                                    {this.state.LoansB.map (loans2 =>
                                        <div className="lb-single" key={loans2._id}>
                                            <p>{loans2.customer.firstName + " " + loans2.customer.lastName}</p>
                                            {loans2.paybackInterestRate === 5 && (
                                            <p >1 Month</p>
                                            )}
                                            {loans2.paybackInterestRate === 10 && (
                                            <p >2 Months</p>
                                            )}
                                            {loans2.paybackInterestRate === 15 && (
                                            <p >3 Months</p>
                                            )}
                                            <p>{loans2.paybackInterestRate}%</p>
                                            <p>{loans2.paybackDate.substring(0,10)}</p>
                                        </div>
                                    )}
                                    </div>
                                    </div>
                                </div>
                            
                        <div className="loan-box4">
                            <div className="lb-top2">
                                <p>Defaulters</p>
                                <Link to="loansall">
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
                                    {this.state.LoansA.map (loans1 =>
                                        (loans1.status === "credit" && loans1.paybackDate.substring(0,10) <= today1) && (
                                        <div className="lb-single" key={loans1._id}>
                                            <p>{loans1.customer.firstName + " " + loans1.customer.lastName}</p>
                                            {loans1.paybackInterestRate === 5 && (
                                            <p >1 Month</p>
                                            )}
                                            {loans1.paybackInterestRate === 10 && (
                                            <p >2 Months</p>
                                            )}
                                            {loans1.paybackInterestRate === 15 && (
                                            <p >3 Months</p>
                                            )}
                                            <p>{/*₦10.75%*/}{loans1.paybackInterestRate}%</p>
                                            <p>{loans1.paybackDate.substring(0,10)}</p>
                                        </div>
                                         )
                                    )}
                                    </div>
                                </div>
                            </div>
                        </div>
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

export default Loans;