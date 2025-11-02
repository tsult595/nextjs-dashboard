import React from 'react'
import PartOneInput from './partOneInput';
const partOne = () => {
  return (
    <div className='w-full h-96 bg-orange-500 rounded-lg shadow-md flex items-center justify-evenly flex-col'>
      <h1 className='text-2xl font-bold'>Find your next home</h1>
      <h3 className='text-lg'>Search for apartments, condos, and houses</h3>
      <PartOneInput />
    </div>
  )
}

export default partOne