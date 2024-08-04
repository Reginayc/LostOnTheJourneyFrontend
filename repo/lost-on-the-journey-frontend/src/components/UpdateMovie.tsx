import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/AxiosConfig';

const UpdateMovie: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string>('');

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await api.get(`/movies/${id}`);
                setTitle(response.data.title);
                setGenre(response.data.genre);
                setDescription(response.data.description);
            } catch (err) {
                setError('Error fetching movie details.');
            }
        };

        fetchMovie();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.put(`/movies/${id}`, { title, genre, description });
            setSuccess('Movie updated successfully!');
            setError(null);
        } catch (err) {
            setError('Error updating movie.');
            setSuccess('');
        }
    };

    return (
        <div>
            <h1>Update Movie</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Genre:</label>
                    <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <button type="submit">Update Movie</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default UpdateMovie;
