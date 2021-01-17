import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//css
import '../css/Merchants.css'

// components
import Sidemenu4 from '../components/menus/SideMenu4'
import Header from '../components/Header'

//assets
import Arrowr from '../assets/svg/pg-right.svg'
import Green from '../assets/svg/icons/gr-dot.svg'

import Loadicon from '../assets/png/loadgr.gif'

class MerchantCredits extends Component {

    state = {
        CreditsA: [],
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

        const merchantId = localStorage.getItem("merchantid")

        const baseURL = localStorage.getItem("baseURL")

        axios.get(`${baseURL}/admin/merchant/${merchantId}`, axiosConfig)
        .then((res1) => {
            console.log("RESPONSE RECEIVED: ", res1);

            this.setState({ 
                mBusiness: res1.data.data.merchant.businessName,
                isLoaded: true
            });

            this.setState({ nullres : "" })

          })
          .catch((err1) => {
            console.log("AXIOS ERROR: ", err1);
            
            this.setState({ isLoaded: true });
          })  
        
        //const baseURL = localStorage.getItem("baseURL")

        axios.get(`${baseURL}/admin/merchant/${merchantId}/credit?limit=5`, axiosConfig)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);

            this.setState({ 
                CreditsA: res.data.data.transactions.docs,
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

        console.log( localStorage.getItem("merchantid" ))
        
        return (
            <div>
                <Header />
                <Sidemenu4 />
               <section className="users">
                    <div className="users-content animate__animated animate__fadeIn animate__slow">
                        <div className="userdetail-top">
                            <h1 className="page-title">Transactions</h1>
                            <div className="pg-nav1">
                                <Link to="/merchants">
                                    <p className="p-active"> Merchants</p>
                                </Link>
                                <img src={Arrowr} alt="right"/>
                                <Link to="merchantdetails">
                                    <p className="p-active">{this.state.mBusiness}</p>
                                </Link>
                                <img src={Arrowr} alt="right"/>
                                <p>Transactions</p>
                            </div>
                        </div>
                        <div className="tr-content">
                            <div className="tr-box">
                                <div className="tr-tabs">
                                    <Link to="/merchantcredits">
                                        <div className="t-tab tab-a">
                                            <p>Credit</p>
                                        </div>
                                    </Link>
                                   <Link to="/merchantdebits">
                                       <div className="t-tab">
                                            <p>Debit</p>
                                        </div>
                                   </Link>
                                </div>
                                {this.state.isLoaded ?  (
                                <div className="tr-container">
                                    {this.state.CreditsA.map (credits1 =>
                                    <div className="wt-single2 bottom-line" key={credits1._id}>
                                        <div className="wt-left2">
                                            <img className="dot" src={Green} alt="dot"/>
                                            <div className="wt-t2">
                                                <p>Somebody Credited </p>
                                                <p className="mini-wt">
                                                    {/*Fri, 01 May 2020 16:20:40 GMT*/}
                                                    {/*credits1.createdAt*/}
                                                    {credits1.createdAt.substring(0,10)+" "+credits1.createdAt.substring(11,19)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="wt-right">
                                            <p>₦{credits1.amount}</p>
                                        </div>
                                    </div>)}
                                </div>
                                ): ( 
                                    <div className="load-animation">
                                        <img  className="icon-load" src={Loadicon}  alt="loading"/> 
                                    </div>
                            )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default MerchantCredits;