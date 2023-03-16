import React from 'react'

const Header = ({ category, title }) => {
  return (
    <div className='mb-10 mt-12 sm:mt-0'>
      <p className='text-gray-400'>{category}</p>
      <p className='text-3xl font-extrabold tracking-light text-slate-900'>{title}</p>
    </div>
  )
}

export default Header