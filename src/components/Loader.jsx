import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'

const Loader = () => {
    const { currentColor } = useStateContext();
    
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status" style={{ borderColor: currentColor }}>
                <span className="visually-hidden">.</span>
            </div>
        </div>
    )
}

export default Loader