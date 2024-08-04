// src/components/MovieList.js
import React, { useState, useEffect } from 'react';
import api from '../api/AxiosConfig';
import { Link } from 'react-router-dom';
import './MovieList.css'; // Import the CSS file
import DeleteMovie from './DeleteMovie';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleDelete = (id) => {
        setMovies(movies.filter(movie => movie.id !== id));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="movie-list">
            <h2>Movie List</h2>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                        <DeleteMovie id={movie.id} onDelete={handleDelete} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieList;
