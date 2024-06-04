import React from 'react';
import CartItem from './CartItem';
import Divider from '@mui/material/Divider';
import AddressCard from './AddressCard';
import { Box, Button, Card, Grid, Modal, TextField } from '@mui/material';
import { AddLocation, ContentCopyRounded } from '@mui/icons-material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, getUsersOrders } from '../State/Order/Action';

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline: 'none',
    boxShadow: 24,
    p: 4,
};

const initialValues = {
    streetAddress: "",
    state: "",
    pincode: "",
    city: ""
};

// const validationSchema = Yup.object().shape({
//     streetAddress: Yup.string().required("Street address is required"),
//     state: Yup.string().required("State is required"),
//     pincode: Yup.string().required("Pincode is required"),
//     city: Yup.string().required("City is required")
// });

export const Cart = () => {
    const createOrderUsingSelectedAddress = () => {};
    const handleOpenAddressModal = () => setOpen(true);
    const [open, setOpen] = React.useState(false);
    const { cart, auth, order } = useSelector(store => store);
    const dispatch = useDispatch();

    const handleClose = () => setOpen(false);
    const handleSubmit = (values) => {
        const data = {
            jwt: localStorage.getItem("jwt"),
            order: {
                restaurantId: cart.cart?.item[0].food.restaurant.id,
                deliveryAddress: {
                    fullName: auth.user?.fullName,
                    streetAddress: values.streetAddress,
                    city: values.city,
                    state: values.state,
                    postalCode: values.pincode,
                    Country: "Maroc"
                }
            }
        };
        dispatch(createOrder(data));

        console.log("form values:", values);
    };

    return (
        <>
            <main className='lg:flex justify-between'>
                <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
                    {cart.cartItems?.map((item) => (
                        <CartItem item={item} />
                    ))}
                    <Divider />
                    <div className='billDetails px-5 text-sm'>
                        <p className='font-extralight py-5'>Détails de la facture</p>
                        <div className='space-y-3'>
                            <div className='flex justify-between text-gray-400'>
                                <p>Total des articles</p>
                                <p>{cart.cart?.total} MAD</p>
                            </div>
                            <div className='flex justify-between text-gray-400'>
                                <p>Frais de livraison</p>
                                <p>21 MAD</p>
                            </div>
                            <div className='flex justify-between text-gray-400'>
                                <p>Frais de restaurant</p>
                                <p>33 MAD</p>
                            </div>
                            <Divider />
                        </div>
                        <div className='flex justify-between text-gray-400'>
                            <p>Total à payer</p>
                            <p>{cart.cart?.total + 33 + 21} MAD</p>
                        </div>
                    </div>
                </section>
                <Divider orientation='vertical' flexItem />
                <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
                    <div>
                        <h1 className='text-center font-semibold text-2xl py-10'>Choisissez l'adresse de livraison</h1>
                        <div className='flex gap-5 flex-wrap justify-center'>
                            {order.orders.map((item, index) => (
                                <AddressCard key={index} handleSelectAddress={createOrderUsingSelectedAddress} item={item} showButton={true} />
                            ))}
                            <Card className='flex gap-5 w-64 p-5'>
                                <AddLocation />
                                <div className='space-y-3 text-gray-500'>
                                    <h1 className='font-semibold text-lg text-white'>Ajouter une nouvelle adresse</h1>
                                    <Button variant='outlined' fullWidth onClick={handleOpenAddressModal}>Ajouter</Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="streetAddress"
                                        label="Adresse"
                                        fullWidth
                                        variant="outlined"
                                        // error={!ErrorMessage("streetAddress")}
                                        // helperText={
                                        //     <ErrorMessage>
                                        //         {(msg) => <span className='text-red-600'>{msg}</span>}
                                        //     </ErrorMessage>
                                        // }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="state"
                                        label="Région"
                                        fullWidth
                                        variant="outlined"
                                        // error={!ErrorMessage("streetAddress")}
                                        // helperText={
                                        //     <ErrorMessage>
                                        //         {(msg) => <span className='text-red-600'>{msg}</span>}
                                        //     </ErrorMessage>
                                        // }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="city"
                                        label="Ville"
                                        fullWidth
                                        variant="outlined"
                                        // error={!ErrorMessage("streetAddress")}
                                        // helperText={
                                        //     <ErrorMessage>
                                        //         {(msg) => <span className='text-red-600'>{msg}</span>}
                                        //     </ErrorMessage>
                                        // }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="pincode"
                                        label="Code postal"
                                        fullWidth
                                        variant="outlined"
                                        // error={!ErrorMessage("streetAddress")}
                                        // helperText={
                                        //     <ErrorMessage>
                                        //         {(msg) => <span className='text-red-600'>{msg}</span>}
                                        //     </ErrorMessage>
                                        // }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button fullWidth variant='contained' type='submit' color='primary'>Livrer ici</Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </Box>
            </Modal>
        </>
    );
};

export default Cart;
