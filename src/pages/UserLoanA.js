import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//css
import '../css/Users.css'

// components
import Sidemenu3 from '../components/menus/SideMenu3'
import Header from '../components/Header'

//assets
import Arrowr from '../assets/svg/pg-right.svg'
//import User from '../assets/svg/user02.svg'
//import Gdot from '../assets/svg/dot-g.svg'
import Loadicon from '../assets/png/loadgr.gif'

class UserLoanA extends Component {

    state = {
        uLoans: [],
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

        const userId = localStorage.getItem("userid")

        const baseURL = localStorage.getItem("baseURL")

        axios.get(`${baseURL}/admin/user/${userId}/credit?limit=5`, axiosConfig)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);

            this.setState({ 
                uName: res.data.data.transactions.docs[0].customer.firstName+" "+res.data.data.transactions.docs[0].customer.lastName,
                uLoans: res.data.data.transactions.docs,
                isLoaded: true
            });

            this.setState({ nullres : "" })

            /*if( this.state.MerchantsA.totalDocs === 0){
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

        console.log( localStorage.getItem("userid" ))

        let today = new Date();

        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        let today1 = yyyy + '-' + mm + '-' + dd ;
        console.log(today1)

        const userNameA = localStorage.getItem("uNameA")
        
        return (
            <div>
                <Header />
                <Sidemenu3 />
               <section className="users">
                    <div className="users-content animate__animated animate__fadeIn animate__slow">
                        <div className="userdetail-top">
                            <h1 className="page-title">Active Loan</h1>
                            <div className="pg-nav1">
                                <Link to="/users">
                                <p className="p-active">Users</p>
                                </Link>
                                <img src={Arrowr} alt="right"/>
                                <Link to="userdetails">
                                <p className="p-active">{userNameA}</p>
                                </Link>
                                <img src={Arrowr} alt="right"/>
                                <p>Active Loan</p>
                            </div>  
                            {this.state.isLoaded ?  (
                            <div className="userloan-container">
                                <div className="cal-in2">
                                    <input className="input-date" type="date"/>
                                    <input className="input-date" type="date"/> 
                                </div>
                                <div className="userloan-box">
                                    <div className="uslo-grid1">
                                        <p>Name</p>
                                        <p>Loan Terms</p>
                                        <p>Interest(%)</p>
                                        <p>Due date</p>
                                        <p>Status</p>
                                    </div>
                                   
                                    {this.state.uLoans.map (uLoan1 =>
                                    uLoan1.paybackDate.substring(0,10) >= today1 && (
                                        <div>
                                            <div className="uslo-grid2">
                                            <p>{uLoan1.merchant.name}</p>
                                            <p>1 Month</p>
                                            <p>N{uLoan1.paybackInterest}</p>
                                            <p>{uLoan1.paybackDate.substring(0,10)}</p>
                                            <p className="yellow-text">Ongoing</p>
                                            </div>
                                        </div>
                                    )
                                    )}
                                </div>
                            </div>
                             ): ( 
                                <div className="load-animation">
                                    <img  className="icon-load" src={Loadicon}  alt="loading"/> 
                                </div>
                            )}
                        </div>
                    </div>
               </section>
            </div>
        )
    }

}

export default UserLoanA;