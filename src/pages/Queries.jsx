import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Header } from '../components'
import { useStateContext } from '../contexts/ContextProvider';





const CommentList = ({ data,setRefresh }) => {

    const [showModal, setShowModal] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [id, setId] = useState("")
    const { currentColor } = useStateContext()
    

    const handleCommentsClick = (commentList, id) => {
        setComments(commentList);
        setId(id)
        setShowModal(true);
    };

    const handleSendComment = async () => {
        // Here you can add logic to send the new comment to the backend
        console.log(newComment);
        setShowModal(false)

        if (newComment === "") return


        const { data } = await axios.patch(`${process.env.REACT_APP_LOCALHOST}/query/update/${id}`, {
            newComment: {
                description: newComment
            }
        }, {
            headers: {
                'auth-token': localStorage.getItem('access-token-fyp')
            }
        })
        console.log("data is ", data)
        setRefresh(Math.random())

        setNewComment("");


    };
    return (<>

        <div className="w-full">
            {data.map((comment) => (
                <div key={comment._id} className="flex flex-row space-x-4 py-2">
                    <div className="w-1/2">
                        <p className=" font-bold">{comment.subject}</p>
                        <p className="text-gray-500">
                            {`Created by ${comment.createdBy.name} on ${new Date(comment.createdAt).toLocaleString()}`}
                        </p>
                    </div>
                    <div>
                        <button style={{ background: currentColor }}
                            onClick={() => { handleCommentsClick(comment.comments, comment._id) }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Comments
                        </button>
                    </div>
                </div>
            ))}
        </div>
        {showModal && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg w-96 max-h-[50vh] overflow-auto">
                    {comments.map((comment, index) => (
                        <div key={index} className="mb-4">
                            <div className="font-bold">{comment.commented_by.name} <span style={{ color: currentColor }} className='font-bold text-[8px]'>{comment.commented_by.role}</span></div>
                            <div>{comment.description}</div>
                        </div>
                    ))}
                    <div className="flex mt-4">
                        <input
                            className="border border-gray-400 rounded w-full py-2 px-3 mr-2"
                            type="text"
                            placeholder="Add a comment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => { handleSendComment() }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
    );
};

const Queries = () => {





    const [data, setData] = useState([])
    const { currentColor } = useStateContext()

    const [showModal, setShowModal] = useState(false);
    const [subject, setSubject] = useState("")
    const [refresh, setRefresh] = useState("test")

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleAddQuery = () => {
        axios.post(`${process.env.REACT_APP_LOCALHOST}/query/create`, {
            subject
        }, {
            headers: {
                'auth-token': localStorage.getItem('access-token-fyp')
            }
        })
            .then(response => {
                setRefresh(Math.random())

                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        closeModal();
    }


    useEffect(() => {
        const fetchData = async () => {

            const { data } = await axios.get(`${process.env.REACT_APP_LOCALHOST}/query/get`)
            console.log(data.queries)
            setData(data.queries)
        }
        fetchData()

    }, [refresh])




    return (
        <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
            <Header title="Queries" category="Page" />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5"
                onClick={openModal}
                style={{ background: currentColor }}

            >
                Start Query
            </button>
            {showModal && (
                <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

                    <div className="modal-content bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-header flex justify-between items-center p-2">
                            <h2 className="text-2xl font-bold">Enter query subject</h2>
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
                                value={subject}
                                onChange={(e) => { setSubject(e.target.value) }}
                            />
                        </div>

                        <div className="modal-footer flex justify-end pt-2">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleAddQuery}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {
                data && <CommentList data={data} setRefresh={setRefresh}/>

            }

        </div>
    )
}

export default Queries