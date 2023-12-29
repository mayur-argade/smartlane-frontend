import React from 'react'
import './Home1.css'

const Navbar = () => {
    return (
        <nav className='w-full fixed top-0'>
            <div className='mx-5 py-3 flex justify-between'>
                <div>
                    <img src='' className='h-12' alt="" />
                </div>
                <div className='flex align-middle items-center'>
                    <div className='hidden md:flex text-white space-x-10'>
                        <span className='font-semibold text-md'>Investing with SEIS</span>
                        <span className='font-semibold text-md'>Pitch Deck</span>
                    </div>
                    <div className="ml-32 menu">
                        <img src='' className='h-8' alt="" />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar