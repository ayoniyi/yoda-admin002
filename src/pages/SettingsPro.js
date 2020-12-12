import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//css
import '../css/Settings.css'


// components
import Sidemenu8 from '../components/menus/SideMenu8'
import Header from '../components/Header'

//assets
import Girl from '../assets/png/girl2.png'
/*
import Greencal from '../assets/svg/icons/cal-green.svg'
import Ycal from '../assets/svg/icons/cal-yellow.svg'
import ocal from '../assets/svg/icons/cal-orange.svg'
import Bcal from '../assets/svg/icons/cal-blue.svg'*/


class SettingsPro extends Component {

    
    state = {
        resMessage: ""
    }

    handleSubmit = event => {

        const token = localStorage.getItem("tokenset");
        //console.log(token)
        if (token === null ) {
            window.location="/"
        }
        
        event.preventDefault();

        const adminUpdate = {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            //"lastName": this.state.lastName,
            "email": this.state.email,
            "role": this.state.role
            //"phone": this.state.phone,
            //"password": this.state.password,
            //mobile is required?
        }

        let axiosConfig = {
            headers: {
                'authorization': `Bearer ${token}`,
                /*'Content-Type': 'application/json', 
                "deviceId": deviceId,
                "role": "admin",
                "app-version": '1',*/
            }
        };

        //const baseURL = localStorage.getItem("baseURL")

        axios.put(`https://yoda-backend.herokuapp.com/admin/`, adminUpdate, axiosConfig)
        .then((res) => {
        
            console.log(res.data.data)
        
            console.log("RESPONSE RECEIVED: ", res);

            this.setState({ messageRes: "Profile Updated" });
            //this.setState({ match : ""})
        
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);

            this.setState({ messageRes: "Failed! Profile not Updated" });
            //this.setState({ match : ""})
            
        }) 
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
                    <div className="settings-content animate__animated animate__fadeIn animate__slow">
                        <h1 className="page-title"> Profile </h1>
                        <div className="settings-container">
                        <div className="settings-box">
                                <form className="settings-up" onSubmit={this.handleSubmit}>
                                    <div className="settings-left">
                                        <div className="settings-2">
                                            <div className="st-single">
                                                <p className="field-label">First name</p>
                                                <input type="text" className="st-field2" 
                                                 onChange={(e) => this.setState({ firstName : e.target.value}) } />
                                            </div>
                                            <div className="st-single-r">
                                                <p className="field-label">Last name</p>
                                                <input type="text" className="st-field2"
                                                  onChange={(e) => this.setState({ lastName : e.target.value}) }  />
                                            </div>
                                        </div>
                                        <div className="settings-1">
                                            <div className="st-single1">
                                                <p className="field-label">Email</p>
                                                <input type="text" className="st-field1" 
                                                 onChange={(e) => this.setState({ email : e.target.value}) }  />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="st-single1">
                                                <p className="field-label">Role</p>
                                                <input type="text" className="st-field1"
                                                onChange={(e) => this.setState({ role : e.target.value}) } />
                                            </div>
                                        </div>
                                        <div>
                                            <Link to="changepass">
                                            <div className="st-single1">
                                                <p className="field-label">Password</p>
                                                <input type="text" className="st-field-edit"
                                                placeholder="Change password" disabled/>
                                            </div>
                                            </Link>
                                        </div>
                                        <div>
                                            <div className="st-single1">
                                                <input className="st-btn" type="submit" value="Save" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="settings-right">
                                        <img src={Girl} alt="admin" />
                                        <p className="purple-txt">Tap to change picture</p>
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

export default SettingsPro;
                    