import React, { useEffect, useState } from 'react';

import { Error, Header, Loader, Pie as PieChart } from '../../components';
//import { useGetPieBarDataQuery, useRefreshPiebarMutation } from '../../redux/charts/piechartApi';
import axios from 'axios';




const ModuleFinances = () => {

    const [data, setData] = useState()
    const [total, setTotal] = useState()
    useEffect(() => {
        const fetchData = async () => {

            const { data } = await axios.get(`${process.env.REACT_APP_LOCALHOST}/charts/pie-finance`, {
                headers: {
                    'auth-token': localStorage.getItem('access-token-fyp')
                }
            })
            console.log("--------> ", data)
            setData(data.chartData)
            setTotal(data.total)
        }
        fetchData()
    }, [])



    return <>

        <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
            <Header category="Pie" title="Modules Finances" />
            <Header category="Finance Given" title={total} />

            <div className="w-full">
                <PieChart id="chart-pie" data={data} legendVisiblity height="full" />
            </div>
        </div>
    </>
}

export default ModuleFinances;
