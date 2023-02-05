import React, { useState,useContext } from 'react'
import noteContext from '../context/notes/noteContext';

function AddNote() {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note,setNote] =useState({title:"", description:"",tag:"default"})
    const handleclick =(e)=>{ 
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"", description:"",tag:""})
    }
    const onChange =(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div className='container my-3'>
    <h2>Add A Note</h2>
    <form  >
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control"minLength={5} required  value ={note.title} id="title" name = "title" aria-describedby="emailHelp" onChange={onChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">description</label>
        <input type="text" className="form-control" minLength={5} required value ={note.description} id="description" name="description"onChange={onChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">tag</label>
        <input type="text" className="form-control" id="tag" value ={note.tag} name="tag"onChange={onChange}/>
      </div>
     
      <button disabled={note.description.length<3 || note.title.length<3} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
    </form>
    </div>
  )
}

export default AddNote