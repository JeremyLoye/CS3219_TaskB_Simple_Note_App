import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Modal,
  TextField,
  Button
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Edit, Delete, Menu, Add } from '@material-ui/icons';
import { appColors } from '../theme/appColors';
import API from '../utils/axiosUrl';

const useStyles = makeStyles((theme) =>
  createStyles({
    appContainer: {
      width: '100%',
      height: 'fit-content'
    },
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '70vw',
      margin: '0 auto',
      paddingTop: '12vh'
    },
    title: {
      fontWeight: 'bolder',
      color: appColors.white,
      fontSize: '28px',
      textAlign: 'left',
      marginBottom: '2vh'
    },
    noteGridContainer: {
      paddingBottom: 32,
      display: 'flex',
      flexDirection: 'row'
    },
    addButton: {
      color: appColors.darkBrown,
      backgroundColor: appColors.blushWhite,
      padding: '0.5ch',
      marginLeft: '2vh'
    },
    formModal: {
      width: 'fit-content',
      height: 'fit-content',
      margin: '20vh 20vw'
    },
    modalForm: {
      minHeight: '50vh',
      height: 'fit-content',
      width: '50vw',
      backgroundColor: appColors.white,
      color: appColors.black,
      padding: '10%',
      borderRadius: '30px',
      borderStyle: 'none'
    },
    formTitle: {
      fontWeight: 'bolder',
      fontSize: '28px',
      textAlign: 'left',
      marginBottom: '2vh'
    },
    formField: {
      width: '100%',
      backgroundColor: '#F3F3F7',
      borderRadius: '12px 12px 0 0',
      '&:hover:not(:focus)': {
        border: '1.5px solid black',
        boxShadow: '0px 3px rgba(0, 0, 0, 0.25)'
      }
    },
    textField: {
      width: '100%',
      margin: '1.5vh 0',
      textAlign: 'start'
    },
  }),
);

const formModal = (showModal, setShowModal,
  currentNote, setCurrentNote, notes, setNotes, classes, isEdit) => {
  const handleClose = () => {
    setShowModal(false);
    setCurrentNote({
      title: null,
      type: null,
      task: null
    });
  }

  const onChange = (event, field) => {
    setCurrentNote({ ...currentNote, [field]: event.target.value });
  }

  const onSubmit = () => {
    if (isEdit) {
      API.put('/note/update', {
        noteId: currentNote._id,
        note: currentNote
      }).then(res => {
        if (res.data.success) {
          const updatedNote = res.data.note;
          for (let i = 0; i < notes.length; i++) {
            if (notes[i]._id === updatedNote._id) {
              notes[i] = updatedNote;
              break;
            }
          }
          setNotes([...notes]);
        }
      });
    } else {
      API.post('/note/create', { ...currentNote }).then(res => {
        if (res.data.success) {
          notes.push(res.data.note);
          setNotes([...notes]);
        }
      });
    }
    handleClose();
  }

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      className={classes.formModal}
      aria-labelledby="modal-form"
      aria-describedby="edit-note-form"
    >
      <form className={classes.modalForm} onSubmit={onSubmit}>
        <Typography variant={'h4'} className={classes.formTitle}>
          {isEdit ? "Edit Note" : "New Note"}
        </Typography>

        <Grid
          container
          direction="row"
          wrap="wrap"
          spacing={1}
          className={classes.registerGridContainer}
        >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              label="Title"
              required
              variant="outlined"
              className={classes.textField}
              error={currentNote.title === ""}
              value={currentNote.title ? currentNote.title : ""}
              helperText={currentNote.title === "" ? 'Missing Title' : ''}
              onChange={event => onChange(event, 'title')} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              label="Type"
              required
              variant="outlined"
              className={classes.textField}
              error={currentNote.type === ""}
              value={currentNote.type ? currentNote.type : ""}
              helperText={currentNote.type === "" ? 'Missing Type' : ''}
              onChange={event => onChange(event, 'type')} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              label="Task"
              required
              variant="outlined"
              className={classes.textField}
              error={currentNote.task === ""}
              value={currentNote.task ? currentNote.task : ""}
              helperText={currentNote.task === "" ? 'Missing Task' : ''}
              onChange={event => onChange(event, 'task')} />
          </Grid>
        </Grid>
        <Button type="submit">
          {isEdit ? "Update Note" : "Create Note"}
        </Button>
      </form>
    </Modal>
  );
};

const Main = () => {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    title: null,
    type: null,
    task: null
  });

  useEffect(() => {
    API.get('/note/getAll').then(res => {
      if (res.data.success) {
        setNotes(res.data.allNotes);
      }
    })
  }, []
  );

  const onEdit = (note) => {
    setCurrentNote(note);
    setIsEdit(true);
    setShowModal(true);
  }

  const onDelete = (_id, index) => {
    API.delete(`/note/delete/${_id}`).then(res => {
      if (res.data.success) {
        notes.splice(index, 1);
        setNotes([...notes]);
      }
    })
  }

  const classes = useStyles();

  return (
    <Box>
      <AppBar>
        <Toolbar style={{ backgroundColor: `${appColors.blushWhite}`, color: `${appColors.black}` }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">
            Notes
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className={classes.appContainer}>
        <Box className={classes.mainContainer}>
          {formModal(showModal, setShowModal,
            currentNote, setCurrentNote, notes, setNotes, classes, isEdit)}
          <Typography variant={'h4'} className={classes.title}>Note List
          <IconButton
              className={classes.addButton}
              onClick={() => { setShowModal(true); setIsEdit(false); }}>
              <Add style={{ fontSize: 25 }} />
            </IconButton>
          </Typography>
          <Grid
            container
            direction="row"
            wrap="wrap"
            spacing={1}
            className={classes.noteGridContainer}
          >
            {notes.map((note, index) =>
              <Grid item key={index} xs={12} s={12} md={4} lg={3}>
                <Card>
                  <Box style={{ overflowY: 'auto', height: '25vh' }}>
                    <CardHeader
                      title={note.title}
                      subheader={note.type}
                    />
                    <CardContent>
                      <Typography variant="body2" component="p">
                        {note.task}
                      </Typography>
                    </CardContent>
                  </Box>
                  <CardActions style={{ justifyContent: 'flex-end' }}>
                    <IconButton aria-label="edit" onClick={() => onEdit(note)}>
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => onDelete(note._id, index)}>
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Main;