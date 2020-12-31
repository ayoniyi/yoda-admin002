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

                returns1: res.data.data.stats.returns[0].total,
                returns2: res.data.data.stats.returns[1].total,
                returns3: res.data.data.stats.returns[2].total,
                returns4: res.data.data.stats.returns[3].total,
                returns5: res.data.data.stats.returns[4].total,
                //
                returns6: res.data.data.stats.returns[5].total,
                returns7: res.data.data.stats.returns[6].total,
                returns8: res.data.data.stats.returns[7].total,

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
            ////
            localStorage.setItem("ret1", this.state.returns1)
            localStorage.setItem("ret2", this.state.returns2)
            localStorage.setItem("ret3", this.state.returns3)
            localStorage.setItem("ret4", this.state.returns4)
            localStorage.setItem("ret5", this.state.returns5)
            //
            localStorage.setItem("ret6", this.state.returns6)
            localStorage.setItem("ret7", this.state.returns7)
            localStorage.setItem("ret8", this.state.returns8)


           
            })
            .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            
            this.setState({ isLoaded: true });
        }) 
        //this.setState({ isLoaded: true });
        //console.log(this.state.investmentsA)
        console.log(localStorage.getItem("inv1"))
       
        ///////

        let myChart1 = document.getElementById('myChart1').getContext('2d');

        ///

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
        //console.log(inv1)

        // storage return
        const ret1 = Math.round(localStorage.getItem("ret1"))
        const ret2 = Math.round(localStorage.getItem("ret2"))
        const ret3 = Math.round(localStorage.getItem("ret3"))
        const ret4 = Math.round(localStorage.getItem("ret4"))
        const ret5 = Math.round(localStorage.getItem("ret5"))
        
        const ret6 = Math.round(localStorage.getItem("ret6"))
        const ret7 = Math.round(localStorage.getItem("ret7"))
        const ret8 = Math.round(localStorage.getItem("ret8"))

        console.log(ret4)

        

        new Chart(myChart1, {
            type: 'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
            data:{
                labels: ['Aug', 'Sept', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar',],
                datasets: [{
                    label: 'Amount',
                    fill: false,
                    lineTension: 0,
                    //barPercentage: 0.7,
                    //barThickness: 6,
                    //maxBarThickness: 8,
                    //minBarLength: 34,
                    //backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderWidth:1.5,
                    borderColor:'#FFBC00',
                    //hoverBorderWidth:3,
                    //hoverBorderColor:'#000'
                    pointRadius: 5,
                    pointBorderWidth:2,
                    pointHoverRadius:7,
                    //pointHoverBorderWidth:10,
                    pointBackgroundColor:'white',
                    data: [
                        inv1,
                        inv2,
                        inv3,
                        inv4,
                        inv5,
                        inv6,
                        inv7,
                        inv8
                    ]
                },
                {
                    label: 'Amount',
                    fill: false,
                    lineTension: 0,
                    //barThickness: 6,
                    //maxBarThickness: 8,
                    //minBarLength: 34,
                    
                    //backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderWidth:1.5,
                    borderColor:'#6548C3',
                    //hoverBorderWidth:3,
                    //hoverBorderColor:'#000'
                    pointRadius: 5,
                    pointBorderWidth:2,
                    pointHoverRadius:7,
                    //pointHoverBorderWidth:10,
                    //pointBorderColor:'white',
                    pointBackgroundColor:'white',
                    //pointHoverBackgroundColor:'#bcc',
                    pointRotation:1,
                    data:[
                        ret1,
                        ret2,
                        ret3,
                        ret4,
                        ret5,
                        ret6,
                        ret7,
                        ret8
                    ]
                },
            ]
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
                            //min: 10000,
                            beginAtZero: true,
                            showLabelBackdrop: true
                        },
                        /*gridLines: {
                            display: false
                        }*/
                        
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