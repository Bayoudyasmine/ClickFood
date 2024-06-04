import React from 'react';
import { Button, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../State/Authentification/Action';
import { useDispatch } from 'react-redux';

const initialValues = {
    fullName: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER"
};

export default function RegisterForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        console.log("form values", values);
        dispatch(registerUser({ userData: values, navigate }));
    };

    return (
        <div>
            <Typography variant='h5' className='text-center'>
                Inscription
            </Typography>
            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                <Form>
                    <Field
                        as={TextField}
                        name="fullName"
                        label="Nom et Prénom"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <Field
                        as={TextField}
                        name="email"
                        label="Email"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <Field
                        as={TextField}
                        name="password"
                        label="Mot de passe"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        type="password"
                    />
                    <FormControl fullWidth margin="normal">
                        <Field
                            as={Select}
                            labelId="role-simple-select-label"
                            id="role-simple-select"
                            label="Role"
                            name="role"
                        >
                            <MenuItem value={"ROLE_CUSTOMER"}>Client</MenuItem>
                            <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurateur</MenuItem>
                        </Field>
                    </FormControl>
                    <Button
                        sx={{
                            mt: 2,
                            padding: "1rem",
                            backgroundColor: "#ffcc00",
                            '&:hover': {
                                backgroundColor: "#ffcc00",
                            }
                        }}
                        className='mt-5'
                        fullWidth
                        type='submit'
                        variant='contained'
                    >
                        Register
                    </Button>
                </Form>
            </Formik>
            <Typography variant='body2' align='center' sx={{ mt: 3 }}>
                T'as déjà un compte !?
                <Button
                    size='small'
                    onClick={() => navigate("/account/login")}
                    sx={{
                        color: "#ffcc00"
                    }}
                >
                    Login
                </Button>
            </Typography>
        </div>
    );
}
