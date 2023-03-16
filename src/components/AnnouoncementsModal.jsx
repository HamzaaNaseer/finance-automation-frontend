import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useStateContext } from "../contexts/ContextProvider";

const AnnouoncementsModal = ({addAnnouncement}) => {
    const [showModal, setShowModal] = React.useState(false);
    const { currentColor } = useStateContext()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const alert = useAlert()
    const submitHandler = () => {
        console.log("submit handler called")
        //do the submit logic here 
        if (title.length < 5 || description.length < 5) {


            alert.error("please provide both title and description")
            return

        }
        addAnnouncement({ title, description })
        setTitle("")
        setDescription("")


    }
    return (
        <>
            <button
                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                style={{ backgroundColor: `${currentColor}` }}
                onClick={() => setShowModal(true)}
            >
                Create New Announcement
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Your Announcement
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">

                                    <div class="mb-3 pt-0">
                                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter title" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
                                    </div>
                                    <div class="mb-3 pt-0">
                                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter description" className="  px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full h-[200px]" />
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            setShowModal(false)
                                        }
                                        }
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        style={{ backgroundColor: `${currentColor}` }}

                                        onClick={() => {
                                            setShowModal(false)
                                            submitHandler()
                                        }
                                        }
                                    >
                                        Create Announcement
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
export default AnnouoncementsModal