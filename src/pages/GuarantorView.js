import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//css
import '../css/Merchants.css'
import '../css/Guarantor.css'

// components
import Sidemenu6 from '../components/menus/SideMenu6'
import Header from '../components/Header'

//assets
import Arrowr from '../assets/svg/pg-right.svg'
//import User from '../assets/svg/user02.svg'
//import Gdot from '../assets/svg/dot-g.svg'
import Loadicon from '../assets/png/loadgr.gif'

class GuarantorView extends Component {

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

        const guarantorId = localStorage.getItem("guarantorid")

        const baseURL = localStorage.getItem("baseURL")

        axios.get(`${baseURL}/admin/guarantors/`, axiosConfig)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);

            this.setState({ 
                GuarantorsA: res.data.data.guarantors.docs,
                isLoaded: true
            });

            const guarantorInd = res.data.data.guarantors.docs.filter(gInd => gInd._id === guarantorId)
            console.log(guarantorInd)

            this.setState({ 
                guarantorName: guarantorInd[0].fullGuarantor.firstName+" "+ guarantorInd[0].fullGuarantor.lastName,
                guarantorTitle:  guarantorInd[0].fullGuarantor.title,
                guarantorRelationship:  guarantorInd[0].fullGuarantor.relationship,
                guarantorMail:  guarantorInd[0].fullGuarantor.email,
                guarantorPhone:  guarantorInd[0].fullGuarantor.phone,
                guarantorDob:  guarantorInd[0].fullGuarantor.dob,
                guarantorBvn:  guarantorInd[0].fullGuarantor.bvn,
                guarantorAddress:  guarantorInd[0].fullGuarantor.address,
                isLoaded: true
            });


          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
           // this.setState({ nullres : "No Users Found" });
            
            this.setState({ isLoaded: true });
          })  
    }

    render () {

        //console.log( localStorage.getItem("merchantid" ))
        
        return (
            <div>
                <Header />
                <Sidemenu6 />
               <section className="users">
                    <div className="users-content animate__animated animate__fadeIn animate__slow">
                        <div className="userdetail-top">
                            <h1 className="page-title">Guarantors</h1>
                            <div className="pg-nav1">
                                <Link to="/guarantors">
                                <p className="p-active"> Guarantors</p>
                                </Link>
                                <img src={Arrowr} alt="right"/>
                                <p>{this.state.guarantorName}</p>
                            </div>
                        </div>
                        {this.state.isLoaded ?  (
                        <div className="userdetail-content">
                            <div className="guarantorv-box">
                               
                                <div className="gv-content">
                                    <h2 className="gv-title">Personal Info</h2> 
                                    <div className="gv-boxes">
                                        <p className="gv-sm">Full name</p>
                                        <p className="gv-txt">Obembe Tosin {this.state.guarantorName}</p>
                                    </div>
                                    <div className="gv-boxes">
                                        <p className="gv-sm">Title</p>
                                        <p  className="gv-txt">Mr {this.state.guarantorTitle}</p>
                                    </div>
                                    <div className="gv-boxes">
                                        <p className="gv-sm">Relationship with Tobi</p>
                                        <p  className="gv-txt">Sister {this.state.guarantorRelationship}</p>
                                    </div>
                                    <div className="gv-boxes">
                                        <p className="gv-sm">Email Address</p>
                                        <p  className="gv-txt">{this.state.guarantorMail}</p>
                                    </div>
                                    <div className="gv-boxes">
                                        <p className="gv-sm">Phone number</p>
                                        <p  className="gv-txt">08166249033 {this.state.guarantorPhone}</p>
                                    </div>
                                    <div className="gv-boxes">
                                        <p className="gv-sm">Date of Birth</p>
                                        <p  className="gv-txt">12/06/1988 {this.state.guarantorDob}</p>
                                    </div>
                                    <div className="gv-boxes">
                                        <p className="gv-sm">BVN</p>
                                        <p  className="gv-txt" >2345678909 {this.state.guarantorBvn}</p>
                                    </div>
                                    <div className="gv-boxes">
                                        <p className="gv-sm">Home Address</p>
                                        <p  className="gv-txt">
                                            175B Moshood Olugbani Street, Off Ligali Ayorinde St, Victoria I
                                            sland 101233, Lagos
                                            {this.state.guarantorAddress}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        ): (
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
export default GuarantorView