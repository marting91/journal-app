import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmail } from '../../store/auth';

export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth );
  
  const { email, password, onInputChange } = useForm({
    email: '',
    password: ''
  });

  const isAuthenticating = useMemo( () => status === 'checking', [status] );

  const dispatch = useDispatch();

  const onSubmit = ( e ) => {
    e.preventDefault();

    dispatch( startLoginWithEmail({ email, password }) );
  }

  const onGoogleSignIn = () => {

    dispatch( startGoogleSignIn() );
  }
  
  return (
    <AuthLayout title='Login'>

      <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={ email }
              onChange={ onInputChange }
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
            <Grid item xs={ 12 } sm ={ 6 }>
              <Button 
                type='submit'
                variant='contained'
                fullWidth
                disabled={ isAuthenticating }
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={ 12 } sm ={ 6 }>
              <Button 
                variant='contained' 
                fullWidth
                onClick={ onGoogleSignIn }
                disabled={ isAuthenticating }
              >
                <Google />
                <Typography sx={{ ml: 1}}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={ RouterLink } color='inherit' to="/auth/register">
              Create account
            </Link>
          </Grid>

        </Grid>
      </form>

    </AuthLayout>
  )
}