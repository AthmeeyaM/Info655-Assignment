import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Song from '../components/Song';

describe('Song Component', () => {
  test('renders song details correctly', () => {
    render(<Song title="Test Song" artist="Test Artist" year={2022} />);
    expect(screen.getByText('Test Song')).toBeInTheDocument();
    expect(screen.getByText('Artist: Test Artist')).toBeInTheDocument();
    expect(screen.getByText('Year: 2022')).toBeInTheDocument();
  });

  test('handles invalid year', () => {
    render(<Song title="Invalid Year" artist="Unknown" year="Twenty Twenty" />);
    expect(screen.getByText('Year: Twenty Twenty')).toBeInTheDocument();
  });

  test('handles missing title', () => {
    render(<Song artist="No Title Artist" year={2000} />);
    expect(screen.getByText('Artist: No Title Artist')).toBeInTheDocument();
    expect(screen.getByText('Year: 2000')).toBeInTheDocument();
  });

  test('handles missing artist', () => {
    render(<Song title="No Artist Song" year={2010} />);
    expect(screen.getByText('No Artist Song')).toBeInTheDocument();
    expect(screen.getByText('Year: 2010')).toBeInTheDocument();
  });

  test('handles missing year', () => {
    render(<Song title="No Year Song" artist="Mystery Artist" />);
    expect(screen.getByText('No Year Song')).toBeInTheDocument();
    expect(screen.getByText('Artist: Mystery Artist')).toBeInTheDocument();
  });

  test('triggers double-click event correctly', () => {
    const onDoubleClick = jest.fn();
    render(<Song title="Click Me" artist="Test" year={2023} onDoubleClick={onDoubleClick} />);
    fireEvent.doubleClick(screen.getByText('Click Me'));
    expect(onDoubleClick).toHaveBeenCalled();
  });

  test('applies playing style when isPlaying is true', () => {
    render(<Song title="Playing Song" artist="Singer" year={2023} isPlaying={true} />);
    expect(screen.getByText('Playing Song').parentElement).toHaveStyle('background-color: #ff6b6b');
  });
});
