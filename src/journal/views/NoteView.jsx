import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';

import { ImageGallery } from '../components/ImageGallery';
import { useForm } from '../../hooks/useForm';
import { setActiveNote, startSavingNote, startUploadingFiles } from '../../store/journal';

export const NoteView = () => {

  const dispatch = useDispatch();
  const { active: activeNote, messageSaved, isSaving } = useSelector( state => state.journal );

  const { body, title, date, onInputChange, formState } = useForm( activeNote );

  const fileInputRef = useRef();

  const dateString = useMemo(() => {
    const newDate = new Date( date );

    return newDate.toUTCString();
  }, [date]);

  // Updating the active note with every change
  useEffect(() => {
    dispatch( setActiveNote( formState ) );
  }, [ formState ]);

  useEffect(() => {
    if ( messageSaved.length > 0 ) {
      Swal.fire( 'Note updated', messageSaved, 'success' );
    }
  
  }, [ messageSaved ]);
  

  const onSaveNote = () => {
    dispatch( startSavingNote() );
  }

  const onFileInputChange = ({ target }) => {
    dispatch( startUploadingFiles( target.files ) );
  }

  return (
    <Grid 
      container 
      direction='row' 
      justifyContent='space-between' 
      sx={{ mb: 1 }}
      className='animate__animated animate__fadeIn animate__faster'
    >
      <Grid item>
        <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
      </Grid>
      <Grid item>

        <input 
          type="file"
          multiple
          onChange={ onFileInputChange }
          style={{ display: 'none' }}
          ref={ fileInputRef }
        />

        <IconButton
          color="primary"
          disabled={ isSaving }
          onClick={ () => fileInputRef.current.click() }
        >
          <UploadOutlined />
        </IconButton>

        <Button 
          color="primary"
          sx={{ padding: 2 }}
          onClick={ onSaveNote }
          disabled={ isSaving }
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
          Save
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type='text'
          variant="filled"
          fullWidth
          placeholder="Enter a title"
          label="Title"
          sx={{ border: 'none', mb: 1 }}
          name="title"
          value={ title }
          onChange={ onInputChange }
        />

        <TextField
          type='text'
          variant="filled"
          fullWidth
          multiline
          placeholder="What happened today"
          minRows={ 5 }
          name="body"
          value={ body }
          onChange={ onInputChange }
        />
      </Grid>

      <ImageGallery images={ activeNote.imageUrls }/>
    </Grid>
  )
}