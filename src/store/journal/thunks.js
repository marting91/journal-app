import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { firebaseDB } from '../../firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from './journalSlice';
import { loadNotes } from '../../helpers';

export const startNewNote = () => {
  return async ( dispatch, getState ) => {

    dispatch( savingNewNote() );

    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    }

    const newDoc = doc( collection( firebaseDB, `${ uid }/journal/notes` ) );
    await setDoc( newDoc, newNote );

    newNote.id = newDoc.id;

    dispatch( addNewEmptyNote( newNote ) );
    dispatch( setActiveNote( newNote ) );
    
  }
}

export const startLoadingNotes = () => {
  return async ( dispatch, getState ) => {

    const { uid } = getState().auth;
    if ( !uid ) throw new Error('The user doesn\'t exists');

    const notes = await loadNotes( uid );
    dispatch( setNotes( notes ) );
  }
}

export const startSavingNote = () => {
  return async ( dispatch, getState ) => {

    dispatch( setSaving() );

    const { uid } = getState().auth;
    const { active: activeNote } = getState().journal;

    const noteToSave = { ...activeNote };
    delete noteToSave.id;

    const docRef = doc( firebaseDB, `${ uid }/journal/notes/${ activeNote.id }`);
    await setDoc( docRef, noteToSave,{ merge: true } );

    dispatch( updateNote( activeNote) );
  }
}