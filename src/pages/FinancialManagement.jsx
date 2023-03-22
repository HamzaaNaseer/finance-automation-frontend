import React, { useEffect, useState } from 'react'
import { Header } from '../components'
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { VscError } from 'react-icons/vsc'
import BarChart from './Charts/BarChart';
import axios from 'axios';
import { BsFillPatchCheckFill } from "react-icons/bs";




const earningData = [
    {
        icon: <MdOutlineSupervisorAccount />,
        amount: "Total Amount : 1500$",
        percentage: "",
        title: "Transfer via organization card",
        iconColor: "#03C9D7",
        iconBg: "#E5FAFB",
        pcColor: "text-red-600",
    },
    {
        icon: <BsFillPatchCheckFill />,
        amount: "Total Amount: $1.5 Mill",
        percentage: '',
        title: "Transfer Via Bank Account",
        iconColor: "#03C9D7",
        iconBg: "rgb(254, 201, 15)",
        pcColor: "text-green-600",
    },
    {
        icon: <VscError />,
        amount: 100,
        percentage: "",
        title: "Funding Backtracking",
        iconColor: "rgb(228, 106, 118)",
        iconBg: "rgb(255, 244, 229)",

        pcColor: "text-red-600",
    },

];



const icons = [
    <MdOutlineSupervisorAccount />, <BsFillPatchCheckFill />, <MdOutlineSupervisorAccount />, <BsFillPatchCheckFill />
]

const FinancialManagement = () => {
    const [data, setData] = useState()
    useEffect(() => {
        const fetchData = async () => {

            const { data } = await axios.get(`${process.env.REACT_APP_LOCALHOST}/financial-management`, {
                headers: {
                    'auth-token': localStorage.getItem('access-token-fyp')
                }
            })
            console.log("--------> ", data)
            setData(data)
        }
        fetchData()
    }, [])
    return (
        <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
            <Header title="Financial Management" category="Page" />

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

            <div className=' w-full md:w-[500px] lg:w-[700px] mx-auto'>

                <BarChart />
            </div>


            <Header title="Transaction History" category="transactions" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data?.transactions.map((item, index) => {
                    const randomIndex = Math.floor(Math.random() * icons.length);

                    return (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="h-8 w-8">{icons[randomIndex]}</div>
                                <div>
                                    <p className="text-gray-900 font-medium">{item.organizationName}</p>
                                    <p className="text-gray-500 text-sm">{new Date(item.date).toLocaleString()}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-900 font-medium">{item.amount}$</p>
                                <p className="text-gray-500 text-sm">{item.description}</p>
                            </div>
                        </div>
                    )
                }
                )}
            </div>


        </div>
    )
}

export default FinancialManagement