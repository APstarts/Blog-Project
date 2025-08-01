import React from 'react'
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className='dark:text-white'>
      <div className='flex justify-end gap-2 py-2 mr-2'>
        <Link to="/login"><button type='button' className='bg-blue-800 hover:bg-blue-500 cursor-pointer w-20 py-2 text-white rounded-md'>Login</button></Link>
        <Link to="/register"><button type='button' className='bg-blue-800 hover:bg-blue-500 cursor-pointer w-20 py-2 text-white rounded-md'>Register</button></Link>
      </div>
      <div className='flex flex-col items-center justify-center pt-20'>
        <div className='Banner text-5xl text-center w-3xl'> Welcome to the <span className='text-amber-700'>network of professionals</span> <span className='text-blue-600'>who love coding</span> and want to do something out of it!</div>
        <div className='grid grid-cols-2'>
          <div className='flex items-center text-3xl py-10 px-10 text-blue-500 dark:text-white'>"Connect with people who are not from coding background to know how they learned to code and use it in their daily routine work to acheive greater productivity or unlock new ways of getting things done!"</div>
          <div className='flex items-center text-3xl py-10 px-10 text-blue-500 dark:text-white'>"The platform that provides the opportunity to showcase your skills instead of flaunting the qualification degrees!"</div>
        </div>
      </div>
    </div>
  )
}

export default Landing;