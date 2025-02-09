import React from 'react'
import SecureAuthentication from "../assets/secure-authentication.jpg"
import QuickProcessing from "../assets/quick-processing.jpg"
import DataPrivacy from "../assets/data-privacy.jpg"
import UserFriendlyInterface from "../assets/user-friendly-interface.jpg"

const About = () => {
    return (
        <div className='bg-[#f6f6f7] w-full pb-12 text-[#3653A2]'>
            <h1 className='text-5xl font-bold flex justify-center text-center mt-10'>Our Features</h1>
            <div className='features max-w-6xl flex justify-center mx-auto gap-12 flex-wrap mt-10'>
                <div className="flex flex-col w-96 rounded-2xl gap-1.5 shadow-md p-6">
                    <img className='h-40 object-fill' src={SecureAuthentication} alt="secure authentication image" />
                    <h1 className='font-bold text-2xl'>Secure Authentication</h1>
                    <p>Utilizes cutting-edge facial recognition technology to verify student identities</p>
                </div>
                <div className="flex flex-col w-96 rounded-2xl gap-1.5 shadow-md p-6">
                    <img className='h-40 object-fill' src={QuickProcessing} alt="quick processing image" />
                    <h1 className='font-bold text-2xl'>Quick Processing</h1>
                    <p> Reduces waiting times with fast and efficient authentication.</p>
                </div>
                <div className="flex flex-col w-96 rounded-2xl gap-1.5 shadow-md p-6">
                    <img className='h-40 object-fill' src={DataPrivacy} alt="data privacy image" />
                    <h1 className='font-bold text-2xl'>Data Privacy</h1>
                    <p>Complies with data protection regulations to secure student information.</p>
                </div>
                <div className="flex flex-col w-96 rounded-2xl gap-1.5 shadow-md p-6">
                    <img className='h-40 object-fill' src={UserFriendlyInterface} alt="user friendly interface image" />
                    <h1 className='font-bold text-2xl'>User-Friendly Interface</h1>
                    <p>Easy to use for both students and examination staff.</p>
                </div>
            </div>
        </div>
    )
}

export default About