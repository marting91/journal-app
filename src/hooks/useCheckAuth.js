import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';

import { login, logout } from '../store/auth';
import { firebaseAuth } from '../firebase/config';

export const useCheckAuth = () => {

  const { status } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  useEffect(() => {

    const unsub = onAuthStateChanged( firebaseAuth, ( user ) => {

      if ( !user ) return dispatch( logout() );
      
        const { uid, email, displayName, photoURL } = user;
        dispatch ( login({ uid, email, displayName, photoURL }) );

      return unsub;
    } );

  }, []);
  
  return status;
}