import React, { useState } from 'react';
import api from '../api/AxiosConfig';
import './UpdateMovieDialog.css';

interface Movie {
    id: number;
    title: string;
    description: string;
}

interface UpdateMovieDialogProps {
    movie: Movie;
    onClose: () => void;
    onUpdate: (id: number, title: string, description: string) => void;
}

const UpdateMovieDialog: React.FC<UpdateMovieDialogProps> = ({ movie, onClose, onUpdate }) => {
    const [title, setTitle] = useState(movie.title);
    const [description, setDescription] = useState(movie.description);

    const handleUpdate = async () => {
        try {
            await api.put(`/movies/${movie.id}`, { title, description });
            onUpdate(movie.id, title, description);
            onClose();
        } catch (err) {
            console.error('Error updating movie:', err);
        }
    };

    return (
        <div className="update-movie-dialog">
            <div className="update-movie-dialog-content">
                <h2>Update Movie</h2>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Movie title"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Movie description"
                />
                <button onClick={handleUpdate}>Update</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default UpdateMovieDialog;
