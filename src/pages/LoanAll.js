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

class LoanAll extends Component {

    state = {
        LoansA: [],
        isLoaded: false,
        searchParam: ""
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

        axios.get(`${baseURL}/admin/loan`, axiosConfig)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);

            this.setState({ 
                LoansA: res.data.data.transactions.docs,
                resPages: res.data.data.transactions.totalPages,
                resLoans: res.data.data.transactions.totalDocs,
                resPg: res.data.data.transactions.page,
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

    handleChangeDate = async (event) => {
        await this.setState({ startDate : event.target.value });
        console.log(this.state.startDate)
    }
    handleChangeDate2 = async (event) => {
        await this.setState({ endDate : event.target.value });
        console.log(this.state.endDate)
    }

    handleDate = event => {
        
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
        const searchparam = this.state.searchParam;
        const status = this.state.status;

        console.log(status)
        //console.log(startDate)

        axios.get(`${baseURL}/admin/loan?startDate=${startDate}&endDate=${endDate}&q=${searchparam}&status=${status}`, axiosConfig)
        .then((res2) => {
            console.log("RESPONSE RECEIVED: ", res2);

            this.setState({ 
                LoansA: res2.data.data.transactions.docs,
                resPages: res2.data.data.transactions.totalPages,
                resLoans: res2.data.data.transactions.totalDocs,
                isLoaded: true
            });

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
        const pageNumber = this.state.pageNumber
        //console.log(pageNo)

        axios.get(`${baseURL}/admin/loan?page=${pageNumber}`, axiosConfig)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);

            this.setState({ 
                LoansA: res.data.data.transactions.docs,
                
                isLoaded: true
            });

          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            
            this.setState({ isLoaded: true });
          })  

    }

    render () {

        localStorage.setItem("loanid",this.state.loanid );

        let today = new Date();

        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        let today1 = yyyy + '-' + mm + '-' + dd ;

        //let sn = 1;

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
                        <form className="lr-top"  onSubmit={this.handleDate}>
                            <div className="lr-top-left">
                                <h1 className="page-title">All Loans</h1>
                                <div className="lr-cal2" >
                                    <select className="select-edit"  onChange= {(e) => this.setState({ status : e.target.value})} >
                                        <option defaultValue>Filter by Status</option>
                                        {/*<option value=" In Progress ">In Progress</option>*/}
                                        <option value="credit">Unpaid</option>
                                        <option value="paid">Paid</option>
                                    </select>
                                    <input className="input-date" type="date" onChange={this.handleChangeDate} required />
                                    <input className="input-date" type="date" onChange={this.handleChangeDate2} required/> 
                                </div>
                            </div>
                            <div className="lr-top-right">
                                <div>
                                    <input className="search-field" type="text" placeholder="Search" 
                                    onChange= {(e) => this.setState({ searchParam : e.target.value})} required/>
                                    <input className="search-submit" type="submit" value="Search" />
                                </div>
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
                                {this.state.LoansA.map (loans1 =>
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
                        </div>): ( 
                                <div className="load-animation">
                                    <img  className="icon-load" src={Loadicon}  alt="loading"/> 
                                </div>
                        )}
                       {this.state.resPages >= 2 && (
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

export default LoanAll;