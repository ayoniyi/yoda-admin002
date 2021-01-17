import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import NumberFormat from 'react-number-format';

//css
import '../css/Wallet.css'

// components
import Sidemenu5 from '../components/menus/SideMenu5'
import Header from '../components/Header'

//assets
//import User from '../assets/png/user1.png'
import Loadicon from '../assets/png/loadgr.gif'
//import Green from '../assets/svg/icons/gr-dot.svg'


class Wallet extends Component {

    state = {
        isLoaded: false
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

        const baseURL = localStorage.getItem("baseURL")

        axios.get(`${baseURL}/admin/wallet`, axiosConfig)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);

            this.setState({ 
                walletBalance: Math.round(res.data.data.balance[0].balance),
                isLoaded: true
            });


          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            
            this.setState({ isLoaded: true });
          })  
    }


    render () {

        //localStorage.setItem("merchantid",this.state.merchantid );
        
        return (
            <div>
                <Header />
                <Sidemenu5 />
                <section className="wallet">
                    <div className="wallet-content animate__animated animate__fadeIn animate__slow">
                        <div className="wallet-top">
                            <h1 className="page-title">Loan Wallet</h1>
                        </div>
                        {this.state.isLoaded ?  (
                        <div>
                            <div className="wallet-card2">
                                <p>Available balance</p>
                                <h1>
                                    {/*N23,000,000.00*/}
                                    <NumberFormat value= {this.state.walletBalance} 
                                    displayType={'text'} 
                                    thousandSeparator={true} prefix={'₦'} />
                                    .00 
                                </h1>
                                <Link to="/walletfund">
                                    {/* <button className="card-btn"><strong>Fund Wallet</strong></button> */}
                                </Link>
                            </div>
                            <div className="wallet-transactions">
                                {/* <h2>Transactions</h2> */}
                                {/* <div className="w-transactions-box">
                                    <div className="wt-single">
                                        <div className="wt-left">
                                            <img className="dot" src={Green} alt="dot"/>
                                            <div>
                                                <p>Wallet funded </p>
                                                <p className="mini-wt">13-01-2020</p>
                                            </div>
                                        </div>
                                        <div className="wt-right">
                                            <p><strong>+N2,000,000.00</strong></p>
                                            <p className="mini-wt2">4:40PM</p>
                                        </div>
                                    </div>
                                    <div className="wt-single">
                                        <div className="wt-left">
                                            <img className="dot" src={Green} alt="dot"/>
                                            <div>
                                                <p>Wallet funded </p>
                                                <p className="mini-wt">13-01-2020</p>
                                            </div>
                                        </div>
                                        <div className="wt-right">
                                            <p><strong>+N2,000,000.00</strong></p>
                                            <p className="mini-wt2">4:40PM</p>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>): 
                        ( 
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

export default Wallet;
