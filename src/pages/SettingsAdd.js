import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//css
import '../css/Settings.css'


// components
import Sidemenu8 from '../components/menus/SideMenu8'
import Header from '../components/Header'

//assets
//import Girl from '../assets/png/profile.png'
/*
import Greencal from '../assets/svg/icons/cal-green.svg'
import Ycal from '../assets/svg/icons/cal-yellow.svg'
import ocal from '../assets/svg/icons/cal-orange.svg'
import Bcal from '../assets/svg/icons/cal-blue.svg'*/


class SettingsAdd extends Component {

    state = {
        resMessage: ""
    }

    handleSubmit = event => {

        const token = localStorage.getItem("tokenset");
        //console.log(token)
        if (token === null ) {
            window.location="/"
        }
        const aRole = localStorage.getItem("adminRole1");
        if( aRole !== "admin") {
            window.location="/settings"
        }
        
        event.preventDefault();


        if(this.state.password === this.state.confirmPass) {

        
            const adminNew = {
                "firstName": this.state.firstName,
                "lastName": this.state.lastName,
                "email": this.state.email,
                "mobile": this.state.mobile,
                "password": this.state.password,
                "role": this.state.role
                //mobile is required?
            }

           let axiosConfig = {
                headers: {
                    'authorization': `Bearer ${token}`,
                }
            };

            const baseURL = localStorage.getItem("baseURL")

            axios.post(`${baseURL}/admin/register`, adminNew, axiosConfig)
            .then((res) => {
            
                console.log(res.data.data)
            
                console.log("RESPONSE RECEIVED: ", res);

                this.setState({ messageRes: "Admin Added" });
                this.setState({ match : ""})
            
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);

                this.setState({ messageRes: "Failed! Admin not Added" });
                this.setState({ match : ""})
                
            }) 
        } else {
                this.setState({ match: "Passwords don't match." });
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
                            <div className="settings-nav-item">
                                <p>Profile</p>
                            </div>
                        </Link>
                        <Link to="/settingsadd">
                            <div className="settings-nav-item-a">
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
                        <h1 className="page-title"> Add Admin </h1>
                        <div className="settings-container">
                        <div className="settings-box">
                                <form className="settings-up" onSubmit={this.handleSubmit}>
                                    <div className="settings-left">
                                        <div className="settings-2">
                                            <div className="st-single">
                                                <p className="field-label">First name</p>
                                                <input type="text" className="st-field2" 
                                                 onChange={(e) => this.setState({ firstName : e.target.value}) } 
                                                 required/>
                                            </div>
                                            <div className="st-single-r">
                                                <p className="field-label">Last name</p>
                                                <input type="text" className="st-field2"
                                                 onChange={(e) => this.setState({ lastName : e.target.value}) } 
                                                 required/>
                                            </div>
                                            <div className="st-single-r">
                                               
                                            </div>
                                        </div>
                                        <div className="settings-1">
                                            <div className="st-single1">
                                                <p className="field-label">Phone :</p>
                                                <input type="text" className="st-field1"
                                                 placeholder="e.g +23480111111" 
                                                 onChange={(e) => this.setState({ mobile : e.target.value}) } 
                                                 required/>
                                            </div>
                                        </div>
                                        <div className="settings-1">
                                            <div className="st-single1">
                                                <p className="field-label">Email</p>
                                                <input type="text" className="st-field1"
                                                onChange={(e) => this.setState({ email : e.target.value}) }   
                                                required/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="st-single1">
                                                <p className="field-label">Assign role</p>
                                                <select className="st-field-edit2"
                                                onChange={(e) => this.setState({ role : e.target.value}) }    >
                                                    <option disabled defaultValue>Choose role</option>
                                                   
                                                    <option value="admin">Admin</option>
                                                    <option value="member">Member</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="st-single1">
                                                <p className="field-label">Password</p>
                                                <input type="password" className="st-field1"
                                                placeholder="Enter password" 
                                                onChange={(e) => this.setState({ password : e.target.value}) }   
                                                required/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="st-single1">
                                                <p className="field-label">Confirm Password</p>
                                                <input type="password" className="st-field1"
                                               placeholder="Confirm password"
                                               onChange={(e) => this.setState({ confirmPass : e.target.value}) } 
                                               required/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="st-single1">
                                                <input className="st-btn" type="submit" value="Save" />
                                            </div>
                                            <p className="res">{this.state.messageRes}</p>
                                            <p className=" red">{this.state.match}</p>
                                        </div>
                                    </div>
                                    {/*}
                                    <div className="settings-right">
                                        <img src={Girl} alt="upload" />
                                        <p className="purple-txt">Upload picture</p>
                                    </div>
                                     */}
                                </form>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default SettingsAdd;
                    