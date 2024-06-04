import React from 'react'
import { EventCard } from './EventCard'
import { useSelector } from 'react-redux';

export const Events = () => {
  const { restaurant  } = useSelector(store => store); 
  return (
<div className='flex flex-wrap gap-5 justify-center'>

    {restaurant.events.map((item)=><EventCard item={item}/>)}
  

    </div>
  )
}
