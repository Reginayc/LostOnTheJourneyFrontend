// src/components/MovieList.js
import React, { useState, useEffect } from 'react';
import api from '../api/AxiosConfig';
import './MovieList.css';
import UpdateMovieDialog from './UpdateMovieDialog';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);

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
        } catch (err) {
            setError('Error adding movie');
        }
    };

    const handleUpdateMovie = (id, newTitle, newDescription) => {
        setMovies(movies.map(movie => (movie.id === id ? { ...movie, title: newTitle, description: newDescription } : movie)));
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
            <h2>Movie WatchList</h2>
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
                <button type="submit">Add Movie</button>
            </form>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id} className="movie-item">
                        <div className="movie-details">
                            <span className="movie-title">{movie.title}</span>
                            <span className="movie-description">{movie.description}</span>
                        </div>
                        <div className="movie-actions">
                            <button onClick={() => setSelectedMovie(movie)} className="update-button">Update</button>
                            <button onClick={() => handleDelete(movie.id)} className="delete-button">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            {selectedMovie && (
                <UpdateMovieDialog
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                    onUpdate={handleUpdateMovie}
                />
            )}
        </div>
    );
};

export default MovieList;
