import React from 'react';
import './App.css';
import TweetList from './components/tweet-list';

function App() {
  return (
    <main>
      <header className="header">
        MagicLab test - Blazej Misiak
      </header>
      <TweetList />
    </main>
  );
}

export default App;
