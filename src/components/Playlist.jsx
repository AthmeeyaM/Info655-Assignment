import React, { useState, useEffect } from 'react';
import Song from '../components/Song';
import Podcast from '../components/Podcast';

const Playlist = () => {
  const [audioList, setAudioList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetch('/audio.json') // audio file is placed in public folder
      .then(response => response.json())
      .then(data => setAudioList(data))
      .catch(error => console.error('Error fetching audio data:', error));
  }, []);

  const playAudio = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (currentIndex !== null) {
      setIsPlaying(prev => !prev);
    }
  };

  const playNext = () => {
    if (audioList.length > 0) {
      setCurrentIndex(prev => (prev === null || prev === audioList.length - 1 ? 0 : prev + 1));
      setIsPlaying(true);
    }
  };

  const playPrev = () => {
    if (audioList.length > 0) {
      setCurrentIndex(prev => (prev === null || prev === 0 ? audioList.length - 1 : prev - 1));
      setIsPlaying(true);
    }
  };

  const shufflePlaylist = () => {
    setAudioList(prevList => {
      if (currentIndex === null) return [...prevList].sort(() => Math.random() - 0.5);
  
      const currentAudio = prevList[currentIndex];
      let shuffledList = [...prevList].sort(() => Math.random() - 0.5);
      const newIndex = shuffledList.findIndex(audio => audio === currentAudio);
      setCurrentIndex(newIndex);
      return shuffledList;
    });
  };

  return (
    <div style={styles.playlist}>
      <h2 style={styles.title}>My Playlist</h2>
      <div style={styles.controls}>
        <button style={styles.buttonShuffle} onClick={shufflePlaylist}>Shuffle</button>
        <button style={styles.button} onClick={playPrev}>Prev</button>
        <button style={styles.buttonPlayPause} onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button style={styles.button} onClick={playNext}>Next</button>
      </div>
      <div style={styles.status}>
        {currentIndex !== null ? (isPlaying ? `Playing: ${audioList[currentIndex]?.title || audioList[currentIndex]?.episodeTitle}` : 'Paused') : 'Select a track'}
      </div>
      <div style={styles.audioList}>
        {audioList.length === 0 ? (
          <p>Loading audio files...</p>
        ) : (
          audioList.map((audio, index) => (
            audio.artist ? (
              <Song 
                key={index} 
                title={audio.title} 
                artist={audio.artist} 
                year={audio.year} 
                onDoubleClick={() => playAudio(index)}
                isPlaying={currentIndex === index}
              />
            ) : (
              <Podcast 
                key={index} 
                episodeTitle={audio.episodeTitle} 
                season={audio.season} 
                episode={audio.episode} 
                onDoubleClick={() => playAudio(index)}
                isPlaying={currentIndex === index}
              />
            )
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  playlist: {
    width: '80%',
    maxWidth: '800px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    margin: '20px auto'
  },
  title: {
    fontSize: '2rem',
    color: '#023e8a',
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '15px'
  },
  button: {
    padding: '10px 15px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: '#48cae4',
    color: 'white'
  },
  buttonPlayPause: {
    backgroundColor: '#ff6b6b',
    color: 'white'
  },
  buttonShuffle: {
    backgroundColor: '#0077b6',
    color: 'white'
  },
  status: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#023e8a',
    marginBottom: '15px',
    padding: '10px',
    backgroundColor: '#caf0f8',
    borderRadius: '8px'
  },
  audioList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  }
};

export default Playlist;
