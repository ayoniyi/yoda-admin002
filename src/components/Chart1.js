import React, { Component } from 'react';
import Chart from 'chart.js';

import axios from 'axios';

/*
//css
import '../css/Sidemenu.css'

// assets
import Logo from '../assets/svg/logo2.svg'
import Girl from '../assets/png/girl.png'
*/

class Chart1 extends Component {

    
    state = {
        investmentsA: []
    }

    componentDidMount () {

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

        const baseURL = localStorage.getItem("baseURL")

        ///////// Investment Vs Returns

       axios.get(`${baseURL}/admin/loan/investmentreturn`, axiosConfig)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);

            this.setState({ 
                investments1: res.data.data.stats.investment[0].total,
                investments2: res.data.data.stats.investment[1].total,
                investments3: res.data.data.stats.investment[2].total,
                investments4: res.data.data.stats.investment[3].total,
                investments5: res.data.data.stats.investment[4].total,
                //
                investments6: res.data.data.stats.investment[5].total,
                investments7: res.data.data.stats.investment[6].total,
                investments8: res.data.data.stats.investment[7].total,

                isLoaded: true
            }); 

            console.log(this.state.investments1)


            //console.log(inv1)
           
            localStorage.setItem("inv1", this.state.investments1)
            localStorage.setItem("inv2", this.state.investments2)
            localStorage.setItem("inv3", this.state.investments3)
            localStorage.setItem("inv4", this.state.investments4)
            localStorage.setItem("inv5", this.state.investments5)
            //
            localStorage.setItem("inv6", this.state.investments6)
            localStorage.setItem("inv7", this.state.investments7)
            localStorage.setItem("inv8", this.state.investments8)
            //
           
            })
            .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            
            this.setState({ isLoaded: true });
        }) 
       

        //console.log(this.state.investmentsA)
        console.log(localStorage.getItem("inv1"))


        let myChart1 = document.getElementById('myChart1').getContext('2d');

        //
        Chart.defaults.global.defaultFontSize = 14;

         // storage inv
         const inv1 = Math.round(localStorage.getItem("inv1"))
         const inv2 = Math.round(localStorage.getItem("inv2"))
         const inv3 = Math.round(localStorage.getItem("inv3"))
         const inv4 = Math.round(localStorage.getItem("inv4"))
         const inv5 = Math.round(localStorage.getItem("inv5"))
         //
         const inv6 = Math.round(localStorage.getItem("inv6"))
         const inv7 = Math.round(localStorage.getItem("inv7"))
         const inv8 = Math.round(localStorage.getItem("inv8"))

         console.log(inv1)

        new Chart(myChart1, {
            type: 'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
            data:{
                labels: ['Aug', 'Sept', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
                datasets: [{
                    label: 'Amount',
                    barPercentage: 0.7,
                  
                    //barThickness: 6,
                    //maxBarThickness: 8,
                    //minBarLength: 34,
                    data:[
                        /*1800, 
                        800,		    
                        700,
                        1950,
                        1200,
                        1600*/
                        /*500,
                        1000,
                        1500,
                        2000,
                        2500,*/
                        inv1,
                        inv2,
                        inv3,
                        inv4,
                        inv5,
                        inv6,
                        inv7,
                        inv8
                        
                    ],
                   backgroundColor: '#6C63FF',
                    /*backgroundColor: [
                        'skyblue',
                        'lavender',
                        'purple',
                        'orange',
                        '#bcc',
                        'pink'
                    ],*/
                    //borderWidth:1,
                    borderColor:'#777',
                    //hoverBorderWidth:3,
                    //hoverBorderColor:'#000'
                }]
            },
            options:{
                
                title: {
                    display: false,
                    text: 'Cities in New York',
                    fontSize: 25
                },
                legend: {
                    display: false,
                    position: 'right',
                    labels:{
                        fontColor: 'black'
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            
                            beginAtZero: true,

                        },
                        /*gridLines: {
                            display: false
                        }*/
                        padding: {
                            left:0,
                            right:0,
                            bottom:0,
                            top:50
                        }
                       
                    }],
                    xAxes: [{
                        gridLines: {
                            offsetGridLines: true,
                            display: false,
                           

                            
                        }
                    }]
                },
                layout: {
                    padding: {
                        left:0,
                        right:50,
                        bottom:0,
                        top:50
                    }
                },
                tooltips: {
                    enabled:true
                }
            }

        })
    }

    render () {

        return (

            <div>
                <section className="chart1" >
                   <canvas id="myChart1" height="200" ></canvas>
                </section>
            </div>
        )

        
    }
}

export default Chart1;