import React from 'react';
import logo from './logo.svg';
import './App.css';
import Video from './components/Video'
function App() {
  return (
    <div className="App" >
      <Video maxVolume = {50}></Video>
    </div>
  );
}

export default App;
