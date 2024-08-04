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
        <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
            Delete
        </button>
    );
};

export default DeleteMovie;
