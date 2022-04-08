import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const {note, updateNote} = props;
    return <div className="col-md-3">
        <div className="card my-3">
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                <h5 className="card-title">{note.title}</h5>
                <div>
                {/* <i className="far fa-trash-alt mx-3" onClick={() => {deleteNote(note._id); props.showAlert("Note Deleted Successfully", "success")}}></i> */}
                <i className="far fa-trash-alt mx-3" onClick={() => {deleteNote(note._id)}}></i>
                <i className="far fa-edit" onClick={() => {updateNote(note)}}></i>
                </div>
                </div>
                <p className="card-text">{note.description}</p>
            </div>
        </div>
    </div>;
};

export default NoteItem;
