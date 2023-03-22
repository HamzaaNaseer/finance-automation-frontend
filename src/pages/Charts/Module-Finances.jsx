import React, { useEffect } from 'react';

import { Error, Header, Loader, Pie as PieChart } from '../../components';
//import { useGetPieBarDataQuery, useRefreshPiebarMutation } from '../../redux/charts/piechartApi';
import { useAlert } from 'react-alert';


const data = {
    total: 4600000,

    chart: [
        {
            "x": "module 1",
            "y": "21.74",
            "text": "21.74%"
        },
        {
            "x": "module 2",
            "y": "43.48",
            "text": "43.48%"
        },
        {
            "x": "module 3",
            "y": "21.74",
            "text": "21.74%"
        },
        {
            "x": "module 4",
            "y": "6.52",
            "text": "6.52%"
        },
        {
            "x": "module 5",
            "y": "6.52",
            "text": "6.52%"
        }
    ]
}

const ModuleFinances = () => {





    return <>

        <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
            <Header category="Pie" title="Modules Finances" />
            <Header category="Finance Given" title={data.total} />

            <div className="w-full">
                <PieChart id="chart-pie" data={data.chart} legendVisiblity height="full" />
            </div>
        </div>
    </>
}

export default ModuleFinances;
