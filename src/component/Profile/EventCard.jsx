import {Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

export const EventCard = ({item}) => {
  return (
    <div>
        <Card sx={{width:300}}>
        <CardMedia
          sx={{ height: 345,
            '&:hover': {
              transform: 'scale(1.1)', // Example: Scale the image on hover
              transition: 'transform 0.5s ease-in-out', // Example: Apply a smooth transition effect
            },
           }}
          image={item.image}
          title="green iguana"
        />

            <CardContent>
                <Typography variant='h5'>
                    {item.name}
                </Typography>
                <Typography variant='body2'>
                {item.restaurant.name}
                </Typography>
                <div className='py-2 space-x-2'>
                <p>{"mumbai"}</p>
                <p className='text-sm text-blue-500'> {item.startedAt}</p>
                <p className='text-sm text-red-500'> {item.endsAt}</p>


                </div>
            </CardContent>
            {true && <CardActions>
                
            </CardActions>
                
            }

        </Card>
    </div>
  )
}
