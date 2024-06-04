import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CardAddress } from './CardAddress'
import { getUsersOrders } from '../State/Order/Action'

export const Address = () => {
  const { order, auth } = useSelector(store => store)
  const jwt = localStorage.getItem("jwt")
  const dispatch = useDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(getUsersOrders(jwt));
    }
  }, [auth.jwt, dispatch, jwt]);

  return (
    <div className='px-5 py-10'>
      <h1 className='text-xl text-center py-7 font-semibold'>My Addresses</h1>
      <div className='flex gap-5 flex-wrap justify-center'>
        {
          order.orders.map((item, index) => (
            <CardAddress key={index} item={item} />
          ))
        }
      </div>
    </div>
  )
}
