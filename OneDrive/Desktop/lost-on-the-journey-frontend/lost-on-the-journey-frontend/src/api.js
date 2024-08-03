import React from 'react';
import './App.css';
import MovieList from './components/MovieList'; // Import MovieList component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to LOST ON THE JOURNEY</h1>
      </header>
      <main>
        <MovieList /> {/* Use MovieList component */}
      </main>
    </div>
  );
}

export default App;
