import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

function chartData() {
    return {
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        datasets: [
            {

                data: [65, 59, 80, 81, 56, 55, 40, 20, 30, 37],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 1,
                pointRadius: 0,
                pointHitRadius: 0,
            },
            {

                data: [28, 48, 10, 19, 86, 27, 90, 20, 50, 80],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderWidth: 1,
                pointRadius: 0,
                pointHitRadius: 0,
            },
            {

                data: [78, 18, 40, 39, 26, 67, 20, 60, 20, 90],
                borderColor: 'rgb(191, 85, 236)',
                backgroundColor: 'rgba(191, 85, 236, 0.5)',
                borderWidth: 1,
                pointRadius: 0,
                pointHitRadius: 0,
            },
        ]
    }
}

const options = {
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            }
        }
    },
    plugins: {
        legend: {
            display: false
        }
    },
    elements: {
        line: {
            tension: 0
        }
    },
}

const styles = {
    graphContainer: {
        padding: '15px'
    }
}

class InventoryCharts extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: chartData()
        }
    }

    render() {
        return (
            <div style={styles.graphContainer}>
                <Line data={this.state.data}
                    options={options}
                    width="600" height="200" />
            </div>
        )
    }
}

export default InventoryCharts;

/*			
Copyright (C) 2022 Eunimart Omnichannel Pvt Ltd. (www.eunimart.com)			
All rights reserved.			
This program is free software: you can redistribute it and/or modify			
it under the terms of the GNU General Public License as published by			
the Free Software Foundation, either version 3 of the License, or			
(at your option) any later version.			
This program is distributed in the hope that it will be useful,			
but WITHOUT ANY WARRANTY; without even the implied warranty of			
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the			
GNU General Public License for more details.			
You should have received a copy of the GNU General Public License			
along with this program. If not, see <http://www.gnu.org/licenses/>.			
*/