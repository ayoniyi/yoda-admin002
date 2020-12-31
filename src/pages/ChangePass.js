import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//css
import '../css/Settings.css'


// components
import Sidemenu8 from '../components/menus/SideMenu8'
import Header from '../components/Header'

//assets
//import Girl from '../assets/png/girl2.png'
/*
import Greencal from '../assets/svg/icons/cal-green.svg'
import Ycal from '../assets/svg/icons/cal-yellow.svg'
import ocal from '../assets/svg/icons/cal-orange.svg'
import Bcal from '../assets/svg/icons/cal-blue.svg'*/


class ChangePass extends Component {

    state = {
        messageRes: "",
        match: ""
    }

    handleSubmit = event => {
        
        event.preventDefault();

        
        const token = localStorage.getItem("tokenset");
        console.log(token)
        if (token === null ) {
            window.location="/"
        }
    

        if(this.state.newPassword === this.state.confirmPassword) {

        
            const updatePass = {
                "currentPassword": this.state.currentPassword,
                "newPassword": this.state.newPassword,
            }

            let axiosConfig = {
                headers: {
                    'authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                }
            };
    
            const adminId = localStorage.getItem("adminId")
    
            const baseURL = localStorage.getItem("baseURL")

            axios.put(`${baseURL}/admin/${adminId}`, updatePass, axiosConfig)
            .then((res) => {
            
                console.log(res.data.data)
            
                console.log("RESPONSE RECEIVED: ", res);

                this.setState({ messageRes: "Password Updated" });
                this.setState({ match : ""})
            
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);

                this.setState({ messageRes: "Failed! Pls check old password." });
                this.setState({ match : ""})
                
            })  
        }else {
                this.setState({ 
                    match: "Passwords don't match.",
                    messageRes: " "
                 });
            }
    }

  

    render () {
        return (
            <div>
                <Header />
                <Sidemenu8 />
                <section className="settings ">
                    <div className="settings-nav">
                        <Link to="/settings">
                            <div className="settings-nav-item-a">
                                <p>Profile</p>
                            </div>
                        </Link>
                        <Link to="/settingsadd">
                            <div className="settings-nav-item">
                                <p>Add New</p>
                            </div>
                        </Link>
                        <Link to="/settingsall">
                            <div className="settings-nav-item">
                                <p>All Members</p>
                            </div>
                        </Link>
                    </div>
                    <div className="settings-content ">
                        <h1 className="page-title"> Profile </h1>
                        <div className="settings-container">
                        <div className="settings-box">
                                <form className="settings-up  animate__animated animate__slideInRight" onSubmit={this.handleSubmit}>
                                    <div className="settings-left">
                                        <p className="cp-title">Change Password</p>
                                        <div className="settings-1">
                                            <div className="st-single1">
                                                <p className="field-label">Current Password</p>
                                                <input type="password" className="st-field1"
                                                placeholder="Enter current password"
                                                onChange={(e) => this.setState({ currentPassword : e.target.value}) }  
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="st-single1">
                                                <p className="field-label">New Password</p>
                                                <input type="password" className="st-field1" 
                                                  placeholder="Enter new password"
                                                onChange={(e) => this.setState({ newPassword : e.target.value}) }  
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="st-single1">
                                                <p className="field-label">Retype New Password</p>
                                                <input type="password" className="st-field1" 
                                                  placeholder="Retype new password"
                                                onChange={(e) => this.setState({ confirmPassword : e.target.value}) }  
                                                />
                                            </div>
                                        </div>
                                       
                                        <div>
                                            <div className="st-single1">
                                                <input className="st-btn" type="submit" value="Save" />
                                            </div>
                                            <p className="up-res">{this.state.messageRes}</p>
                                            <p className="red">{this.state.match}</p>
                                        </div>
                                    </div>
                                    
                                </form>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default ChangePass;
                    