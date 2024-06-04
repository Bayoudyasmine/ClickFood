import { Button, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllRestaurantsAction } from '../State/Restaurant/Action';
import { loginUser } from '../State/Authentification/Action'
const initialValues={
    email:"",
    password:""
}
export const LoginForm = () => {
    const navigate= useNavigate()
    const dispatch=useDispatch()
    const handleSubmit=(values)=>{
        dispatch(loginUser({userData:values,navigate}))
        
            }
  return (
    <div>
        <Typography variant='h5' className='text-center'>
            Login
        </Typography>
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
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
            />
            <Button
                sx={{ mt: 2, padding: "1rem", backgroundColor: "#FFCC00" }}
                className='mt-5'
                fullWidth
                type='submit'
                variant='contained'
            >
                Login
            </Button>

        </Form>
        </Formik>
        <Typography variant='body2' align='center' sx={{mt:3}}>
           T'as déjà un compte ?
            <Button size='small' sx={{ color: "#FFCC00" }} onClick={()=>navigate("/account/register")}>
                S'inscrire
            </Button>
        </Typography>
    </div>
  )
}
