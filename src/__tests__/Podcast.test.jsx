import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Podcast from '../components/Podcast';

describe('Podcast Component', () => {
  test('renders podcast details correctly with season', () => {
    render(<Podcast episodeTitle="Tech Talk" season={3} episode={6} />);
    expect(screen.getByText('Tech Talk')).toBeInTheDocument();
    expect(screen.getByText('Season 3, Episode 6')).toBeInTheDocument();
  });

  test('renders podcast details correctly without season', () => {
    render(<Podcast episodeTitle="No Season Podcast" episode={12} />);
    expect(screen.getByText('Episode 12')).toBeInTheDocument();
  });

  test('handles missing episodeTitle', () => {
    render(<Podcast season={2} episode={7} />);
    expect(screen.getByText('Season 2, Episode 7')).toBeInTheDocument();
  });

  test('handles missing season', () => {
    render(<Podcast episodeTitle="Podcast Without Season" episode={9} />);
    expect(screen.getByText('Episode 9')).toBeInTheDocument();
  });

  test('handles missing episode number', () => {
    render(<Podcast episodeTitle="Podcast Without Episode" season={1} />);
    expect(screen.getByText('Podcast Without Episode')).toBeInTheDocument();
    expect(screen.getByText('Episode')).toBeInTheDocument();
  });

  test('triggers double-click event correctly', () => {
    const onDoubleClick = jest.fn();
    render(<Podcast episodeTitle="Click Me Podcast" episode={1} onDoubleClick={onDoubleClick} />);
    fireEvent.doubleClick(screen.getByText('Click Me Podcast'));
    expect(onDoubleClick).toHaveBeenCalled();
  });

  test('applies playing style when isPlaying is true', () => {
    render(<Podcast episodeTitle="Playing Podcast" episode={5} isPlaying={true} />);
    expect(screen.getByText('Playing Podcast').parentElement).toHaveStyle('background-color: #ff6b6b');
  });
});
