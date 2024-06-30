import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-violet-900 text-white py-2'>
      <div className="logo">
        <span className='font-bold text-xl mx-9'>iTask</span>
      </div>
      <ul className='flex gap-5 mx-9'>
        <li className='cursor-pointer hover:font-bold transition-all duration-[0.3s]'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all duration-[0.3s]'>Your Task</li>
      </ul>
    </nav>
  )
}

export default Navbar