import { authSlice, checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { authenticatedState, demoUser, initialState } from '../../fixtures/authFixtures';

describe('Tests in authSlice', () => {

  test('Should return initial state with value "auth"', () => {

    const state = authSlice.reducer( initialState, {} );

    expect( authSlice.name ).toBe( 'auth' );
    expect( state ).toEqual( initialState );
  });

  test('Should authenticate', () => {

    const state = authSlice.reducer( initialState, login( demoUser ) );

    expect( state ).toEqual({
      status: 'authenticated',
      uid: 'ABC123',
      email: 'correo@google.com',
      displayName: 'Demo User',
      photoURL: 'https://demo.jpg',
      errorMessage: null
    });
  });

  test('Should logout without errors', () => {

    const state = authSlice.reducer( authenticatedState, logout() );

    expect( state ).toEqual({
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined
    });
  });

  test('Should logout with error message', () => {

    const errorMessage = 'Wrong credentials';

    const state = authSlice.reducer( authenticatedState, logout({ errorMessage }) );

    expect( state ).toEqual({
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: errorMessage
    });
  });

  test('Should change state to checking', () => {

    const state = authSlice.reducer( authenticatedState, checkingCredentials() );

    expect( state.status ).toBe( 'checking' );
  })
});