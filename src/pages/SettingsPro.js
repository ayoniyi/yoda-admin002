import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import Dragdrop from '../components/Dragdrop'
//import Dragdrop2A from '../components/Dragdrop2A'

//css
import '../css/Settings.css'


// components
import Sidemenu8 from '../components/menus/SideMenu8'
import Header from '../components/Header'

//assets
//import Girl from '../assets/png/girl2.png'
import icon from '../assets/png/profile.png'
import Loadicon from '../assets/png/loadgr.gif'
/*
import Greencal from '../assets/svg/icons/cal-green.svg'
import Ycal from '../assets/svg/icons/cal-yellow.svg'
import ocal from '../assets/svg/icons/cal-orange.svg'
import Bcal from '../assets/svg/icons/cal-blue.svg'*/


class SettingsPro extends Component {

    
    state = {
        resMessage: "",
        isLoaded: false,
        title:" ",
        desc: " ",
        photos:[],
        fileUp:" "
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
                 adminEmail: res.data.data.admin.email,
                 adminRole: res.data.data.admin.role,
                 adminImg: res.data.data.admin.image,

                 isLoaded: true
             });

             //console.log(this.state.adminFirstname)
 
           })
           .catch((err) => {
             console.log("AXIOS ERROR: ", err);
            // this.setState({ nullres : "No Users Found" });
             
             this.setState({ isLoaded: true });
           }) 

           
           
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
            "email": this.state.email,
            "role": this.state.role
            //"phone": this.state.phone,
            //"password": this.state.password,
            //mobile is required?
        }

        let axiosConfig = {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        };
       

        const baseURL = localStorage.getItem("baseURL")
        const adminId = localStorage.getItem("adminId")

        axios.put(`${baseURL}/admin/${adminId}`, adminUpdate, axiosConfig)
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

        //console.log(this.state.fileToUp)
        //console.log(this.state.fileToUpName)

        // Image 
       

        const uploadFile = new FormData();

        uploadFile.append('photo', this.state.fileToUp, this.state.fileToUpName  );

        //const uploadFile = localStorage.getItem("filezName")
        
        axios.put(`${baseURL}/admin/${adminId}/picture`, uploadFile, axiosConfig)
        .then((res2) => {
            
        console.log(res2);
        console.log(uploadFile)
       
        })
        .catch((err2) => {
            console.log("AXIOS ERROR: ", err2);

            console.log(uploadFile)
            
        }) 
    }

    uploadEvent1 = event => {
        
        //event.preventDefault();
        const token = localStorage.getItem("tokenset");

        const baseURL = localStorage.getItem("baseURL")
       // this.setState({ filetoUpload: event.target.files[0] });

       const adminId = localStorage.getItem("adminId")


        console.log(event.target.files[0].name) 
        console.log(event.target.files[0]) 
        
         // convert uploaded file to blob
        // const blob1 = new Blob([new Uint8Array( event.target.files[0] )], {type: event.target.files[0].type });

        const uploadFile = new FormData();

        const fileU = localStorage.getItem("filez")
        const fileUName = localStorage.getItem("filezName")

        uploadFile.append('photo', fileU, fileUName  );

        uploadFile.append('photo', event.target.files[0], event.target.files[0].name );
        
        console.log(uploadFile);


        let axiosConfig = {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        };

        axios.put(`${baseURL}/admin/${adminId}/picture`, uploadFile, axiosConfig)
       
        .then((res2) => {
            
        console.log(res2);
        //console.log(uploadFile)
        //console.log(event.target.files[0].name)
        //console.log(event.target.files[0])
       
        })
        .catch((err2) => {
            console.log("AXIOS ERROR: ", err2);
            //console.log(upLoad1)
            
        }) 
    }

    handlefilechange = event => {
        event.preventDefault();

        //let reader = new FileReader();
        //reader.readAsDataURL(event.target.files[0]);
        //const srcMain = reader.result
        if(event.target.files[0] !== undefined) {
            const srcMain = window.URL.createObjectURL(event.target.files[0])
            this.setState({ fileUp: srcMain})
            this.setState({  
                fileToUp : event.target.files[0],
                fileToUpName: event.target.files[0].name
            })
            //console.log(event.target.files[0])
            console.log(srcMain)
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
                        {this.state.adminRole === "admin" && (
                            <Link to="/settingsadd">
                                <div className="settings-nav-item">
                                    <p>Add New</p>
                                </div>
                            </Link>         
                        )} 
                        {this.state.adminRole === "admin" && (
                        <Link to="/settingsall">
                            <div className="settings-nav-item">
                                <p>All Members</p>
                            </div>
                        </Link>        
                        )} 
                      
                    </div>
                    <div className="settings-content animate__animated animate__fadeIn animate__slow">
                        <h1 className="page-title"> Profile </h1>
                        {this.state.isLoaded ?  (
                        <div className="settings-container">
                        <div className="settings-box">
                                <form className="settings-up" onSubmit={this.handleSubmit}>
                                    <div className="settings-left">
                                        <div className="settings-2">
                                            <div className="st-single">
                                                <p className="field-label">First name</p>
                                                <input type="text" className="st-field2" placeholder={this.state.adminFirstname} 
                                                 onChange={(e) => this.setState({ firstName : e.target.value}) }  />
                                            </div>
                                            <div className="st-single-r">
                                                <p className="field-label">Last name</p>
                                                <input type="text" className="st-field2"  placeholder={this.state.adminLastname} 
                                                  onChange={(e) => this.setState({ lastName : e.target.value}) }  />
                                            </div>
                                        </div>
                                        <div className="settings-1">
                                            <div className="st-single1">
                                                <p className="field-label">Email</p>
                                                <input type="text" className="st-field1" value={this.state.adminEmail}
                                                 onChange={(e) => this.setState({ email : e.target.value}) } readOnly   />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="st-single1">
                                                <p className="field-label">Role</p>
                                                <input type="text" className="st-field1" placeholder={this.state.adminRole}
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
                                            <p className="up-res">{this.state.messageRes}</p>
                                        </div>
                                    </div>
                                   
                                    <div className="settings-right">
                                        <div className="image-drop">
                                            <div className="upload-box">
                                                { (this.state.adminImg !== " " && this.state.fileUp === " ") && (
                                                    <img className="up-image1" src={this.state.adminImg} alt="adm" />
                                                )}
                                                { (this.state.adminImg === " " && this.state.fileUp === " ") && (
                                                    <img className="up-image1" src={icon} alt="adm" />
                                                )}
                                                {this.state.fileUp !== " " && (
                                                    <img className="up-image1" src={this.state.fileUp} alt="adm" />
                                                )}
                                               
                                                <input type="file" name="photos" className="file-input1"
                                                id="filephotos" onChange={this.handlefilechange}/>
                                            </div>
                                        </div>
                                       
                                        <p className="purple-txt">Tap to change picture</p>
                                    </div>
                                </form>
                            </div>
                           
                        </div>
                         ): ( 
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

export default SettingsPro;
                    