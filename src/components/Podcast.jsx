import React from 'react';

const Podcast = ({ episodeTitle, season, episode, onDoubleClick, isPlaying }) => {
  return (
    <div 
      style={{ ...styles.podcast, ...(isPlaying ? styles.playing : {}) }} 
      onDoubleClick={onDoubleClick}
    >
      <h3>{episodeTitle}</h3>
      {season && episode ? (
        <p>Season {season}, Episode {episode}</p>
      ) : (
        <p>Episode {episode}</p>
      )}
    </div>
  );
};

const styles = {
  podcast: {
    padding: '12px',
    borderRadius: '10px',
    backgroundColor: '#e8f5ff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer'
  },
  playing: {
    backgroundColor: '#ff6b6b',
    color: 'white'
  }
};

export default Podcast;
