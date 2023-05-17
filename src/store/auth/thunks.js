import { loginWithEmail, logoutFirebase, registerUserWithEmail, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = ( email, password ) => {
  return async ( dispatch ) => {
    dispatch( checkingCredentials() );
  }
}

export const startGoogleSignIn = () => {
  return async ( dispatch ) => {
    dispatch( checkingCredentials() );
    const result = await signInWithGoogle();

    if ( !result.ok ) return dispatch( logout({ errorMessage: result.errorMessage }) );

    dispatch( login( result ) );
  }
}

export const startCreatingUserWithEmail = ({ email, password, displayName }) => {
  return async ( dispatch ) => {
    dispatch( checkingCredentials() );
    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmail({ email, password, displayName });

    if ( !ok ) return dispatch( logout({ errorMessage }) );

    dispatch( login({ uid, displayName, email, photoURL }) );
  }
}

export const startLoginWithEmail = ({ email, password }) => {
  return async ( dispatch ) => {
    dispatch( checkingCredentials() );

    const { ok, uid, photoURL, errorMessage, displayName } = await loginWithEmail({ email, password });

    if ( !ok ) return dispatch( logout({ errorMessage }) );
    
    dispatch( login({ uid, email, displayName, photoURL }) );
  }
}

export const startLogout = () => {
  return async ( dispatch ) => {
    await logoutFirebase();

    dispatch( logout() );
  }
}