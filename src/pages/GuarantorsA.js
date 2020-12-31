import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//css
import '../css/Loans.css'


// components
import Sidemenu6 from '../components/menus/SideMenu6'
import Header from '../components/Header'

//assets
import Loadicon from '../assets/png/loadgr.gif'
/*
import Bar from '../assets/png/bar1.png'
import Greencal from '../assets/svg/icons/cal-green.svg'
import Ycal from '../assets/svg/icons/cal-yellow.svg'
import ocal from '../assets/svg/icons/cal-orange.svg'
import Bcal from '../assets/svg/icons/cal-blue.svg'
*/


class Guarantors extends Component {

    state = {
        GuarantorsA: [],
        isLoaded: false,
        searchParam: ""
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

        axios.get(`${baseURL}/admin/guarantors`, axiosConfig)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);

            this.setState({ 
                GuarantorsA: res.data.data.guarantors.docs,
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

        localStorage.setItem("guarantorid",this.state.guarantorid );

        return (
            <div>
                <Header />
                <Sidemenu6 />
                <section className="loan-request">
                    <div className="loans-nav">
                        <Link to="/guarantors">
                            <div className="loan-nav-item">
                                <p>New Requests</p>
                            </div>
                        </Link>
                        <Link to="/guarantorsa">
                            <div className="loan-nav-item-a">
                                <p>All Guarantors</p>
                            </div>
                        </Link>
                    </div>
                    <div className="loan-req-content animate__animated animate__fadeIn animate__slow">
                        <div className="lr-top">
                            <div className="lr-top-left">
                                <h1 className="page-title">All Guarantors</h1>
                                <div className="lr-cal">
                                    <input className="input-date" type="date"/>
                                    <input className="input-date" type="date"/> 
                                </div>
                            </div>
                            <div className="lr-top-right">
                                <form>
                                    <input className="search-field" type="text" placeholder="Search" />
                                    <input className="search-submit" type="submit" value="Search" />
                                </form>
                            </div>
                        </div>
                        {this.state.isLoaded ?  (
                        <div className="lr-table">
                            <div className="lrtable-top3">
                                <p>Sender's name</p>
                                <p>Guarantor's name</p>
                                <p>Phone no.</p>
                                <p>Email address</p>
                                <p>Date</p>
                                <p>Status</p>
                            </div>
                            {this.state.GuarantorsA.map (guarantor1 =>
                            <div className="lr-single3" key={guarantor1._id} 
                            onClick= 
                            {(e) => this.setState({ guarantorid : guarantor1._id})
                            + setTimeout(function() {
                                window.location ="/guarantorview";
                            }, 500)}
                            >
                                <p>{guarantor1.firstName + " " + guarantor1.lastName}</p>
                                <p>{guarantor1.fullGuarantor.firstName + " " + guarantor1.fullGuarantor.lastName}</p>
                                <p>{guarantor1.fullGuarantor.phone}</p>
                                <p>{guarantor1.fullGuarantor.email}</p>
                                <p>12-02-2020</p>
                                <p className="green-txt">Approved</p>
                            </div>
                             )}
                           
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

export default Guarantors;