import React, { useState } from 'react';
import api from '../api/AxiosConfig';

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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Update Movie</h2>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Movie title"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Movie description"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <div className="flex justify-end">
                    <button
                        onClick={handleUpdate}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Update
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateMovieDialog;