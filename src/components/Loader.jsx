import React from 'react'
import logo from "../assets/logo.svg"

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-100 z-50 !m-0">
            <div className="relative w-40 h-20 flex items-end justify-center">
                <img className='animate-ping' src={logo} alt="Facial Pass Logo" />
            </div>
        </div>
    )
}

export default Loader;