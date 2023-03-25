import React, { useEffect, useState } from 'react';
import { Header } from '../components'

import { BsFillPatchCheckFill } from "react-icons/bs";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { VscError } from 'react-icons/vsc'
import { AiFillWallet } from 'react-icons/ai'
import { RiTeamLine } from 'react-icons/ri'
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';



const icons = [
    <MdOutlineSupervisorAccount />, <BsFillPatchCheckFill />, <MdOutlineSupervisorAccount />, <BsFillPatchCheckFill />
]


const earningData = [
    {
        icon: <AiFillWallet />,
        percentage: "",
        title: "Transfer Funds",
        iconColor: "#03C9D7",
        iconBg: "#E5FAFB",
        pcColor: "text-red-600",
    },
    {
        icon: <RiTeamLine />,
        title: "View Team & Roles",
        iconColor: "#03C9D7",
        iconBg: "rgb(254, 201, 15)",
        pcColor: "text-green-600",
    },
    {
        icon: <VscError />,

        title: "Project  Backtracking",
        iconColor: "rgb(228, 106, 118)",
        iconBg: "rgb(255, 244, 229)",

        pcColor: "text-red-600",
    },

];



const ProjectManagement = () => {
    
    
    const [data, setData] = useState()
    const { currentColor } = useStateContext()
    const [refresh,setRefresh] = useState("test")
    useEffect(() => {
        const fetchData = async () => {

            const { data } = await axios.get(`${process.env.REACT_APP_LOCALHOST}/project-management`, {
                headers: {
                    'auth-token': localStorage.getItem('access-token-fyp')
                }
            })
            console.log("--------> ", data)

            setData(data)
            
        }
        fetchData()
    }, [refresh])


    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState("")

    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };

    const handleAddProcurement = () => {
        axios.post(`${process.env.REACT_APP_LOCALHOST}/procurement/create`, {
            title, amount
        }, {
            headers: {
                'auth-token': localStorage.getItem('access-token-fyp')
            }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });

            setRefresh(Math.random())
        closeModal();
    }
    return (
        <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
            <Header category="Page" title="Project Management" />


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


            <Header title="" category="Upcoming Payments" />


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {data?.upcomingPayments.map((item, index) => {
                    const randomIndex = Math.floor(Math.random() * icons.length);

                    return (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="h-8 w-8">{icons[randomIndex]}</div>
                                <div>
                                    <p className="text-gray-900 font-medium">{item.organization}</p>
                                    <p className="text-gray-500 text-sm">{new Date(item.date).toLocaleString()}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-900 font-medium">{item.amount}$</p>
                                <p className="text-gray-500 text-sm">pending</p>
                            </div>
                        </div>
                    )
                }
                )}
            </div>




            <Header title="" category="Procurement Bills" />

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5"
                onClick={openModal}
                style={{ background: currentColor }}

            >
                Add Procurement Bill
            </button>
            {showModal && (
                <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

                    <div className="modal-content bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-header flex justify-between items-center p-2">
                            <h2 className="text-2xl font-bold">Enter Bill details</h2>
                            <button
                                className="bg-transparent text-black opacity-50 text-3xl font-bold leading-none hover:text-black p-2 rounded-md focus:outline-none"
                                onClick={closeModal}
                            >
                                <span>&times;</span>
                            </button>
                        </div>

                        <div className="modal-body p-2">
                            <input
                                className="border rounded w-full p-2"
                                placeholder='Enter bill title'
                                value={title}
                                onChange={(e) => { setTitle(e.target.value) }}
                            />
                            <input
                                className="border rounded w-full p-2"
                                placeholder='Enter bill amount'
                                value={amount}
                                onChange={(e) => { setAmount(e.target.value) }}
                            />
                        </div>

                        <div className="modal-footer flex justify-end pt-2">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleAddProcurement}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}


            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data?.procurement.map((item, index) => {
                    const randomIndex = Math.floor(Math.random() * icons.length);

                    return (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="h-8 w-8">{icons[randomIndex]}</div>


                                <div>
                                    <p className="text-gray-900 font-medium">{item.title}</p>
                                    <p className="text-gray-500 text-sm">{item.date}</p>
                                </div>

                            </div>
                            <div>
                                <p className="text-gray-900 font-medium">{item.amount}$</p>
                                <p className="text-gray-500 text-sm">Successfully</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProjectManagement