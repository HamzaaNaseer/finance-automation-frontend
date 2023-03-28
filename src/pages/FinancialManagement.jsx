import React, { useEffect, useState } from 'react'
import { Header } from '../components'
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { VscError } from 'react-icons/vsc'
import BarChart from './Charts/BarChart';
import axios from 'axios';
import { BsFillPatchCheckFill } from "react-icons/bs";
import { useStateContext } from '../contexts/ContextProvider';
import { useAlert } from 'react-alert'




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


];



const icons = [
    <MdOutlineSupervisorAccount />, <BsFillPatchCheckFill />, <MdOutlineSupervisorAccount />, <BsFillPatchCheckFill />
]

const FinancialManagement = () => {
    const [data, setData] = useState()
    const [barData, setBarData] = useState()
    const { currentColor } = useStateContext()
    const [month, setMonth] = useState("")
    const [amount, setAmount] = useState("")
    const [color, setColor] = useState("")
    const [financeDoc, setFinanceDoc] = useState("")
    const [showDocModal, setShowDocModal] = useState(false)
    const [refresh, setRefresh] = useState("test")
    const user = JSON.parse(localStorage.getItem("user-data"))

    const alert = useAlert()
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

    useEffect(() => {
        const fetchData = async () => {

            const { data } = await axios.get(`${process.env.REACT_APP_LOCALHOST}/monthly/get`)
            console.log("--------> ", data)
            setBarData(data)
        }
        fetchData()
    }, [refresh])

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {

            const { data } = await axios.get(`${process.env.REACT_APP_LOCALHOST}/doc/finance-doc`)
            console.log("FINANCE DOC DATA ", data)
            setFinanceDoc(data.doc[0].link)
        }
        fetchData()
    }, [refresh])




    const openModal = () => {
        if (user.role !== "DONEE") {
            alert.error("ONLY DONEE IS ALLOWED")
            return

        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const openDocModal = () => {
        if (user.role !== "DONEE") {
            alert.error("ONLY DONEE IS ALLOWED")
            return

        }
        setShowDocModal(true);
    };

    const closeDocModal = () => {
        setShowDocModal(false);
    };

    const updateMonthly = async () => {

        await axios.patch(`${process.env.REACT_APP_LOCALHOST}/monthly/update`, { month, color, amount })
        closeModal()


        setRefresh(Math.random())

        setAmount("")
        setColor("")
        setMonth("")


    }


    const [selectedFile, setSelectedFile] = useState(null);


    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };


    const handleUpload = () => {
        const formData = new FormData();
        formData.append('doc', selectedFile);

        axios.patch(`${process.env.REACT_APP_LOCALHOST}/doc/update/finances`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'auth-token': localStorage.getItem('access-token-fyp')

            }
        })
            .then(response => {
                closeDocModal()
                setRefresh(Math.random())

                console.log(response.data);
            })
            .catch(error => {
                closeDocModal()
                console.log(error);
            });

        closeDocModal()
    }


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
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5"
                    onClick={openModal}
                    style={{ background: currentColor }}

                >
                    Update
                </button>

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5 mx-2"
                    style={{ background: currentColor }}

                >
                    <a href={`${process.env.REACT_APP_LOCALHOST}${financeDoc}`} >View Finances</a>
                </button>
                {showModal && (
                    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
                        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

                        <div className="modal-content bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                            <div className="modal-header flex justify-between items-center p-2">
                                <h2 className="text-2xl font-bold">Update Monthly Details</h2>
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
                                    placeholder='Enter month name'
                                    value={month}
                                    onChange={(e) => { setMonth(e.target.value) }}
                                />
                                <input
                                    className="border rounded w-full p-2"
                                    placeholder='Enter bill amount'
                                    value={amount}
                                    onChange={(e) => { setAmount(e.target.value) }}
                                />
                                <input
                                    className="border rounded w-full p-2"
                                    placeholder='enter color name'
                                    value={color}
                                    onChange={(e) => { setColor(e.target.value) }}
                                />
                            </div>

                            <div className="modal-footer flex justify-end pt-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={updateMonthly}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5"
                    onClick={openDocModal}
                    style={{ background: currentColor }}

                >
                    Upload Finances
                </button>

                {showDocModal && (
                    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
                        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

                        <div className="modal-content bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                            <div className="modal-header flex justify-between items-center p-2">
                                <h2 className="text-2xl font-bold">Upload a File</h2>
                                <button
                                    className="bg-transparent text-black opacity-50 text-3xl font-bold leading-none hover:text-black p-2 rounded-md focus:outline-none"
                                    onClick={closeDocModal}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>

                            <div className="modal-body p-2">
                                <input
                                    className="border rounded w-full p-2"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </div>

                            <div className="modal-footer flex justify-end pt-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleUpload}
                                >
                                    Upload
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {

                    barData && <BarChart data={barData} />
                }
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