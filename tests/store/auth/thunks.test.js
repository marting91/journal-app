import { loginWithEmail, logoutFirebase, signInWithGoogle } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmail, startLogout } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock( '../../../src/firebase/providers', () => ({
  ...jest.requireActual( '../../../src/firebase/providers' ),
  signInWithGoogle: jest.fn(),
  loginWithEmail: jest.fn(),
  logoutFirebase: jest.fn(),
}) );

describe('Tests in authThunks', () => {
  
  const dispatch = jest.fn();

  beforeEach( () => jest.clearAllMocks() );
  test('Should invoke checkingCredentials', async () => {
    
    await checkingAuthentication()( dispatch );
    expect( dispatch ).toBeCalledWith( checkingCredentials() );
  });
  
  test('startGoogleSignIn must call checkingCredentials and login', async () => {

    const loginData = { ok: true, ...demoUser };
    await signInWithGoogle.mockResolvedValue( loginData );

    // thunk
    await startGoogleSignIn()( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
  });

  test('startGoogleSignIn must call checkingCredentials and logout with error message', async () => {

    const loginData = { ok: false, errorMessage: 'Google error' };
    await signInWithGoogle.mockResolvedValue( loginData );

    // thunk
    await startGoogleSignIn()( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( logout({ errorMessage: loginData.errorMessage }) );
  });

  test('startLoginWithEmail must call checkingCredentials and login', async () => {

    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: '123456'};

    // thunk
    await loginWithEmail.mockResolvedValue( loginData );

    await startLoginWithEmail( formData )( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( login( demoUser ) );
  });

  test('startLogout must call logoutFirebase, clearNotes and logout', async () => {

    await startLogout()( dispatch );

    expect( logoutFirebase ).toHaveBeenCalled();
    expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
    expect( dispatch ).toHaveBeenCalledWith( logout() );
  });
});