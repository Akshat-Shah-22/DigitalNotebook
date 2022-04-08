import React, { useState, useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        // props.showAlert("Note Added Successfully", "success");
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    return <div className="container my-3">
        <h1>Add a Note</h1>
        <form>
            <div className="mb-3 my-3">
                <label htmlFor="title" className="form-label" >Title</label>
                <input type="text" className="form-control" id="tile" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="descripton" className="form-label" onChange={onChange}>Description</label>
                <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label" onChange={onChange}>Tag</label>
                <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
            </div>
            <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
        </form>
    </div>
};

export default AddNote;
