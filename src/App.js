import React from "react";
import "./App.css";

import TweetList from "./components/tweet-list";

function App() {
  return (
    <main>
      <header className="header" data-testid="header">
        MagicLab test by Blazej Misiak
      </header>
      <TweetList />
    </main>
  );
}

export default App;
