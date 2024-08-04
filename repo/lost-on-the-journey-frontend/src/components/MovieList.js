// src/components/MovieList.js
import React, { useState, useEffect } from 'react';
import api from '../api/AxiosConfig';
import './MovieList.css';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newImdbUrl, setNewImdbUrl] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await api.get('/movies');
                setMovies(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const handleAddMovie = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/movies', { title: newTitle, description: newDescription });
            setMovies([...movies, response.data]);
            setNewTitle('');
            setNewDescription('');
            setNewImdbUrl('');
        } catch (err) {
            setError('Error adding movie');
        }
    };

    const handleUpdateMovie = async (id, newTitle) => {
        try {
            await api.put(`/movies/${id}`, { title: newTitle });
            setMovies(movies.map(movie => (movie.id === id ? { ...movie, title: newTitle } : movie)));
        } catch (err) {
            setError('Error updating movie');
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/movies/${id}`);
            setMovies(movies.filter(movie => movie.id !== id));
        } catch (err) {
            setError('Error deleting movie');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="movie-list">
            <h2>Movie List</h2>
            <form onSubmit={handleAddMovie} className="add-movie-form">
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="New movie title"
                    required
                />
                <input
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="New movie description"
                    required
                />
                <input
                    type="text"
                    value={newImdbUrl}
                    onChange={(e) => setNewImdbUrl(e.target.value)}
                    placeholder="IMDb URL"
                    required
                />
                <button type="submit">Add Movie</button>
            </form>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id} className="movie-item">
                        <EditableTitle
                            movie={movie}
                            onUpdate={(newTitle) => handleUpdateMovie(movie.id, newTitle)}
                        />
                        <a href={movie.imdbUrl} target="_blank" rel="noopener noreferrer">
                            {movie.title}
                        </a>
                        <button onClick={() => handleDelete(movie.id)} className="delete-button">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const EditableTitle = ({ movie, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(movie.title);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        onUpdate(title);
        setIsEditing(false);
    };

    return (
        <div className="editable-title">
            {isEditing ? (
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleSave}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') handleSave();
                    }}
                    autoFocus
                />
            ) : (
                <span onClick={handleEdit}>{title}</span>
            )}
        </div>
    );
};

export default MovieList;
