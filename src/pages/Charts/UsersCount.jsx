import React from 'react';

import { Error, Header, Loader, Pie as PieChart } from '../../components';
import { useGetUsersDataQuery } from '../../redux/charts/userChartApi';
import { useAlert } from 'react-alert';

const UsersCount = () => {
    const { data, isLoading, error } = useGetUsersDataQuery()
    const alert = useAlert()

    if (isLoading) return <Loader />

    if (error) {
        alert.error(error.data.message)
        alert.removeAll()
        return <Error />
    }


    return <>

        <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
            <Header category="Pie" title="Users By Block" />
            <div className="w-full">
                <PieChart id="chart-pie" data={data.chartData} legendVisiblity height="full" name={"Block"} />
            </div>
        </div>
    </>
}

export default UsersCount;
