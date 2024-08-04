import React from 'react';
import './App.css';
import MovieList from './components/MovieList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie List</h1>
        <MovieList />
      </header>
    </div>
  );
}

export default App;
