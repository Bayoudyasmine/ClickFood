import { Card } from '@mui/material'
import React from 'react'

export const CardAddress = ({ item }) => {
  return (
    <div>
      <Card className='flex gap-5 w-64 p-5'>
        <div className='space-y-3 text-gray-500'>
          <h1 className='font-semibold text-lg text-white'>{item.deliveryAddress?.city}</h1>
          <p>{item.deliveryAddress?.state}</p>
          <p>{item.deliveryAddress?.streetAddress}</p>
          <p>{item.deliveryAddress?.postalCode}</p>
        </div>
      </Card>
    </div>
  )
}
