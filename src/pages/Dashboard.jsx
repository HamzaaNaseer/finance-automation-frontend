import React, { useEffect, useState } from 'react'
//icons
import { BsCurrencyDollar } from 'react-icons/bs'
import { GoPrimitiveDot } from 'react-icons/go'
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import { BsBoxSeam, BsFillPatchCheckFill } from "react-icons/bs";
import { FiBarChart } from "react-icons/fi";
import { VscError } from 'react-icons/vsc'

import { AiFillMobile } from 'react-icons/ai'


//COMPONENTS
import { Stacked, Button, SparkLine, Loader, Error } from '../components'
//DATA
import { earningData, SparklineAreaData, ecomPieChartData } from '../data/dummy'
//CONTEXT
import { useStateContext } from '../contexts/ContextProvider'
import { useGetHomepageDataQuery, useRefreshHomepageMutation } from '../redux/homepage/homepageApi'
import { useAlert } from 'react-alert'
import Pyramid from './Charts/Pyramid';
import Pie from './Charts/Pie';
import UsersCount from './Charts/UsersCount';



const Dashboard = () => {

  useEffect(() => {
    const interval = setInterval(() => {
      refreshHomepage()
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { data, isLoading, error } = useGetHomepageDataQuery()

  const [refreshHomepage] = useRefreshHomepageMutation()


  const { currentColor } = useStateContext()
  const alert = useAlert()
  if (isLoading) return <Loader />


  if (error) {
    console.log("error is ", error)
    alert.show(error.data.message)
    alert.removeAll()
    return <Error />
  }





  const earningData = [
    {
      icon: <MdOutlineSupervisorAccount />,
      amount: data.complaints.totalComplaints,
      percentage: "",
      title: "Total Complaints",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
      pcColor: "text-red-600",
    },
    {
      icon: <BsFillPatchCheckFill />,
      amount: data.complaints.resolvedComplaints,
      percentage: data.complaints.resolvedPercentage + '%',
      title: "Resolved Complaints",
      iconColor: "#03C9D7",
      iconBg: "rgb(254, 201, 15)",
      pcColor: "text-green-600",
    },
    {
      icon: <VscError />,
      amount: data.complaints.pendingComplaints,
      percentage: data.complaints.pendingPercentage + '%',
      title: "Pending Complaints",
      iconColor: "rgb(228, 106, 118)",
      iconBg: "rgb(255, 244, 229)",

      pcColor: "text-red-600",
    },
    {
      icon: <AiFillMobile />,
      amount: data.totalUsers,
      percentage: "",
      title: "App Users",
      iconColor: "rgb(0, 194, 146)",
      iconBg: "rgb(235, 250, 242)",
      pcColor: "text-red-600",
    },
  ];

  return (

    <div className='mt-12'>
      <div div className='flex flex-wrap  lg:flex-nowrap justify-center' >
        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='font-bold text-gray-400'>Population</p>
              <p className='text-2xl'>23,000</p>
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



    </div >
  )
}

export default Dashboard