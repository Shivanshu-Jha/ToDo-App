import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-slate-950 text-[gold] py-2'>
        <div className="logo">
            <span className='font-bold text-2xl mx-9'>sTask</span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
