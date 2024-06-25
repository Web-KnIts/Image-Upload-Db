import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className='w-full bg-zinc-900'>
        <div className=' w-[50%] h-[80px] flex justify-between items-center m-auto'>
        <h1 className='text-white font-mono text-[25px]'><Link to='/' className='w-full'>Upload Image in MongoDb</Link></h1>
    </div>
    </div>
  )
}

export default Header