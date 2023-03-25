import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { Header, Loader } from '../components'
import { useStateContext } from '../contexts/ContextProvider'

const Login = () => {
    const [email, setEmail] = useState('user1@doner.com')
    const [password, setPassword] = useState('12345678')
    const alert = useAlert()
    let navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    const { currentColor } = useStateContext()
    const handleLogin = async (e) => {

        e.preventDefault()
        setLoading(true)
        try {

            //here do the api call
            const { data, headers } = await axios.post(`${process.env.REACT_APP_LOCALHOST}/user/sign-in`, {
                email, password
            })

            console.log("data is ", data)


            //setting info in localstorage
            localStorage.setItem("access-token-fyp", headers['auth-token'])
            localStorage.setItem("user-data", JSON.stringify(data))

            navigate("/dashboard")

        } catch (error) {
            alert.error(error?.response?.data?.message)
            console.log("error---", error)
        } finally {
            setLoading(false)

        }

    }

    useEffect(() => {


        const authToken = localStorage.getItem('access-token-fyp')

        if (authToken) {
            console.log("entered is Authenticated")

            navigate('/dashboard')

        }
    }, [])


    return (
        loading ? <Loader /> :
            <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
                <Header category="Login" title="please login" />
                <section className="h-screen">
                    <div className="container px-6 py-12 h-full">
                        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                    className="w-full"
                                    alt="Phone image"
                                />
                            </div>
                            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                                <form onSubmit={handleLogin}>
                                    <div className="mb-6">
                                        <input
                                            type="email"
                                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder="Email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <input
                                            type="password"
                                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder="Password"
                                            minLength={5}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />

                                    </div>

                                    

                                    <button
                                        type="submit"
                                        className="inline-block px-7 py-3  text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                        style={{ background: currentColor }}

                                    >
                                        Sign in
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
    )
}

export default Login