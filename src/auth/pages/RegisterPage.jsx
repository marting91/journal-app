import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmail } from '../../store/auth';

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [ ( value ) => value.includes( '@' ), 'The email must have an @' ],
  password: [ ( value ) => value.length >= 6, 'The password must have at least 6 characters' ],
  displayName: [ ( value ) => value.length >= 1, 'The name is mandatory' ],
}

export const RegisterPage = () => {
  
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector( state => state.auth );
  
  const [formSubmitted, setFormSubmitted] = useState( false );
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status] );

  const {
    email,
    emailValid,
    password,
    passwordValid,
    displayName,
    displayNameValid,
    onInputChange,
    formState,
    isFormValid
  } = useForm( formData, formValidations );

  const onSubmit = ( e ) => {
    e.preventDefault();
    setFormSubmitted( true );
    
    if ( !isFormValid ) return;
    
    dispatch( startCreatingUserWithEmail( formState ) );
  }

  return (
    <AuthLayout title='Register'>
      <form onSubmit={ onSubmit }>
        <Grid container>
          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField
              label="Full Name"
              type="text"
              placeholder='John Doe'
              fullWidth
              name='displayName'
              value={ displayName }
              onChange={ onInputChange }
              error={ !!displayNameValid && formSubmitted }
              helperText={ formSubmitted && displayNameValid }
            />
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={ email }
              onChange={ onInputChange }
              error={ !!emailValid  && formSubmitted }
              helperText={ formSubmitted && emailValid }
            />
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder='Password'
              fullWidth
              name='password'
              value={ password }
              onChange={ onInputChange }
              error={ !!passwordValid  && formSubmitted }
              helperText={ formSubmitted && passwordValid }
            />
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1}}>
            <Grid 
              item
              xs={ 12 }
              display={ !!errorMessage ?  '' : 'none' }
            >
              <Alert severity='error'>{ errorMessage }</Alert>
            </Grid>
            <Grid item xs={ 12 }>
              <Button
                variant='contained'
                fullWidth
                type='submit'
                disabled={ isCheckingAuthentication }
              >
                Create account
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>Already have an account?</Typography>
            <Link component={ RouterLink } color='inherit' to="/auth/login">
              Login
            </Link>
          </Grid>

        </Grid>
      </form>

    </AuthLayout>
  )
}