import React, { useEffect } from 'react';

import { Error, Header, Loader, Pie as PieChart } from '../../components';
//import { useGetPieBarDataQuery, useRefreshPiebarMutation } from '../../redux/charts/piechartApi';
import { useAlert } from 'react-alert';

const Pie = () => {
  

  


  return <>

    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <Header category="Pie" title="Most Frequent Complaints" />
      <div className="w-full">
        <PieChart id="chart-pie" data={[]} legendVisiblity height="full" />
      </div>
    </div>
  </>
}

export default Pie;
