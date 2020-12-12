import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//css
import '../css/Login.css'
// assets
import Logo from '../assets/svg/logo1.svg'
import Shapes from '../assets/svg/shapes.svg'
import Arrow from '../assets/svg/left-arrow.svg'

import Load from '../assets/loadt.gif'

class Forgotpassword extends Component {

    state = {
        forRes: " "
    }

    handleSubmit = event => {
        event.preventDefault();

        // load gif
        const loaded = document.getElementById("load");
        loaded.classList.add("load-gif-on");
        this.setState({ forRes: " " });

        const user = {
            email:this.state.email
        }

        axios.post(`https://yoda-backend.herokuapp.com/admin/forgot`, user)
        .then((res) => {
               
            console.log("RESPONSE RECEIVED: ", res);

          
          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
           // console.log(err.data.message);
           this.setState({ forRes: "There was an issue." });
           
            const loaded = document.getElementById("load");
            //
            loaded.classList.remove("load-gif-on");
            //window.location = "/dashboard";
          }) 
    }

    render () {
        return (
            <div>
                <section className="login">
                    <div className="login-content">
                        <div className="login-boxes">
                            <div className="login-left">
                                <div className="login-left-box">
                                    <img src={Shapes} alt="shapes" />
                                </div>
                            </div>
                            <div className="login-right">
                                <div className="login-right-box">
                                    <Link to="/">
                                        <div className="back-action animate__animated animate__fadeInLeft">
                                            <img src={Arrow} alt="back" />
                                            <p>Back</p>
                                        </div>
                                     </Link>
                                    <div className="login-top">
                                        <img src={Logo} alt="logo" />
                                    </div>
                                    <div className="login-body">
                                        <p>Can’t remember your password?</p>
                                        <h1 className="login-title">Get a new password</h1>
                                        <form  className="login-form animate__animated animate__fadeIn"  onSubmit={this.handleSubmit}>
                                            <input type="email" className="field1 bottom-sp" placeholder="Email Address" 
                                             onChange={(e) => this.setState({ email : e.target.value})}  required/>
                                           
                                            <input type="submit"  className="btn-field btn" value="Reset" />
                                            <div className="load-gif" id="load">
                                                <img src={Load}  alt="loading"/>
                                            </div>
                                            <p className="log-error">{this.state.forRes}</p>
                                           
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

export default Forgotpassword ;