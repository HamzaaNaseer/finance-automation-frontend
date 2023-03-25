import React from 'react'
//icons

import { MdOutlineSupervisorAccount } from "react-icons/md";
import {  BsFillPatchCheckFill } from "react-icons/bs";





import Pie from './Charts/Pie';
import ModuleCompletionBar from './Charts/moduleCompletionBar';



const Dashboard = () => {




  const earningData = [
    {
      icon: <MdOutlineSupervisorAccount />,
      amount: 4,
      percentage: "",
      title: "Total Modules",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
      pcColor: "text-red-600",
    },
    {
      icon: <BsFillPatchCheckFill />,
      amount: 39000000,
      percentage: '75' + '%',
      title: "Finances Consumed",
      iconColor: "#03C9D7",
      iconBg: "rgb(254, 201, 15)",
      pcColor: "text-green-600",
    },
  ];

  return (

    <div className='mt-12'>
      <div div className='flex flex-wrap  lg:flex-nowrap justify-center' >
        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='font-bold text-gray-400'>Total Donation</p>
              <p className='text-2xl'>352,123,00</p>
            </div>
          </div>

        </div>
        <div className='flex m-3 flex-wrap justify-center gap-1 items-center'>
          {earningData.map((item) => (
            <div key={item.title} className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl'>
              <button
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className='text-2xl opacity-90 rounded-full p-4 hover:drop-shadow-xl'>
                {item.icon}
              </button>
              <p className='mt-3'>
                <span className='text-lg font-semibold'>{item.amount}</span>
                <span className={`text-sm ml-2 ${item.pcColor}`}>{item.percentage}</span>
              </p>
              <p className='text-sm text-gray-400 mt-1'>{item.title}</p>

            </div>
          ))}

        </div>
      </div >

      <div className='flex gap-10 flex-wrap justify-center'>
        <div>
          <Pie />
        </div>


      </div>

      <div className='flex gap-10 flex-wrap justify-center'>
        <div>
          <ModuleCompletionBar />
        </div>


      </div>



    </div >
  )
}

export default Dashboard