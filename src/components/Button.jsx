import React from 'react'

const Button = ({onClick, btnText}) => {
  return (
    <div>
      
      <button className='w-full h-10 bg-indigo-600 text-white flex items-center justify-center mt-5 rounded-md border-transparent'
       onClick={onClick}>{btnText}</button>
    </div>
  )
}

export default Button
