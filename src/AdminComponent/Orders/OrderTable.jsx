import { Avatar, AvatarGroup, Box, Button, Card, CardHeader, Chip, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantsOrder, updateOrderStatus } from '../../component/State/Restaurant Order/Action';

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
];

const OrderTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, restaurantOrder } = useSelector(store => store);

  const [anchorEls, setAnchorEls] = useState({});

  useEffect(() => {
    if (restaurant?.usersRestaurant?.id) {
      dispatch(fetchRestaurantsOrder({ jwt, restaurantId: restaurant.usersRestaurant.id }));
    }
  }, [dispatch, jwt, restaurant]);

  const handleClick = (event, orderId) => {
    setAnchorEls(prevState => ({
      ...prevState,
      [orderId]: event.currentTarget,
    }));
  };

  const handleClose = (orderId) => {
    setAnchorEls(prevState => ({
      ...prevState,
      [orderId]: null,
    }));
  };

  const handleUpdateOrder = (orderId, orderStatus) => {
    dispatch(updateOrderStatus({ orderId, orderStatus, jwt }));
    handleClose(orderId);
  };

  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader
          title={"All Orders"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">image</TableCell>
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">price</TableCell>
                <TableCell align="right">name</TableCell>
                <TableCell align="right">ingredients</TableCell>
                <TableCell align="right">status</TableCell>
                <TableCell align="right">update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder.orders.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="right">
                    <AvatarGroup>
                      {item.items.map((orderItem) => (
                        <Avatar key={orderItem.food.id} src={orderItem.food?.images[0]} />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="right">{item.customer?.fullName}</TableCell>
                  <TableCell align="right">{item.totalPrice}dh</TableCell>
                  <TableCell align="right">
                    {item.items.map((orderItem) => <p key={orderItem.food.id}>{orderItem.food?.name}</p>)}
                  </TableCell>
                  <TableCell align="right">{item.items.map((orderItem) =>
                    <div key={orderItem.food.id}>
                      {orderItem.ingredients.map((ingredient, index) => <Chip key={index} label={ingredient} />)}
                    </div>
                  )}</TableCell>
                  <TableCell align="right">{item.orderStatus}</TableCell>
                  <TableCell align='right'>
                    <Button
                      id={`basic-button-${item.id}`}
                      aria-controls={anchorEls[item.id] ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={anchorEls[item.id] ? 'true' : undefined}
                      onClick={(event) => handleClick(event, item.id)}
                    >
                      update
                    </Button>
                    <Menu
                      id={`basic-menu-${item.id}`}
                      anchorEl={anchorEls[item.id]}
                      open={Boolean(anchorEls[item.id])}
                      onClose={() => handleClose(item.id)}
                      MenuListProps={{
                        'aria-labelledby': `basic-button-${item.id}`,
                      }}
                    >
                      {orderStatus.map((status) => (
                        <MenuItem key={status.value} onClick={() => handleUpdateOrder(item.id, status.value)}>
                          {status.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}

export default OrderTable;
