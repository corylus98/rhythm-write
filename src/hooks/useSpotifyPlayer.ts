import { useState, useEffect } from 'react';

interface SpotifyPlayer {
  isConnected: boolean;
  isPlaying: boolean;
  error: string | null;
  playPlaylist: (uri: string) => void;
  pausePlayback: () => void;
}

export const useSpotifyPlayer = (): SpotifyPlayer => {
  const [isConnected, setIsConnected] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has connected their Spotify account
    const checkConnection = () => {
      const token = localStorage.getItem('spotify_token');
      setIsConnected(!!token);
    };

    checkConnection();
    // Check connection status when component mounts
    window.addEventListener('storage', checkConnection);
    
    return () => {
      window.removeEventListener('storage', checkConnection);
    };
  }, []);

  const playPlaylist = async (uri: string) => {
    const token = localStorage.getItem('spotify_token');
    if (!token) {
      setError('Please connect your Spotify account in profile settings');
      return;
    }

    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          context_uri: uri,
          position_ms: 0
        })
      });

      if (!response.ok) {
        throw new Error('Failed to start playback');
      }

      setIsPlaying(true);
      setError(null);
    } catch (err) {
      setError('Failed to start playback. Please try again.');
    }
  };

  const pausePlayback = async () => {
    const token = localStorage.getItem('spotify_token');
    if (!token) {
      setError('Please connect your Spotify account in profile settings');
      return;
    }

    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/pause', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to pause playback');
      }

      setIsPlaying(false);
      setError(null);
    } catch (err) {
      setError('Failed to pause playback. Please try again.');
    }
  };

  return {
    isConnected,
    isPlaying,
    error,
    playPlaylist,
    pausePlayback
  };
}; 