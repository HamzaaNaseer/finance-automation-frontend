import React from 'react'
import { Header } from '../components'
import { BsFillPatchCheckFill } from "react-icons/bs";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { VscError } from 'react-icons/vsc'
import { AiFillMobile } from 'react-icons/ai'
import BarChart from './Charts/BarChart';




const earningData = [
    {
        icon: <MdOutlineSupervisorAccount />,
        amount: 100,
        percentage: "",
        title: "Total Complaints",
        iconColor: "#03C9D7",
        iconBg: "#E5FAFB",
        pcColor: "text-red-600",
    },
    {
        icon: <BsFillPatchCheckFill />,
        amount: 100,
        percentage: '100' + '%',
        title: "Resolved Complaints",
        iconColor: "#03C9D7",
        iconBg: "rgb(254, 201, 15)",
        pcColor: "text-green-600",
    },
    {
        icon: <VscError />,
        amount: 100,
        percentage: '100%' + '%',
        title: "Pending Complaints",
        iconColor: "rgb(228, 106, 118)",
        iconBg: "rgb(255, 244, 229)",

        pcColor: "text-red-600",
    },

];

const dummyData = [
    {
        icon: <MdOutlineSupervisorAccount />,
        organization: "Ministry of Economics Affairs Divisions",
        date: "March 15, 2023",
        amount: "$0.5 Million",
        description: "Funding-01 for GMF",
    },
    {
        icon: <BsFillPatchCheckFill />,
        organization: "Globex Corp.",
        date: "March 10, 2023",
        amount: "$8,000",
        description: "Payment for product delivery",
    },
    {
        icon: <VscError />,
        organization: "Hooli Inc.",
        date: "March 5, 2023",
        amount: "$5,000",
        description: "Payment for consulting services",
    },
];

const FinancialManagement = () => {
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

            <div className='w-[500px] mx-auto'>

                <BarChart />
            </div>


            <Header title="Transaction History" category="transactions" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dummyData.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="h-8 w-8">{item.icon}</div>
                            <div>
                                <p className="text-gray-900 font-medium">{item.organization}</p>
                                <p className="text-gray-500 text-sm">{item.date}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-900 font-medium">{item.amount}</p>
                            <p className="text-gray-500 text-sm">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default FinancialManagement