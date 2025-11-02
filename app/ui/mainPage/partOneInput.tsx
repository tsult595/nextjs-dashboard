import React from 'react'

const PartOneInput = () => {
  return (
    <div className='w-[50%] h-12 bg-white rounded-lg shadow-md flex items-center justify-between px-4'>
      <input
        type="text"
        placeholder="Search for apartments, condos, and houses"
        className='flex-1 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <input
        type="date"
        placeholder="Search for apartments, condos, and houses`"
        className='flex-1 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <input
        type="date"
        placeholder="Check Out"
        className='flex-1 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <button className='ml-4 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700'>
        Search
      </button>
    </div>
  )
}

export default PartOneInput;