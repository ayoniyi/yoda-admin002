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
import User from '../assets/png/user0.png'
// import Gdot from '../assets/svg/dot-g.svg'
import Loadicon from '../assets/png/loadgr.gif'

class MerchantDetails extends Component {

    state = {
        isLoaded: false,
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
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);

            this.setState({ 
                mImage: res.data.data.merchant.image,
                mName: res.data.data.merchant.firstName+" "+res.data.data.merchant.lastName,
                mBusiness: res.data.data.merchant.businessName,
                mGender: res.data.data.merchant.gender,
                mPhone: res.data.data.merchant.mobile,
                mMail: res.data.data.merchant.email,
                mAddress: res.data.data.merchant.address,
                mBalance: Math.round(res.data.data.merchant.balance),
               

                isLoaded: true
            });

            this.setState({ nullres : "" })

            /*if( this.state.UsersA.totalDocs === 0){
                this.setState({ nullres : "No Users Found" });
            }*/

            localStorage.setItem("merchantBusiness", this.state.mBusiness)

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
                        <h1 className="page-title">Merchants</h1>
                        <div className="pg-nav1">
                            <Link to="/merchants">
                            <p className="p-active"> Merchants</p>
                            </Link>
                            <img src={Arrowr} alt="right"/>
                            <p>{this.state.mBusiness}</p>
                        </div>
                    </div>
                    {this.state.isLoaded ?  (
                    <div className="userdetail-content">
                        <div className="userdetail-box1">
                        <div className="ud-box1-main">
                            <div className="ud-sbox1">
                                {this.state.mImage !== "" && (
                                     <img className="userde" src={this.state.mImage} alt="user"  />    
                                )}
                                {this.state.mImage === "" && (
                                     <img className="userde" src={User} alt="user"  />    
                                )}
                                {/* <img className="userde" src={this.state.mImage} alt="user"  /> */}
                            </div>
                            <div className="ud-sbox2">
                                <div className="sbox-grid1">
                                    <p>Name</p>
                                    <p><strong>{this.state.mName}</strong></p>
                                </div>
                                <div className="sbox-grid1">
                                    <p>Gender</p>
                                    <p><strong>{this.state.mGender}</strong></p>
                                </div>
                                <div className="sbox-grid1n">
                                    <p>Address</p>
                                    <p><strong>{this.state.mAddress}</strong></p>
                                </div>
                               
                            </div>
                            <div className="ud-sbox3">
                                <div className="sbox-grid2">
                                    <p>Phone no.</p>
                                    <p><strong>{this.state.mPhone}</strong></p>
                                </div>   
                                <div className="sbox-grid2">
                                    <p>Email</p>
                                    <p><strong>{this.state.mMail}</strong></p>
                                </div>
                                
                            </div>
                            </div>
                            <div className="ud-box1-sub2">
                                <div className="sub-pillsa">
                                    <p>Wallet Balance</p>
                                    <p className="purple">₦{this.state.mBalance}</p>
                                </div>
                                <div className="sub-pills align-color">
                                    <Link to="/merchantcredits">
                                    <p>View transactions</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                       
                          
                        <div className="userdetail-box4">
                            {/* <div className="acti-container">
                                <h2> Activities </h2>
                                <div className="acti-box">
                                    <div className="acti-single">
                                        <div className="dot-contain">
                                            <img src={Gdot} alt="dot" />
                                        </div>
                                        <div className="acti-text">
                                            <p>Your loan of N5,000 was approved</p>
                                            <p className="small-txt">Today</p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
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

export default MerchantDetails;