import React, { useEffect } from 'react';

import { Error, Header, Loader, Pie as PieChart } from '../../components';
import { useGetPieBarDataQuery, useRefreshPiebarMutation } from '../../redux/charts/piechartApi';
import { useAlert } from 'react-alert';

const Pie = () => {
  

  useEffect(() => {
    const interval = setInterval(() => {
      refreshPiebar()
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const { data, isLoading, error } = useGetPieBarDataQuery()
  const [refreshPiebar] = useRefreshPiebarMutation()
  const alert = useAlert()

  if (isLoading) return <Loader />

  if (error) {
    alert.error(error.data.message)
    alert.removeAll()
    return <Error />
  }


  return <>

    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <Header category="Pie" title="Most Frequent Complaints" />
      <div className="w-full">
        <PieChart id="chart-pie" data={data.chartData} legendVisiblity height="full" />
      </div>
    </div>
  </>
}

export default Pie;
