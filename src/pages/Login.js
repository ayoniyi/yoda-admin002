import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//css
import '../css/Login.css'
// assets
import Logo from '../assets/svg/logo1.svg'
import Shapes from '../assets/svg/shapes.svg'

import Load from '../assets/loadt.gif'



class Login extends Component {

    state = {
        incrct: " "
    }

    handleSubmit = event => {
        event.preventDefault();

        // base URL's 
        // https://yoda-backend.herokuapp.com
        // https://api.yodahealth.io


        // load gif
        const loaded = document.getElementById("load");
        loaded.classList.add("load-gif-on");
        this.setState({ incrct: " " });

        const user = {
            email:this.state.email,
            password:this.state.password
        }

        if(navigator.onLine === true ) {

            axios.post(`https://yoda-backend.herokuapp.com/admin/auth`, user)
            .then((res) => {
                
                console.log("RESPONSE RECEIVED: ", res);

                this.setState({ authRes: res.data.message });
                console.log(this.state.authRes)
                
                if (this.state.authRes === "Admin authenticated successfully.")  {
                    
                localStorage.setItem("tokenset", res.data.data.admin.token);
                
                localStorage.setItem("baseURL", "https://yoda-backend.herokuapp.com")
                localStorage.setItem("adminId", res.data.data.admin.id)
                window.location = "/overview";
                
                }
            
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
           
                this.setState({ incrct: "Incorrect Username / Password Combination." });
                const loaded = document.getElementById("load");
                //
                loaded.classList.remove("load-gif-on");
            }) 
        } else {
            this.setState({ incrct: "Check your network connection" }); 
        } 
    }

    render () {

        localStorage.removeItem("tokenset");

        // console.log(navigator.onLine)

        return (
            <div>
                <section className="login">
                    <div className="login-content ">
                        <div className="login-boxes">
                            <div className="login-left">
                                <div className="login-left-box animate__animated animate__bounce ">
                                    <img src={Shapes} alt="shapes" />
                                </div>
                            </div>
                            <div className="login-right">
                                <div className="login-right-box animate__animated animate__fadeIn animate__slow">
                                    <div className="login-top ">
                                        <img src={Logo} alt="logo" />
                                    </div>
                                    <div className="login-body">
                                        <p>Welcome back,</p>
                                        <h1 className="login-title">Login to your account</h1>
                                        <form  className="login-form"  onSubmit={this.handleSubmit}>
                                            <input type="email" className="field1" placeholder="Email Address"
                                            onChange={(e) => this.setState({ email : e.target.value})}  required />
                                            <input type="password" className="field1 bottom-sp" placeholder="Password" 
                                            onChange={(e) => this.setState({ password : e.target.value})}  required/>
                                            <input type="submit"  className="btn-field btn" value="Login" />
                                            <div className="load-gif" id="load">
                                                <img src={Load}  alt="loading"/>
                                            </div>
                                            <p className="log-error">{this.state.incrct}</p>
                                            <Link to="/forgot">
                                                <p className="forgot-text"> Forgot Password? </p>
                                            </Link>

                                        </form>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Login ;