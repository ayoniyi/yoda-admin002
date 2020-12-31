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
import Loadicon from '../assets/png/loadgr.gif'
import cancel from '../assets/svg/cancel2.svg'


class SettingsAll extends Component {

    state = {
        AdminsA: [],
        isLoaded: false,
        searchParam: "",
        memberid: "",
        
        popClicked1: false,
        popClicked2: false,
        popClicked3: false
        
    };


    componentDidMount() {

       const token = localStorage.getItem("tokenset");
        //console.log(token)
        if (token === null ) {
            window.location="/"
        }
        // const aRole = localStorage.getItem("adminRole1");
        // if( aRole !== "admin") {
        //     window.location="/settings"
        // }
    
        let axiosConfig = {
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
            }
        };

        axios.get(`https://yoda-backend.herokuapp.com/admin/`, axiosConfig)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);

            this.setState({ 
                AdminsA: res.data.data.admins.docs,
                isLoaded: true
            });

            this.setState({ nullres : "" })

            /*if( this.state.AdminsA.totalDocs === 0){
                this.setState({ nullres : "No Users Found" });
            }*/

          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
           // this.setState({ nullres : "No Users Found" });
            
            this.setState({ isLoaded: true });
          }) 
          
        
        /*
        // Get Particular admin

        const adminsId = this.state.memberid

        axios.get(`https://yoda-backend.herokuapp.com/admin/5fc8fbf012681629c4d00da1`, axiosConfig)
        .then((res1) => {

           
            this.setState({ 
                AdminsName: res.data.data.admins.docs,
                isLoaded: true
            });

            console.log("RESPONSE RECEIVED: ", res1);
           
        })
          .catch((err1) => {
            console.log("AXIOS ERROR: ", err1);
           
            this.setState({ isLoaded: true });
            //this.setState({ nullres : "No Users Found" });
        }) */

    }

    searchQuery = event => {
        
        event.preventDefault();

        const token = localStorage.getItem("tokenset");

        let axiosConfig = {
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
            }
        };

        const searchparam = this.state.searchParam;

        this.setState({ isLoaded: false })

        axios.get(`https://yoda-backend.herokuapp.com/admin/search?query=${searchparam}`, axiosConfig)
        .then((res) => {

            this.setState({ AdminsA: [] })
           
            this.setState({ 
                AdminsA: res.data.data.admins.docs,
                isLoaded: true
            });

            this.setState({ nullres : "" })

            if(this.state.AdminsA.totalDocs === 0){
                this.setState({ nullres : "No Users Found" });
            }
            console.log(this.state.nullres)

            console.log("RESPONSE RECEIVED: ", res);
           
        })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
           
            this.setState({ isLoaded: true });
            //this.setState({ nullres : "No Users Found" });
        }) 
         
    }

    handleRoleChange = event => {

        event.preventDefault();

        const adminUpdate = {
            "role" : this.state.newRole
        }

        const token = localStorage.getItem("tokenset");

        let axiosConfig = {
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
            }
        };

        const adminsId = this.state.memberid

        axios.put(`https://yoda-backend.herokuapp.com/admin/${adminsId}`, adminUpdate, axiosConfig)
        .then((res) => {
        
            console.log(res.data.data)
        
            console.log("RESPONSE RECEIVED: ", res);

            window.location = "/settingsall";

            //this.setState({popClicked2: false})

            //this.setState({ messageRes: "Profile Updated" });
            //this.setState({ match : ""})
        
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);

            this.setState({ messageRes: "Failed! Profile not Updated" });
            //this.setState({ match : ""})
            
        }) 
    }
    handleDeactivate = event => {

        event.preventDefault();

        const adminUpdate = {
            "enabled" : false
        }

        const token = localStorage.getItem("tokenset");

        let axiosConfig = {
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
            }
        };

        const adminsId = this.state.memberid

        axios.put(`https://yoda-backend.herokuapp.com/admin/${adminsId}`, adminUpdate, axiosConfig)
        .then((res) => {
        
            console.log(res.data.data)
        
            console.log("RESPONSE RECEIVED: ", res);

            window.location = "/settingsall";

            //this.setState({ messageRes: "Profile Updated" });
            //this.setState({ match : ""})
        
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);

            this.setState({ messageRes: "Failed! Profile not Updated" });
            //this.setState({ match : ""})
            
        }) 
    }
    handleActivate = event => {

        event.preventDefault();

        const adminUpdate = {
            "enabled" : true
        }

        const token = localStorage.getItem("tokenset");

        let axiosConfig = {
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
            }
        };

        const adminsId = this.state.memberid

        axios.put(`https://yoda-backend.herokuapp.com/admin/${adminsId}`, adminUpdate, axiosConfig)
        .then((res) => {
        
            console.log(res.data.data)
        
            console.log("RESPONSE RECEIVED: ", res);

            //this.setState({popClicked3: false})
            window.location = "/settingsall";

            //this.setState({ messageRes: "Profile Updated" });
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

                {this.state.popClicked1 ? 
                    <div>
                        <div className="overlay animate__animated animate__fadeIn "></div>
                        <section className="popup ">
                            <div className="popup-box2 animate__animated animate__slideInDown ">
                                <div className="pb-top">
                                    <h1 className="pb-title">Change role</h1>
                                    <img className="click" onClick={() => this.setState({popClicked1: false})}
                                    src={cancel} alt="x" />
                                </div>
                                <p className="pb-in">Choose what role this memeber will have below:</p>
                                <form onSubmit={this.handleRoleChange}>
                                    <div className="pb-opt">
                                        {/*<div className="pb-radio">
                                            <input type="radio" name="export" value="owner"
                                            onChange={(e) => this.setState({ newRole : e.target.value}) } />
                                            <span className="checkmark"></span>
                                            <label className="pb-val" htmlFor="male">Owner</label>
                                        </div>*/}
                                        <div className="pb-radio">
                                            <input type="radio" name="export" value="admin"
                                            onChange={(e) => this.setState({ newRole : e.target.value}) } />
                                            <span className="checkmark"></span>
                                            <label  className="pb-val" htmlFor="male">Admin</label>
                                        </div>
                                        <div className="pb-radio">
                                            <input type="radio" name="export" value="member"
                                            onChange={(e) => this.setState({ newRole : e.target.value}) } />
                                            <span className="checkmark"></span>
                                            <label  className="pb-val" htmlFor="male">Member</label>
                                        </div>
                                    </div>
                                    
                                    <div className="pb-btns">
                                        <button onClick={() => this.setState({popClicked1: false})} 
                                        className="pb-cancel">
                                            Cancel
                                        </button>
                                        <button className="pb-submit" type="submit">
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                : null}
                {this.state.popClicked2 ? 
                    <div>
                        <div className="overlay animate__animated animate__fadeIn "></div>
                        <section className="popup ">
                            <div className="popup-box2 animate__animated animate__slideInUp ">
                                <div className="pb-top">
                                    <h1 className="pb-title">Deactivate this memeber?</h1>
                                    <img className="click" onClick={() => this.setState({popClicked2: false})}
                                    src={cancel} alt="x" />
                                </div>
                                <p className="pb-in">What happens when you delete an admin member?</p>
                                <form>
                                    <div className="pb-opt">
                                        <p>The member will no longer be able to sign in to the admin 
                                            platform.
                                        </p>
                                    </div>
                                    
                                    <div className="pb-btns">
                                        <button onClick={() => this.setState({popClicked2: false})} 
                                        className="pb-cancel">
                                            Cancel
                                        </button>
                                        <button className="pb-submit-red" onClick={this.handleDeactivate}>
                                            Deactivate
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                : null}
                {this.state.popClicked3 ? 
                    <div>
                        <div className="overlay animate__animated animate__fadeIn "></div>
                        <section className="popup ">
                            <div className="popup-box2 animate__animated animate__slideInUp ">
                                <div className="pb-top">
                                    <h1 className="pb-title">Activate this memeber?</h1>
                                    <img className="click" onClick={() => this.setState({popClicked3: false})}
                                    src={cancel} alt="x" />
                                </div>
                               
                                <form>
                                    <div className="pb-opt">
                                        <p>This member will be able to sign in to the admin 
                                            platform.
                                        </p>
                                    </div>
                                    
                                    <div className="pb-btns">
                                        <button onClick={() => this.setState({popClicked3: false})} 
                                        className="pb-cancel">
                                            Cancel
                                        </button>
                                        <button className="pb-submit" onClick={this.handleActivate}>
                                            Activate
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                : null}

                <section className="settings ">
                    <div className="settings-nav">
                        <Link to="/settings">
                            <div className="settings-nav-item">
                                <p>Profile</p>
                            </div>
                        </Link>
                        <Link to="/settingsadd">
                            <div className="settings-nav-item">
                                <p>Add New</p>
                            </div>
                        </Link>
                        <Link to="/settingsall">
                            <div className="settings-nav-item-a">
                                <p>All Members</p>
                            </div>
                        </Link>
                    </div>
                    <div className="settings-content animate__animated animate__fadeIn animate__slow">
                        <div className="users-top">
                            <div className="users-top-left">
                                <h1 className="page-title">All Memebers</h1>
                                <div className="lr-cal">
                                    <select className="select-edit" >
                                        <option defaultValue="" >Filter by Role</option>
                                        <option value="Owner">Owner</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Memeber">Memeber</option>
                                    </select>
                                </div>
                            </div>
                            <div className="users-top-right">
                                <form onSubmit={this.searchQuery}>
                                    <input onChange= {(e) => this.setState({ searchParam : e.target.value})} 
                                    className="search-field" type="text" 
                                    placeholder="Search" required />
                                    <input className="search-submit" type="submit" value="Search" />
                                </form>
                            </div>
                        </div>

                        {this.state.isLoaded ?  (
                        <div className="adminsa-table">
                            <div>
                                <div className="adminsa-table-top">
                                    <p>Name</p>
                                    <p>Role</p>
                                    <p>Phone No.</p>
                                    <p>Email address</p>
                                    <p>Action</p>
                                   
                                </div>
                               
                                <div>
                                    <p>{this.state.nullres}</p>
                                    {this.state.AdminsA.map (admin1 =>
                                    <div className="adminsa-single" 
                                    /*onClick= 
                                    {(e) => this.setState({ adminid : user1._id})
                                    + setTimeout(function() {
                                        window.location ="/userdetails";
                                    }, 500)}*/
                                    key={admin1._id}>
                                    {/*<button 
                                        onClick =
                                        {(e) => this.setState({ TripsB : trips1._id})
                                        +setTimeout(window.location ="/ridedetails", 10000)}>
                                        View
                                    </button>*/}
                                    <p>{admin1.firstName+" "+admin1.lastName}</p>
                                    <p>{admin1.role}</p>
                                    <p>{admin1.mobile}</p>
                                    <p>{admin1.email}</p>
                                    
                                    <p className="ad-btns">
                                        <button className="adrole-btn"
                                        onClick={() => this.setState({popClicked1: true, memberid: admin1._id}) }>
                                            Change Role 
                                        </button>
                                        
                                        {admin1.enabled !== false && ( 
                                        <button className="adde-btn"
                                         onClick={(e) => this.setState({popClicked2: true, memberid: admin1._id })} > 
                                         Deactivate 
                                        </button>
                                        )}
                                        
                                        {admin1.enabled === false && ( 
                                        <button className="adde-btn2"
                                         onClick={(e) => this.setState({popClicked3: true, memberid: admin1._id })} > 
                                         Activate 
                                        </button>
                                        )}
                                    </p>
                                    </div>
                                    )}
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

export default SettingsAll;
                    