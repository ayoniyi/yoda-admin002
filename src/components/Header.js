import React, { Component } from 'react';
import axios from 'axios';


//css
import '../css/Sidemenu.css'

// assets
import Logo from '../assets/svg/logo2.svg'
//import Girl from '../assets/png/girl.png'
import Profile from '../assets/png/profile.png'
//import Loadicon from '../assets/png/loadgr.gif'


class Header extends Component {

    state = {
        adminFirstname: " ",
        adminImage: " ",
        isLoaded: false
    }

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

         const adminId = localStorage.getItem("adminId")

        const baseURL = localStorage.getItem("baseURL")
 
         axios.get(`${baseURL}/admin/${adminId}`, axiosConfig)
         .then((res) => {
             console.log("RESPONSE RECEIVED: ", res);
 
             this.setState({ 
                 adminFirstname: res.data.data.admin.firstName,
                 adminLastname: res.data.data.admin.lastName,
                 adminImage: res.data.data.admin.image,
                 adminRole: res.data.data.admin.role,
                // adminRole: res.data.data.admin.role,

                 isLoaded: true
             });

             localStorage.setItem("adminRole1", this.state.adminRole)

             //console.log(this.state.adminFirstname)
 
           })
           .catch((err) => {
             console.log("AXIOS ERROR: ", err);
            // this.setState({ nullres : "No Users Found" });
             
             this.setState({ isLoaded: true });
           }) 
        }       

    render () {
        return (
            <div>
                <section className="header-top">
                    <div className="header-top-box">
                        <div className="header-top-content">
                            <img src={Logo} alt="logo" />
                            {this.state.isLoaded ?  (
                            <div className="pro">
                                {this.state.adminImage === null && (
                                     <img className="profile-circle" src={Profile} alt="profile-pic" />
                                )}
                                {this.state.adminImage !== null && (
                                     <img className="profile-circle" src={this.state.adminImage} alt="profile-pic" />
                                )} 
                                <p>{this.state.adminFirstname}</p>
                            </div>
                             ): ( 
                                <p>Loading...</p>
                        )}
                            
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Header;