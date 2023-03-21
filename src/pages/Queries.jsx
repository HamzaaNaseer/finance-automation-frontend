import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Header } from '../components'
import { useStateContext } from '../contexts/ContextProvider';




const DUMMY_DATA = [
    {
        "_id": "640ce89f614b453ee23224f6",
        "subject": "i don't find the progress upto date",
        "createdBy": {
            "_id": "640ce4ad56475967ac6b2e70",
            "name": "Umer Masood",
            "email": "user1@doner.com",
            "password": "12345678",
            "role": "DONER",
            "__v": 0
        },
        "comments": [
            {
                "commented_by": "640ce4ad56475967ac6b2e70",
                "description": "yes correct",
                "date": "2023-03-11T20:57:42.241Z",
                "_id": "640ceb46644921911809b6fd"
            },
            {
                "commented_by": "640ce4ad56475967ac6b2e70",
                "description": "asdfaf",
                "date": "2023-03-15T12:54:27.751Z",
                "_id": "6411c00313074ffd57ee07c3"
            },
            {
                "commented_by": "640ce4ad56475967ac6b2e70",
                "description": "heheeh nice",
                "date": "2023-03-15T12:54:34.992Z",
                "_id": "6411c00a13074ffd57ee07cc"
            },
            {
                "commented_by": "640ce4ad56475967ac6b2e70",
                "description": "heheeh nice",
                "date": "2023-03-15T12:59:51.681Z",
                "_id": "6411c14713074ffd57ee07de"
            },
            {
                "commented_by": "640ce4ad56475967ac6b2e70",
                "description": "heheeh nice",
                "date": "2023-03-15T12:59:53.948Z",
                "_id": "6411c14913074ffd57ee07ed"
            },
            {
                "commented_by": "640ce4ad56475967ac6b2e70",
                "description": "heheeh nice",
                "_id": "6411c14c13074ffd57ee07ff",
                "date": "2023-03-15T12:59:56.756Z"
            }
        ],
        "createdAt": "2023-03-11T20:46:23.095Z",
        "__v": 0
    },
    {
        "_id": "640db9679bf273841479a58c",
        "subject": "Progress is slow",
        "createdBy": {
            "_id": "640ce4ad56475967ac6b2e70",
            "name": "Umer Masood",
            "email": "user1@doner.com",
            "password": "12345678",
            "role": "DONER",
            "__v": 0
        },
        "comments": [],
        "createdAt": "2023-03-12T11:37:11.134Z",
        "__v": 0
    }
]
const CommentList = ({ data }) => {

    const [showModal, setShowModal] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [id, setId] = useState("")

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

        setNewComment("");


    };
    return (<>

        <div className="w-full">
            {data.map((comment) => (
                <div key={comment._id} className="flex flex-row space-x-4 py-2">
                    <div className="w-1/2">
                        <p className="font-medium">{comment.subject}</p>
                        <p className="text-gray-500">
                            {`Created by ${comment.createdBy.name} on ${new Date(comment.createdAt).toLocaleString()}`}
                        </p>
                    </div>
                    <div>
                        <button onClick={() => { handleCommentsClick(comment.comments, comment._id) }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
                            <div className="font-bold">{'dummy'}</div>
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

    }, [])




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
                data && <CommentList data={data} />

            }

        </div>
    )
}

export default Queries