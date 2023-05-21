import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({

  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
    // active: {
    //   id: 'ABC123',
    //   title: 'My Journal',
    //   body: 'body',
    //   date: 1231543,
    //   imageUrls: [], // [https://picture1.jpg, https://picture1.jpg, https://picture1.jpg]  
    // }
  },
  reducers: {
    savingNewNote : ( state ) => {
      state.isSaving = true;
    },
    addNewEmptyNote: ( state, action ) => {
      state.notes.push( action.payload );
      state.isSaving = false;
    },
    setActiveNote: ( state, action ) => {
      state.active = action.payload;
      state.messageSaved = '';
    },
    setNotes: ( state, action ) => {
      state.notes = action.payload;
    },
    setSaving: ( state ) => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    updateNote: ( state, action ) => {
      state.isSaving = false;
      const notes = state.notes.map( note => {
        if ( note.id === action.payload.id ) {
          return action.payload
        }
        return note;
      });
      state.notes = notes;
      state.messageSaved = `${ action.payload.title }, updated correctly`;
    },
    clearNotesLogout: ( state ) => {
      state.notes = [];
      state.isSaving = false;
      state.messageSaved = '';
      state.active = null;
    },
    deleteNoteById: ( state, action ) => {
      state.active = null;
      state.notes = state.notes.filter( note => note.id !== action.payload );
    },
    setPhotosToActiveNote: ( state, action ) => {
      state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    }
  }

});

export const { 
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
  savingNewNote,
  setPhotosToActiveNote,
  clearNotesLogout,
} = journalSlice.actions;