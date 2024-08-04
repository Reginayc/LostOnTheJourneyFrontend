// src/components/DeleteMovie.js
import React from 'react';
import api from '../api/AxiosConfig';

const DeleteMovie = ({ id, onDelete }) => {
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
