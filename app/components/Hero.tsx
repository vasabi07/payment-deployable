import React from 'react'

const Hero = () => {
  return (
    <div className=' flex pt-32'>
        <div className='flex flex-col flex-1 justify-center items-center  '>
            <span className='text-green-900 text-5xl pl-10'>Send and Recieve money with your friends Fast, Easy and Secure.</span>
            <span className='text-stone-900 mt-2 text-xl pl-10'>
          Experience the future of transactions! Our peer-to-peer wallet allows you to transfer funds instantly, without the hassle of traditional banking. Join us today and take control of your money!
        </span>
        </div>
        <div className='flex flex-1 justify-center items-center'>
            <img src="https://i.pinimg.com/564x/94/81/dc/9481dc54cf0484575744a3a5008ed691.jpg" alt="hero image"  />
        </div>
    </div>
  )
}

export default Hero