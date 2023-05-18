import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components/ImageGallery"
import { useForm } from "../../hooks/useForm"
import { useSelector } from "react-redux"
import { useMemo } from "react"

export const NoteView = () => {

  const { active: activeNote } = useSelector( state => state.journal );
  const { body, title, date, onInputChange, formState } = useForm( activeNote );

  const dateString = useMemo(() => {
    const newDate = new Date( date );

    return newDate.toUTCString();
  }, [date]);

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
        <Button color="primary" sx={{ padding: 2 }}>
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

      <ImageGallery />
    </Grid>
  )
}