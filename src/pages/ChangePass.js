import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import axios from 'axios';

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
                                <form className="settings-up  animate__animated animate__slideInRight">
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
                    