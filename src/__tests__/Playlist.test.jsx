import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Playlist from '../components/Playlist';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { title: 'Song 1', artist: 'Artist 1', year: 2020 },
        { title: 'Song 2', artist: 'Artist 2', year: 2021 },
        { episodeTitle: 'Podcast 1', season: 1, episode: 5 },
      ]),
  })
);

describe('Playlist Component', () => {
  beforeEach(() => {
    fetch.mockClear(); // Reset fetch before each test
  });

  test('renders playlist with initial loading message', async () => {
    render(<Playlist />);
    expect(screen.getByText('Loading audio files...')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('Song 1')).toBeInTheDocument());
    expect(screen.getByText('Podcast 1')).toBeInTheDocument();
  });

  test('displays status correctly when a song is double-clicked', async () => {
    render(<Playlist />);
    await waitFor(() => screen.getByText('Song 1'));

    fireEvent.doubleClick(screen.getByText('Song 1'));
    await waitFor(() => expect(screen.getByText('Playing: Song 1')).toBeInTheDocument());
  });

  test('toggles play/pause correctly', async () => {
    render(<Playlist />);
    await waitFor(() => screen.getByText('Song 1'));

    fireEvent.doubleClick(screen.getByText('Song 1'));
    await waitFor(() => screen.getByText('Playing: Song 1'));

    const playPauseButton = screen.getByText('Pause');
    fireEvent.click(playPauseButton);
    
    await waitFor(() => expect(screen.getByText('Paused')).toBeInTheDocument());

    fireEvent.click(playPauseButton);
    await waitFor(() => expect(screen.getByText('Playing: Song 1')).toBeInTheDocument());
  });

  test('plays next and previous tracks correctly', async () => {
    render(<Playlist />);
    await waitFor(() => screen.getByText('Song 1'));

    fireEvent.doubleClick(screen.getByText('Song 1'));
    await waitFor(() => screen.getByText('Playing: Song 1'));

    fireEvent.click(screen.getByText('Next'));
    await waitFor(() => screen.getByText('Playing: Song 2'));

    fireEvent.click(screen.getByText('Prev'));
    await waitFor(() => screen.getByText('Playing: Song 1'));
  });

  test('loops to last track when Prev is clicked at first track', async () => {
    render(<Playlist />);
    await waitFor(() => screen.getByText('Song 1'));

    fireEvent.doubleClick(screen.getByText('Song 1'));
    await waitFor(() => screen.getByText('Playing: Song 1'));

    fireEvent.click(screen.getByText('Prev'));
    await waitFor(() => screen.getByText('Playing: Podcast 1'));
  });

  test('loops to first track when Next is clicked at last track', async () => {
    render(<Playlist />);
    await waitFor(() => screen.getByText('Song 1'));

    fireEvent.doubleClick(screen.getByText('Song 1'));
    await waitFor(() => screen.getByText('Playing: Song 1'));

    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));
    await waitFor(() => screen.getByText('Playing: Podcast 1'));

    fireEvent.click(screen.getByText('Next'));
    await waitFor(() => screen.getByText('Playing: Song 1'));
  });

  test('clicking Next/Prev while paused resumes playing', async () => {
    render(<Playlist />);
    await waitFor(() => screen.getByText('Song 1'));

    fireEvent.doubleClick(screen.getByText('Song 1'));
    await waitFor(() => screen.getByText('Playing: Song 1'));

    const playPauseButton = screen.getByText('Pause'); 
    fireEvent.click(playPauseButton); 
    await waitFor(() => expect(screen.getByText('Paused')).toBeInTheDocument());
    fireEvent.click(screen.getByText('Next'));
    await waitFor(() => expect(screen.getByText(/Playing:/)).toBeInTheDocument());
  });

  test('shuffles playlist when shuffle button is clicked', async () => {
    render(<Playlist />);
    await waitFor(() => screen.getByText('Song 1'));

    fireEvent.doubleClick(screen.getByText('Song 1'));
    await waitFor(() => screen.getByText('Playing: Song 1'));

    fireEvent.click(screen.getByText('Shuffle'));
    await waitFor(() => expect(screen.getByText(/Playing:/)).toBeInTheDocument());
  });
});
