import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';

//css
import '../css/Users.css'

// components
import Sidemenu3 from '../components/menus/SideMenu3'
import Header from '../components/Header'

//assets
//import User from '../assets/png/user1.png'
import Loadicon from '../assets/png/loadgr.gif'

class Users extends Component {

    state = {
        UsersA: [],
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

        axios.get(`https://yoda-backend.herokuapp.com/admin/user?limit=3`, axiosConfig)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);

            this.setState({ 
                UsersA: res.data.data.users.docs,
                isLoaded: true
            });

            this.setState({ nullres : "" })

            /*if( this.state.UsersA.totalDocs === 0){
                this.setState({ nullres : "No Users Found" });
            }*/

          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
           // this.setState({ nullres : "No Users Found" });
            
            this.setState({ isLoaded: true });
          })  
    }

    searchQuery = event => {
        
        event.preventDefault();

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

        const searchparam = this.state.searchParam;

        this.setState({ isLoaded: false })

        axios.get(`https://yoda-backend.herokuapp.com/admin/user/search?query=${searchparam}`, axiosConfig)
        .then((res) => {

            this.setState({ UsersA: [] })
           
            this.setState({ 
                UsersA: res.data.data.users.docs,
                isLoaded: true
            });

            this.setState({ nullres : "" })

            if(this.state.UsersA.totalDocs === 0){
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

    /*reDirect () {
        setTimeout(function() {
            window.location ="/userdetails";
        }, 500);
    }*/

    render () {

        localStorage.setItem("userid",this.state.userid );

        return (
            <div>
                <Header />
                <Sidemenu3 />
               <section className="users">
                    <div className="users-content animate__animated animate__fadeIn animate__slow">
                        <div className="users-top">
                            <div className="users-top-left">
                                <h1 className="page-title">Users</h1>
                                <div className="lr-cal">
                                    <select className="select-edit" >
                                        <option disabled >Filter by Status</option>
                                        <option value=" In Progress ">In Progress</option>
                                        <option value=" Due ">Due</option>
                                        <option value=" Paid ">Paid</option>
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
                        <div className="users-table">
                            <div>
                                <div className="userstable-top">
                                    <p>S/N</p>
                                    <p>Name</p>
                                    <p>Phone No.</p>
                                    <p>Email address</p>
                                    <p>Date joined</p>
                                    <p>Status</p>
                                </div>
                               
                                <div>
                                    <p>{this.state.nullres}</p>
                                    {this.state.UsersA.map (user1 =>
                                    <div className="users-single" 
                                    onClick= 
                                    {(e) => this.setState({ userid : user1._id})
                                    + setTimeout(function() {
                                        window.location ="/userdetails";
                                    }, 500)}
                                    key={user1._id}>
                                    {/*<button 
                                        onClick =
                                        {(e) => this.setState({ TripsB : trips1._id})
                                        +setTimeout(window.location ="/ridedetails", 10000)}>
                                        View
                                    </button>*/}
                                    <img className="user-img" src={user1.image/*User*/} alt="user" />
                                    <p>{user1.firstName+" "+user1.lastName}</p>
                                    <p>{user1.mobile}</p>
                                    <p>{user1.email}</p>
                                    <p>{user1.createdAt.substring(0,10)}</p>
                                    <p className="green-txt">Approved</p>
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

export default Users;