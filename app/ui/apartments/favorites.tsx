import React from 'react'

import ApartmentCards from '../../ui/apartments/apartmentCards';
const favorites = () => {
  return (
    <div>
        <h1>Избранные квартиры</h1>
        <ApartmentCards name="Cozy Apartment" location="123 Main St" city="New York" price="$1500/month" />

    </div>
  )
}

export default favorites