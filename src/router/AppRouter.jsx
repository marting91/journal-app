import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { CheckingAuth } from '../ui';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../firebase/config';
import { login } from '../store/auth';

export const AppRouter = () => {

  const { status } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged( firebaseAuth, async ( user ) => {

      if ( !user ) return dispatch( logout() );

      const { uid, email, displayName, photoURL } = user;
      dispatch ( login({ uid, email, displayName, photoURL }) );
    } );

  }, []);
  

  if ( status === 'checking' ) {
    return <CheckingAuth />
  }

  return (
    <Routes>

      {
        ( status === 'authenticated' )
        ? <Route path='/*' element={ <JournalRoutes />} />
        : <Route path='/auth/*' element={ <AuthRoutes />} />
      }

      <Route path='/*' element={ <Navigate to='/auth/login' /> } />

      {/* Login and Register */}
      {/* <Route path='/auth/*' element={ <AuthRoutes />} /> */}

      {/* Journal App */}
      {/* <Route path='/*' element={ <JournalRoutes />} /> */}
    </Routes>
  )
}