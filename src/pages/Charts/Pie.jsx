import React, { useEffect } from 'react';

import { Error, Header, Loader, Pie as PieChart } from '../../components';
//import { useGetPieBarDataQuery, useRefreshPiebarMutation } from '../../redux/charts/piechartApi';
import { useAlert } from 'react-alert';


const data =   [
  {
      "x": "module 1",
      "y": 10,
      "text": "10 %"
  },
  {
      "x": "module 2",
      "y": 10,
      "text": "10 %"
  },
  {
      "x": "module 3",
      "y": 100,
      "text": "100 %"
  },
  {
      "x": "module 4",
      "y": 50,
      "text": "50 %"
  },
  {
      "x": "module 5",
      "y": 20,
      "text": "20 %"
  }
]

const Pie = () => {
  

  


  return <>

    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <Header category="Pie" title="Modules Completion" />
      <div className="w-full">
        <PieChart id="chart-pie" data={data} legendVisiblity height="full" />
      </div>
    </div>
  </>
}

export default Pie;
