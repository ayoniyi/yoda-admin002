import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';

//css
import '../css/Merchants.css'

// components
import Sidemenu4 from '../components/menus/SideMenu4'
import Header from '../components/Header'

//assets
//import User from '../assets/png/user1.png'
import Loadicon from '../assets/png/loadgr.gif'
import cancel from '../assets/svg/cancel2.svg'

class Merchants extends Component {

    state = {
        MerchantsA: []
    };

    state = {
        isLoaded: false
    }

    state = {
        searchParam: ""
    }

    state = {
        value: '',
        popClicked: false,
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

        axios.get(`https://yoda-backend.herokuapp.com/admin/merchant?limit=2`, axiosConfig)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);

            this.setState({ 
                MerchantsA: res.data.data.merchants.docs,
                isLoaded: true
            });

            this.setState({ nullres : "" })

            /*if( this.state.MerchantsA.totalDocs === 0){
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
       
        
        let axiosConfig = {
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
            }
        };

        const searchparam = this.state.searchParam;

        this.setState({ isLoaded: false })


        axios.get(`https://yoda-backend.herokuapp.com/admin/merchant/search?query=${searchparam}`, axiosConfig)
        
        
        .then((res) => {

            this.setState({ MerchantsA: [] })
           
            this.setState({ 
                MerchantsA: res.data.data.merchants.docs,
                isLoaded: true
            });

            this.setState({ nullres : "" })

            if(this.state.MerchantsA.totalDocs === 0){
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

    render () {

        localStorage.setItem("merchantid",this.state.merchantid );
        
        return (
            <div>
                <Header />
                <Sidemenu4 />
                {this.state.popClicked ? 
                    <div>
                        <div className="overlay animate__animated animate__fadeIn "></div>
                        <section className="popup ">
                            <div className="popup-box2 animate__animated animate__slideInUp animate__slow">
                                <div className="pb-top">
                                    <h1 className="pb-title">Export Merchant's list</h1>
                                    <img className="click" onClick={() => this.setState({popClicked: false})}
                                    src={cancel} alt="x" />
                                </div>
                                <p className="pb-in">Choose from the options below what to export:</p>
                                <form>
                                    <div className="pb-opt">
                                        <div className="pb-radio">
                                            <input type="radio" name="export" value="email" />
                                            <span class="checkmark"></span>
                                            <label className="pb-val" htmlFor="male">Only Email</label>
                                        </div>
                                        <div className="pb-radio">
                                            <input type="radio" name="export" value="phone" />
                                            <span class="checkmark"></span>
                                            <label  className="pb-val" htmlFor="male">Only Phone Number</label>
                                        </div>
                                        <div className="pb-radio">
                                            <input type="radio" name="export" value="both" />
                                            <span class="checkmark"></span>
                                            <label  className="pb-val" htmlFor="male">Both</label>
                                        </div>
                                    </div>
                                    
                                    <div className="pb-btns">
                                        <button onClick={() => this.setState({popClicked: false})} 
                                        className="pb-cancel">
                                            Cancel
                                        </button>
                                        <button className="pb-submit">
                                            Export
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                : null}
               <section className="merchants">
                    <div className="merchants-content animate__animated animate__fadeIn animate__slow">
                        <div className="merchants-top">
                            <div className="merchants-top-left">
                                <h1 className="page-title">Merchants</h1>
                                <form onSubmit={this.searchQuery}>
                                    <input onChange= {(e) => this.setState({ searchParam : e.target.value})}
                                    className="search-field" type="text" 
                                    placeholder="Search" required/>
                                    <input className="search-submit" type="submit" value="Search" />
                                </form>
                            </div>
                            <div className="merchants-top-right">
                                <div className="lr-cal">
                                 <button onClick={() => this.setState({popClicked: true})}
                                 className="export-submit">Export</button>   
                                </div>
                            </div>
                        </div>

                        {this.state.isLoaded ?  (
                        <div className="merchants-table">
                            <div>
                                <div className="merchantstable-top">
                                    <p>S/N</p>
                                    <p>Name</p>
                                    <p>Phone No.</p>
                                    <p>Email address</p>
                                    <p>Office Address</p>
                                    
                                </div>
                                {this.state.MerchantsA.map (merchant1 =>
                                <div className="merchants-single"  onClick= 
                                {(e) => this.setState({ merchantid : merchant1._id})
                                + setTimeout(function() {
                                    window.location ="/merchantdetails";
                                }, 500)}
                                key={merchant1._id}>
                                    <img className="merchant-img" src={merchant1.image} alt="user" />
                                    <p>{merchant1.businessName}</p>
                                    <p>{merchant1.mobile}</p>
                                    <p>{merchant1.email}</p>
                                    <p>{merchant1.address}</p>
                                </div> 
                                )}
                            </div>
                        </div> ):
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

export default Merchants;