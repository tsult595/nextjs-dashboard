import React from 'react'
import cards from '../dashboard/cards'

const Cards = ({title , value} : {title: string, value: string}) => {
  return (
    <div>
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{value}</p>
        </div>
    </div>
  )
}

export default Cards