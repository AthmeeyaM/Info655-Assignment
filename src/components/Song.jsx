import React from 'react';

const Song = ({ title, artist, year, onDoubleClick, isPlaying }) => {
  return (
    <div 
      style={{ ...styles.song, ...(isPlaying ? styles.playing : {}) }} 
      onDoubleClick={onDoubleClick}
    >
      <h3>{title}</h3>
      <p>Artist: {artist}</p>
      <p>Year: {year}</p>
    </div>
  );
};

const styles = {
  song: {
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

export default Song;
