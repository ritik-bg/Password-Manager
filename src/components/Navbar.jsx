import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between container w-full h-10 bg-green-950 text-gray-300'>
      <div className="logo text-2xl font-bold">

        <span className='text-gray-600'>&lt;Pass</span>
        <span className='text-gray-300' >World/&gt;</span>
      </div>
      <ul className='flex gap-x-10 px-4  items-center '>
        <li className='hover:font-bold hover:z-50 '>Home</li>
        <li className='hover:font-bold hover:z-50'>Contact us</li>
        <li className='hover:font-bold hover:z-50'>Help</li>

      </ul>
    </div>
  )
}

export default Navbar
