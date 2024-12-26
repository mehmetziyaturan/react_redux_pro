import React from 'react'

const Input = ( {value, placeholder,type, id, name,  onChange}, ) => {
  return (
    <div>
      <input value={value} className='h-10 w-full border rounded-md p-2 outline-none mt-3'
      type={type} onChange={onChange} id={id} placeholder={placeholder} name={name}/>
    </div>
  )
}

export default Input
