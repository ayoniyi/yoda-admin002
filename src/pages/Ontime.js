import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CSVLink, } from "react-csv";


//css
import '../css/Loans.css'


// components
import Sidemenu2 from '../components/menus/SideMenu2'
import Header from '../components/Header'

//assets

import Loadicon from '../assets/png/loadgr.gif'


class Ontime extends Component {

    state = {
        LoansL: [],
        allLoanData: [],
        isLoaded: false
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

        axios.get(`${baseURL}/admin/loan?limit=60`, axiosConfig)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);

            this.setState({ 
                //LoansL: res.data.data.transactions.docs,
                LoansL: res.data.data.transactions.docs.filter(tP => tP.status === "paid"),
                resPages: res.data.data.transactions.totalPages,
                resLoans: res.data.data.transactions.totalDocs,
                isLoaded: true
            });
            
            //
            //const totalPaid0 = res.data.data.transactions.docs.filter(tP => tP.status === "paid")

            // new CSV method /////////////////////////////////
            const objectToCsv = function(dataAll){
                const csvRows = [];

                // get the headers
                const resHeaders = Object.keys(dataAll[0]);
                csvRows.push(resHeaders.join(','));
                
                // loop over the rows
                for (const row of dataAll) {
                    const valU = resHeaders.map(header1 => {
                        return row[header1]
                    })
                    csvRows.push(valU.join(','));
                }

                return csvRows.join('\n\n');
            }
            
            const dataAll = this.state.LoansL.map(row => ({
                Name: row.customer.firstName + " " + row.customer.lastName,
                Amount: row.amount,
                InterestRate: row.paybackInterestRate+"%",
                InterestAmount: "₦"+Math.round(row.paybackInterest),
                PaybackAmount: "₦"+Math.round(row.paybackAmount),
                PaybackDate: row.paybackDate.substring(0,10),
                Status: row.status
            }))
            
            const csvData1 = objectToCsv(dataAll)
           // console.log(csvData1);

            ////////////////////////
            this.setState({ allLoanData: csvData1 });
            //console.log(this.state.allLoanData)


          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            
            this.setState({ isLoaded: true });
          })  
    }

    paginate = async (event) => {

        event.preventDefault();

        await this.setState({ 
            isLoaded: false,
            pageNumber : event.target.value 
        });


        const token = localStorage.getItem("tokenset");
    
        let axiosConfig = {
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
            }
        };

        const baseURL = localStorage.getItem("baseURL")
        const pageNumber = this.state.pageNumber
        //console.log(pageNo)

        axios.get(`${baseURL}/admin/loan?page=${pageNumber}`, axiosConfig)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);

            this.setState({ 
                LoansL: res.data.data.transactions.docs.filter(tP => tP.status === "paid"),
                
                isLoaded: true
            });

          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            
            this.setState({ isLoaded: true });
          })  

    }

    render () {
        
      let today = new Date();

      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = today.getFullYear();

      let today1 = yyyy + '-' + mm + '-' + dd ;

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
                        <form className="lr-top"  >
                            <div className="lr-top-left">
                                <h1 className="page-title"> On-time payments </h1>
                            </div>
                        </form>
                        {this.state.isLoaded ?  (
                        <div className="lr-table">
                            <div className="lrtable-top2">
                                <p>Name</p>
                                <p>Amount</p>
                                <p>Loan Terms</p>
                                <p>Interest {/*(%)*/}</p>
                                <p>Payback amount</p>
                                <p>Payback date</p>
                                <p>Status</p>
                            </div>
                            <div>
                                {this.state.LoansL.map (loans1 =>
                                <div className="lr-single2" key={loans1._id}>
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

                                    <p>₦{/*10.75%*/}{Math.round(loans1.paybackInterest)}</p>
                                    <p>₦{Math.round(loans1.paybackAmount)}</p>
                                    <p>{loans1.paybackDate.substring(0,10)}</p>
                                    {(loans1.status === "credit" && loans1.paybackDate.substring(0,10) <= today1) && (
                                         <p className="red-txt">Unpaid</p>
                                    )}
                                    {loans1.status === "paid" && (
                                        <p className="green-txt">Paid</p>
                                    )} 
                                    {loans1.paybackDate.substring(0,10) >= today1 && ( 
                                        <p className="yellow-text">Ongoing</p> 
                                    )} 
                                    
                                </div>
                                )}
                            </div>
                            <br></br>
                            <CSVLink
                                data={this.state.allLoanData}
                                filename={"OntimePayments.csv"}>
                                <button className="export-submit">
                                Export
                                </button>
                            </CSVLink>
                            
                        </div>): ( 
                                <div className="load-animation">
                                    <img  className="icon-load" src={Loadicon}  alt="loading"/> 
                                </div>
                        )}
                        {/* {this.state.resPages >= 3 && (
                        <div className="paginate-btns">
                            {[...Array(this.state.resPages)].map((btn, index) =>  
                                <button className="pg-btn" 
                                onClick={this.paginate} 
                                value={index+1} >
                                    {index+1}
                                </button>
                            )}
                        </div>
                       )} */}
                    </div>
                </section>
           </div>
       )
    }
}

export default Ontime;