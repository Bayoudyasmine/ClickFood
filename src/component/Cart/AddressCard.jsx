import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Button,Card } from '@mui/material';
import { createOrder } from '../State/Order/Action';
import { useDispatch, useSelector } from 'react-redux';


export const AddressCard = ({item, showButton,handleSelectAddress }) => {
  const {cart,auth,order}=useSelector(store=>store)
  const dispatch=useDispatch();
  const handleSubmit = (item) => {
    const data = {
        jwt: localStorage.getItem("jwt"),
        order: {
            restaurantId: cart.cart?.item[0].food.restaurant.id,
            deliveryAddress: {
                fullName: auth.user?.fullName,
                streetAddress: item.deliveryAddress.streetAddress,
                city: item.deliveryAddress.city,
                state: item.deliveryAddress.state,
                postalCode: item.deliveryAddress.postalCode,
                Country: "Morocco"
            }
        }
    };
    dispatch(createOrder(data));
    console.log("Selected address data:", data);
};
    
  return (
    <Card className='flex gap-5 w-64 p-5'>
        <HomeIcon/>
        <div className='space-y-3 text-gray-500'>
            <h1 className='font-semibold text-lg text-white'>{item.deliveryAddress.city}</h1>
            <p >{item.deliveryAddress.state}</p>
            <p>{item.deliveryAddress.streetAddress}</p>
            <p>{item.deliveryAddress.postalCode}</p>
            {showButton && (
             <Button variant='outlined' fullWidth onClick={() => handleSubmit(item)}>select</Button>
            )}
        </div>
    </Card>
  )
}

export default AddressCard
