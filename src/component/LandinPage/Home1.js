import React from 'react'
import Navbar from './Navbar'
import Card from './Card'
import './Home1.css'

const Home1 = () => {
    return (
        <>
            <div className=" relative full screen-bg bg-black">
             <Navbar/>
                <img src="http://localhost:3000/static/media/BackgroundHome.f472c350592fbeb2ea78.png" alt="Background Image" className="h-screen w-full" />
                <div className="absolute inset-20 flex justify-center text-white ">
                    <div className=''>
                        <h1 className="text-left text-5xl font-bold mb-4">
                            Become a
                            <span className='mx-2 text-[#B9B2DC]'>
                                propeller
                            </span>
                            today.
                        </h1>
                        <h2 className="text-3xl font-light">
                            Stay up to date with our latest product and investment news.
                        </h2>
                        <Card />

                        <div className='flex justify-center mt-6'>
                            <div className='flex flex-col justify-center'>
                                <span className='ml-0 text-center text-sm font-semibold'>Learn More</span>
                                <img className='mt-3 h-4' src="htmlFor" alt="" />
                            </div>

                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Home1