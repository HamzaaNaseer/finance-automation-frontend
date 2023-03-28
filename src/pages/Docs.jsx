import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Header } from '../components'
import { useStateContext } from '../contexts/ContextProvider'
import { AiFillDelete } from 'react-icons/ai'
import { useAlert } from 'react-alert'


const Docs = () => {
  const [docs, setDocs] = useState([])
  const [refresh, setRefresh] = useState("test")
  const alert = useAlert()


  const { currentColor } =
    useStateContext()
  useEffect(() => {
    const fetchData = async () => {

      const { data } = await axios.get(`${process.env.REACT_APP_LOCALHOST}/doc/get`)
      setDocs(data.docs)
      console.log(data.docs)
    }
    fetchData()

  }, [refresh])

  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('doc', selectedFile);

    axios.post(`${process.env.REACT_APP_LOCALHOST}/doc/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
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

  const deleteDoc = async (id, postedBy) => {
    const user = JSON.parse(localStorage.getItem('user-data'))
    if (user._id !== postedBy) {
      alert.error("not allowed")


      return
    }




    await axios.delete(`${process.env.REACT_APP_LOCALHOST}/doc/delete/${id}`)


    setRefresh(Math.random())

  }


  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header title="Documents" category="Page" />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5"
        onClick={openModal}
        style={{ background: currentColor }}

      >
        Upload
      </button>

      {showModal && (
        <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

          <div className="modal-content bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-header flex justify-between items-center p-2">
              <h2 className="text-2xl font-bold">Upload a File</h2>
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
        docs && docs.map((d) => {
          {
            if (d.name === "finances" || d.name === "transferred" || d.name === "team") return <></>
          }
          return (
            <div className="flex items-center justify-between border-b border-gray-200 py-4">
              <div className="flex items-center">
                <AiFillDelete color='red' className='mr-2 cursor-pointer' onClick={() => { deleteDoc(d._id, d.postedBy) }} />
                <span className="font-medium text-gray-800">{d.name}</span>
              </div>
              <div className="flex items-center">
                <button className="text-gray-600 hover:text-gray-900 mr-4"><a href={`${process.env.REACT_APP_LOCALHOST}${d.link}`}>View</a></button>
                <button style={{ background: currentColor }}
                  className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"><a href={`${process.env.REACT_APP_LOCALHOST}${d.link}`} download="file.pdf">Download</a></button>
              </div>
            </div>
          )
        })}


    </div>
  )
}

export default Docs