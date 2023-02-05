import React, { useContext } from 'react'

import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const { note,updatenote } = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;
    return (
        <div className='col-md-3'>
            <div className="card my-3 ">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}.</p>
                    <i className="fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="fa-regular fa-pen-to-square " onClick={()=>{updatenote(note)}}></i>         
                </div>
            </div>
        </div>
    )
}
export default Noteitem