import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { firebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup( firebaseAuth, googleProvider );
    // const credentials = GoogleAuthProvider.credentialFromResult( result );
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  } catch ( error ) {

    return {
      ok: false,
      errorCode: error.code,
      errorMessage: error.message
    }
  }
}

export const registerUserWithEmail = async ({ email, password, displayName }) => {
  try {
    
    const resp = await createUserWithEmailAndPassword( firebaseAuth, email, password );
    const { uid, photoURL } = resp.user;
    
    // Updating displayName in Firebase
    await updateProfile( firebaseAuth.currentUser, { displayName } );

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
      email
    }


  } catch ( error ) {
    return {
      ok: false,
      errorMessage: error.message
    }
  }
}

export const loginWithEmail = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword( firebaseAuth, email, password );
    const { uid, photoURL, displayName } = resp.user;

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName
    }
  } catch ( error ) {
    return {
      ok: false,
      errorMessage: error.message
    }
  }
}