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
/*
import Bar from '../assets/png/bar1.png'
import Greencal from '../assets/svg/icons/cal-green.svg'
import Ycal from '../assets/svg/icons/cal-yellow.svg'
import ocal from '../assets/svg/icons/cal-orange.svg'
import Bcal from '../assets/svg/icons/cal-blue.svg'
*/
import Loadicon from '../assets/png/loadgr.gif'


class LoanData extends Component {

    state = {
        LoansD: [],
        allLoanData: [],
        isLoaded: true,
        searchParam: ""
    };

    handleChangeDate = async (event) => {
        await this.setState({ startDate : event.target.value });
        console.log(this.state.startDate)
    }
    handleChangeDate2 = async (event) => {
        await this.setState({ endDate : event.target.value });
        console.log(this.state.endDate)
    }

    handleSubmit = event => {
        
        event.preventDefault();

        const token = localStorage.getItem("tokenset");

        this.setState({ isLoaded: false })

        let axiosConfig = {
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
            }
        };

        const baseURL = localStorage.getItem("baseURL")
        const startDate = this.state.startDate;
        const endDate = this.state.endDate;
        //const searchparam = this.state.searchParam;
        const status = this.state.status;
        const terms = this.state.terms;

        console.log(status)
        //console.log(startDate)

        axios.get(`${baseURL}/admin/loan?startDate=${startDate}&endDate=${endDate}&loanTerm=${terms}&status=${status}`, axiosConfig)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);

            this.setState({ 
                LoansD: res.data.data.transactions.docs,
                resPages: res.data.data.transactions.totalPages,
                resLoans: res.data.data.transactions.totalDocs,
                isLoaded: true
            });

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
            
            const dataAll = this.state.LoansD.map(row => ({
                InterestRate: row.paybackInterestRate+"%",
                InterestAmount: "₦"+Math.round(row.paybackInterest),
                Status: row.status,
                PaybackDate: row.paybackDate.substring(0,10),
                Amount: row.amount,
                Name: row.customer.firstName + " " + row.customer.lastName

            }))
            
            const csvData1 = objectToCsv(dataAll)
           // console.log(csvData1);

            ////////////////////////
            this.setState({ allLoanData: csvData1 });
            //console.log(this.state.allLoanData)

          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
           // this.setState({ nullres : "No Users Found" });
            
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
        const startDate = this.state.startDate;
        const endDate = this.state.endDate;
       
        const status = this.state.status;
        const terms = this.state.terms;
        const pageNumber = this.state.pageNumber
        //console.log(pageNo)

        axios.get(`${baseURL}/admin/loan?page=${pageNumber}&startDate=${startDate}&endDate=${endDate}&loanTerm=${terms}&status=${status}`, axiosConfig)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);

            this.setState({ 
                LoansD: res.data.data.transactions.docs,
                isLoaded: true
            });

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
            
            const dataAll = this.state.LoansD.map(row => ({
                InterestRate: row.paybackInterestRate+"%",
                InterestAmount: "₦"+Math.round(row.paybackInterest),
                Status: row.status,
                PaybackDate: row.paybackDate.substring(0,10),
                Amount: row.amount,
                Name: row.customer.firstName + " " + row.customer.lastName

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
                        <Link to="/LoansAll">
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
                        <form className="ld-top" onSubmit={this.handleSubmit}>
                            <div className="ld-top-content">
                                <h1 className="page-title">Data</h1>
                                <div className="ld-cal2">
                                    <select className="select-edit" onChange= {(e) => this.setState({ terms : e.target.value})} >
                                        <option disabled selected>Filter by Loan terms</option>
                                        <option value="30">30 days</option>
                                        <option value="60">60 days</option>
                                        <option value="90">90 days</option>
                                    </select>
                                    {/*<select className="select-edit" >
                                        <option disabled selected>Filter by Interest</option>
                                        <option value=" 5 "> 5% </option>
                                        <option value=" 10 "> 10% </option>
                                        <option value=" 15 "> 15% </option>
                                    </select>*/}
                                    <select className="select-edit" onChange= {(e) => this.setState({ status : e.target.value})} >
                                        <option disabled selected>Filter by Status</option>
                                        <option value="credit">Unpaid</option>
                                        <option value="paid">Paid</option>
                                    </select>
                                    <input className="input-date" type="date" onChange={this.handleChangeDate} required/>
                                    <input className="input-date" type="date" onChange={this.handleChangeDate2} required/> 
                                    <input className="search-submit" type="submit" value="Filter" />
                                </div>
                            </div>
                        </form>
                        {this.state.LoansD.length >=1 ? (
                        this.state.isLoaded  ?  (
                        <div className="lr-table">
                            <div className="lrtable-top-data">
                                <p>Loan Terms</p>
                                <p>Interest {/*(%)*/}</p>
                                <p>Status</p>
                                <p>Date</p>
                                <p>Amount</p>
                                <p>Name</p>
                            </div>
                            <div>
                                {this.state.LoansD.map (loans1 =>
                                <div className="lr-single-data" key={loans1._id}>
                                    
                                    {loans1.paybackInterestRate === 5 && (
                                        <p >30 days</p>
                                    )}
                                    {loans1.paybackInterestRate === 10 && (
                                        <p >60 days</p>
                                    )}
                                    {loans1.paybackInterestRate === 15 && (
                                        <p >90 days</p>
                                    )}

                                    <p>₦{/*10.75%*/}{loans1.paybackInterest}</p>
                                   
                                    {(loans1.status === "credit" && loans1.paybackDate.substring(0,10) <= today1) && (
                                         <p className="red-txt">Unpaid</p>
                                    )}
                                    {loans1.status === "paid" && (
                                        <p className="green-txt">Paid</p>
                                    )} 
                                    {loans1.paybackDate.substring(0,10) >= today1 && ( 
                                        <p className="yellow-text">Ongoing</p> 
                                    )}

                                   
                                    <p>{loans1.paybackDate.substring(0,10)}</p>
                                    <p>₦{loans1.amount}</p>
                                    <p>{loans1.customer.firstName + " " + loans1.customer.lastName}</p>
                                     
                                    
                                </div>
                                
                                )}
                                
                            </div>
                                <br></br>
                                {/* <button onClick={() => this.setState({popClicked: true})}
                                 className="export-submit">Export</button> */}
                                <CSVLink
                                    data={this.state.allLoanData}
                                    filename={"LoanData.csv"}>
                                    <button className="export-submit">
                                    Export
                                    </button>
                                </CSVLink>
                            
                        </div>): ( 
                                <div className="load-animation">
                                    <img  className="icon-load" src={Loadicon}  alt="loading"/> 
                                </div>
                        )
                        ): ( null )
                    }
                    {this.state.resPages > 1 && (
                        <div className="paginate-btns">
                            {/*this.state.resPages*/}
                            {/*<button className="pg-btn">{sn++}</button>*/}
                            <p className="pg-txt">Pages: </p>
                            {[...Array(this.state.resPages)].map((btn, index) =>  
                                <button className="pg-btn" 
                                onClick={this.paginate} 
                                value={index+1} >
                                    {index+1}
                                </button>
                                
                            )}
                        </div>
                       )}
                    </div>

                </section>
            </div>
        )
    }

}

export default LoanData;