import React, { Component } from 'react';
import { 
    Bar, 
    //Line, Pie
} from 'react-chartjs-2';


class Chart3 extends Component {
    // similar to componenet did mount
    constructor(props){
        // super function so you can parse in props
        super(props);
        // this.state or state
        this.state = {
            chartData :{
                labels: ['Aug', 'Sept', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar',],
                datasets: [{
                    label: 'Amount',
                    fill: false,
                    
                    borderWidth:1.5,
                    borderColor:'#FFBC00',
                  
                    pointRadius: 5,
                    pointBorderWidth:2,
                    pointHoverRadius:7,
                    //pointHoverBorderWidth:10,
                    pointBackgroundColor:'white',
                    data: [
                        800,		    
                        700,
                        1950,
                        1200,
                        1600
                    ]
                },
                {
                    label: 'Amount',
                    fill: false,
                    lineTension: 0,
                    
                    borderWidth:1.5,
                    borderColor:'#6548C3',
                   
                    pointRadius: 5,
                    pointBorderWidth:2,
                    pointHoverRadius:7,
                  
                    pointBackgroundColor:'white',
                    //pointHoverBackgroundColor:'#bcc',
                    pointRotation:1,
                    data:[
                        500,
                        1000,
                        1500,
                        2000,
                        2500,
                    ]
                },
            ]
            }
        }

    }
    render(){
        return (
            <div className="chart3">
                CHART COMPONENET
                <Bar
                    data={this.state.chartData}
                   
                    options={{  }}
                />
            </div>
        )
    }
}

export default Chart3;