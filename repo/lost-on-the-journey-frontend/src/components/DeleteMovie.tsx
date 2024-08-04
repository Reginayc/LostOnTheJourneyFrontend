import React from 'react';
import api from '../api/AxiosConfig';

interface DeleteMovieProps {
    id: number;
    onDelete: (id: number) => void;
}

const DeleteMovie: React.FC<DeleteMovieProps> = ({ id, onDelete }) => {
    const handleDelete = async () => {
        try {
            await api.delete(`/movies/${id}`);
            onDelete(id);
        } catch (err) {
            console.error('Error deleting movie:', err);
        }
    };

    return (
        <button onClick={handleDelete}>Delete</button>
    );
};

export default DeleteMovie;
