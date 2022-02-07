import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import notes from '../assets/data';
import { Link } from 'react-router-dom';
import { ReactComponent  as ArrowLeft} from '../assets/arrow-left.svg';

const NotePage = () => {
  let {noteId} = useParams();
  let navigate = useNavigate();

  let [note, setNote] = useState(null); // to do changes in note

  useEffect(() => {
    if(noteId === 'new') return;
    getNote()
  }, [noteId])

  let getNote = async () => {
    let response = await fetch(`http://localhost:8000/notes/${noteId}`)
    let data = await response.json()
    setNote(data)
  }

  let updateNote = async () => {
    await fetch(`http://localhost:8000/notes/${noteId}`, {
      method:'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({...note, 'updated':new Date()})
    })
  }

  let createNote = async () => {
    await fetch(`http://localhost:8000/notes/`, {
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({...note, 'updated':new Date()})
    })
  }

  let handleSubmit = () => {

    if(noteId !== 'new' && !note.body){
      deleteNote();
    }
    else if(noteId !== 'new'){
      updateNote()
    }
    else if(noteId === 'new' && note !== null){
      createNote();
    }

    navigate('/')
  }

  let deleteNote = async () => {
    await fetch(`http://localhost:8000/notes/${noteId}`, {
      method:'DELETE',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(note)
    })
    navigate('/')
  }

  return <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to ='/'>
            <ArrowLeft onClick={handleSubmit}/>
          </Link>
        </h3>
        {noteId !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}

      </div>
      <textarea onChange={(e) => {setNote({...note, 'body':e.target.value })}} value={note?.body}>

      </textarea>
  </div>;
};

export default NotePage;
