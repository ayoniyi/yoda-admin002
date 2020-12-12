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
import Gdot from '../assets/svg/dot-g.svg'

//import voter from '../assets/png/voter.png'
import cancel from '../assets/svg/icons/cancelv.svg'
import Loadicon from '../assets/png/loadgr.gif'

class UserID extends Component {

    state = {
        isLoaded: false,
    };


    componentDidMount() {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMzBhMjBiNGJjYzg5YzBiOTE3NThiZiIsImV4cCI6MTYzNzA2MDcxOSwiaWF0IjoxNjA1NTI0NzE5fQ.g1vRd26aCmgdFyTOtl9pVrbDQTC7T2rvta-7Rd4Ikjw";
        if (token === null ) {
            window.location="/"
        }
    
        let axiosConfig = {
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
            }
        };

        const useId = localStorage.getItem("userid")

        axios.get(`https://yoda-backend.herokuapp.com/admin/user/${useId}`, axiosConfig)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);

            this.setState({ 
                uImage: res.data.data.user.image,
                uName: res.data.data.user.firstName+" "+res.data.data.user.lastName,
                uGender: res.data.data.user.gender,
                uPhone: res.data.data.user.mobile,
                uMail: res.data.data.user.email,
                uMarital: res.data.data.user.maritalStatus,
                uBday: res.data.data.user.birthDay,
                uBvn: res.data.data.user.bvn,
                uAddress: res.data.data.user.address,
                uBalance: Math.round(res.data.data.user.balance),
                // nok
                nAddress: res.data.data.user.nok.address,
                nMobile: res.data.data.user.nok.mobile,
                nName: res.data.data.user.nok.name,
                nRel: res.data.data.user.nok.relationship,
                // employment info
                eCompany: res.data.data.user.employment.companyName,
                eAddress: res.data.data.user.employment.employerAddress,
                eDate: res.data.data.user.employment.employmentDate,
                eSalary: res.data.data.user.employment.monthlySalary,
                ePayDay: res.data.data.user.employment.payDay,
                // ID
                uiC: res.data.data.user.identity.url,

                isLoaded: true
            });

            this.setState({ nullres : "" })

            /*if( this.state.UsersA.totalDocs === 0){
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
        
        return (
            <div>
                <Header />
                <Sidemenu3 />

                <div className="overlay"></div>

                <section className="popup">
                    <div className="popup-box">
                    <Link to="userdetails" className="x-voter">
                        <img src={cancel} alt="x" />
                    </Link>
                    {this.state.isLoaded ?  (
                     <img className="v-image animate__animated animate__slideInDown"src={this.state.uiC} alt="id" />
                     ): ( 
                    <div className="load-animation">
                        <img  className="icon-load" src={Loadicon}  alt="loading"/> 
                    </div>
                    )}
                    </div>
                </section>

                <section className="users">
               <div className="users-content animate__animated animate__fadeIn animate__slow">
                    <div className="userdetail-top">
                        <h1 className="page-title">Users</h1>
                        <div className="pg-nav1">
                            <Link to="/users">
                            <p className="p-active">Users</p>
                            </Link>
                            <img src={Arrowr} alt="right"/>
                            <p className=" animate__animated animate__fadeIn animate__slow">{this.state.uName}</p>
                        </div>
                    </div>
                    {this.state.isLoaded ?  (
                    <div className="userdetail-content">
                        <div className="userdetail-box1">
                        <div className="ud-box1-main">
                            <div className="ud-sbox1">
                                <img className="userde" src={this.state.uImage} alt="user"  />
                            </div>
                            <div className="ud-sbox2">
                                <div className="sbox-grid1">
                                    <p>Name</p>
                                    <p><strong>{this.state.uName}</strong></p>
                                </div>
                                <div className="sbox-grid1">
                                    <p>Gender</p>
                                    <p><strong>{this.state.uGender}</strong></p>
                                </div>
                                <div className="sbox-grid1">
                                    <p>Marital Status</p>
                                    <p><strong>{this.state.uMarital}</strong></p>
                                </div>
                                <div className="sbox-grid1n">
                                    <p>Birthday</p>
                                    <p><strong>{this.state.uBday}</strong></p>
                                </div>
                            </div>
                            <div className="ud-sbox3">
                                <div className="sbox-grid2">
                                    <p>Phone no.</p>
                                    <p><strong>{this.state.uPhone}</strong></p>
                                </div>   
                                <div className="sbox-grid2">
                                    <p>Email</p>
                                    <p><strong>{this.state.uMail}</strong></p>
                                </div>
                                <div className="sbox-grid2">
                                    <p>BVN</p>
                                    <p><strong>{this.state.uBvn}</strong></p>
                                </div>
                                <div className="sbox-grid2n">
                                    <p>Address</p>
                                    <p><strong>{this.state.uAddress}</strong></p>
                                </div>
                            </div>
                            </div>
                            <div className="ud-box1-sub">
                                <div className="sub-pillsa">
                                    <p>Wallet Balance</p>
                                    <p className="purple">₦{this.state.uBalance}</p>
                                </div>
                                <div 
                                onClick={(e) => setTimeout(function() {
                                        window.location ="/userloanc";
                                    }, 500)}
                                className="sub-pills">
                                    <p >Loans Collected</p>
                                    <p className="purple">5 Loans</p>
                                </div>
                                <div 
                                  onClick={(e) => setTimeout(function() {
                                    window.location ="/userloana";
                                }, 500)}
                                className="sub-pills">
                                    <p>Active Loan</p>
                                    <p className="purple">1 Loan</p>
                                </div>
                                <div 
                                  onClick={(e) => setTimeout(function() {
                                    window.location ="/userloanu";
                                }, 500)}
                                className="sub-pills">
                                    <p>Unpaid Loan</p>
                                    <p className="purple">1 Loan</p>
                                </div>
                            </div>
                        </div>
                        <div className="userdetail-boxes2">
                            <div className="nk-container">
                                <h2>Next of Kin</h2>
                                <div className="nk-box padd">
                                    <div className="detailgrids-2">
                                    <p>Name</p>
                                    <p><strong>{this.state.nName}</strong></p>  
                                    </div>
                                    <div className="detailgrids-2">
                                    <p>Relationship</p>
                                    <p><strong>{this.state.nRel}</strong></p>  
                                    </div>
                                    <div className="detailgrids-2">
                                    <p>Telephone</p>
                                    <p><strong>{this.state.nMobile}</strong></p>  
                                    </div>
                                    <div className="detailgrids-2n">
                                    <p>Address</p>
                                    <p><strong>{this.state.nAddress}</strong></p>  
                                    </div>
                                </div>
                            </div>
                            <div className="ei-container">
                                <h2>Employment Information </h2>
                                <div className="ei-box">
                                    <div className="detailgrids-2">
                                        <p>Company name</p>
                                        <p><strong>{this.state.eCompany}</strong></p>  
                                    </div>
                                    <div className="detailgrids-2">
                                        <p>Monthly salary</p>
                                        <p><strong>N{this.state.eSalary}</strong></p>  
                                    </div>
                                    <div className="detailgrids-2">
                                        <p>Date of Employment</p>
                                        <p><strong>{this.state.eDate}</strong></p>  
                                    </div>
                                    <div className="detailgrids-2">
                                        <p>Pay Day</p>
                                        <p><strong>{this.state.ePayDay}</strong></p>  
                                    </div>
                                    <div className="detailgrids-2n">
                                        <p>Employer address</p>
                                        <p><strong>{this.state.eAddress}</strong></p>  
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="userdetail-box3">
                            <div className="iv-container">
                                <h2>Identity Verification</h2>
                                <div className="iv-box">
                                    <div className="iv-grid1">
                                        <p>Identity Type</p>
                                        <p>Date Verified</p>
                                        <p>Status</p>
                                        <p>Action</p>
                                    </div>
                                    <div className="iv-grid2">
                                        <p>Voter's card</p>
                                        <p>12-02-2020</p>
                                        <p className="green-txt">Verified</p>
                                        <div className="actions">
                                            <Link to="/userid">
                                            <button className="iv-btn">View</button>
                                            </Link>
                                            <button className="iv-btn">Download</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="userdetail-box4">
                        <div className="acti-container">
                            <h2> Activities </h2>
                            <div className="acti-box">
                                    <div className="acti-single">
                                        <div className="dot-contain">
                                            <img src={Gdot} alt="dot" />
                                        </div>
                                        <div className="acti-text">
                                            <p>Your loan of ₦5,000 was approved</p>
                                            <p className="small-txt">Today</p>
                                        </div>
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

export default UserID;