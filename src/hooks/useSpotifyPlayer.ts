import { useState, useEffect, useRef } from 'react';

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any;
  }
}

interface PlayerState {
  isReady: boolean;
  isPlaying: boolean;
  currentTrack: any;
  position: number;
  duration: number;
  device_id: string | null;
  error: string | null;
}

export const useSpotifyPlayer = () => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    isReady: false,
    isPlaying: false,
    currentTrack: null,
    position: 0,
    duration: 0,
    device_id: null,
    error: null
  });

  const playerRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('spotify_token');
    if (!token) {
      setPlayerState(prev => ({ ...prev, error: 'No Spotify token found' }));
      return;
    }

    // Load Spotify Web Playback SDK
    if (!window.Spotify) {
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        initializePlayer(token);
      };
    } else {
      initializePlayer(token);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (playerRef.current) {
        playerRef.current.disconnect();
      }
    };
  }, []);

  const initializePlayer = (token: string) => {
    const player = new window.Spotify.Player({
      name: 'RhythmWrite Player',
      getOAuthToken: (cb: (token: string) => void) => {
        cb(token);
      },
      volume: 0.5
    });

    // Error handling
    player.addListener('initialization_error', ({ message }: any) => {
      setPlayerState(prev => ({ ...prev, error: `Initialization Error: ${message}` }));
    });

    player.addListener('authentication_error', ({ message }: any) => {
      setPlayerState(prev => ({ ...prev, error: `Authentication Error: ${message}` }));
      localStorage.removeItem('spotify_token');
    });

    player.addListener('account_error', ({ message }: any) => {
      setPlayerState(prev => ({ ...prev, error: `Account Error: ${message}` }));
    });

    player.addListener('playback_error', ({ message }: any) => {
      setPlayerState(prev => ({ ...prev, error: `Playback Error: ${message}` }));
    });

    // Playback status updates
    player.addListener('player_state_changed', (state: any) => {
      if (!state) return;

      setPlayerState(prev => ({
        ...prev,
        isPlaying: !state.paused,
        currentTrack: state.track_window.current_track,
        position: state.position,
        duration: state.duration
      }));
    });

    // Ready
    player.addListener('ready', ({ device_id }: any) => {
      console.log('✅ Spotify Player Ready with Device ID:', device_id);
      console.log('🎵 Player capabilities:', {
        canPlay: true,
        canPause: true,
        canSeek: true
      });
      setPlayerState(prev => ({
        ...prev,
        isReady: true,
        device_id,
        error: null
      }));
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }: any) => {
      console.log('⚠️ Device ID has gone offline:', device_id);
      setPlayerState(prev => ({
        ...prev,
        isReady: false,
        device_id: null
      }));
    });

    // Connect to the player!
    console.log('🔌 Connecting to Spotify Player...');
    player.connect().then((success: boolean) => {
      if (success) {
        console.log('✅ Successfully connected to Spotify!');
      } else {
        console.log('❌ Failed to connect to Spotify');
        setPlayerState(prev => ({
          ...prev,
          error: 'Failed to connect to Spotify Web Player'
        }));
      }
    });
    
    playerRef.current = player;

    // Update position every second when playing
    intervalRef.current = setInterval(() => {
      if (playerRef.current) {
        playerRef.current.getCurrentState().then((state: any) => {
          if (state && !state.paused) {
            setPlayerState(prev => ({
              ...prev,
              position: state.position
            }));
          }
        });
      }
    }, 1000);
  };

  const playTracks = async (trackUris: string[]) => {
    const token = localStorage.getItem('spotify_token');
    if (!token || !playerState.device_id) {
      setPlayerState(prev => ({ ...prev, error: 'Player not ready' }));
      return;
    }

    console.log('🎵 Starting playbook with device ID:', playerState.device_id);
    console.log('🎵 Track URIs:', trackUris);

    // Validate URIs format
    const invalidUris = trackUris.filter(uri => !uri.startsWith('spotify:track:'));
    if (invalidUris.length > 0) {
      console.error('❌ Invalid URI format detected:', invalidUris);
      setPlayerState(prev => ({ 
        ...prev, 
        error: `Invalid track URI format: ${invalidUris[0]}` 
      }));
      return;
    }

    try {
      // First, set repeat mode to 'context' (loop the playlist)
      console.log('🔁 Setting repeat mode to context...');
      const repeatResponse = await fetch(`https://api.spotify.com/v1/me/player/repeat?state=context&device_id=${playerState.device_id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      console.log('🔁 Repeat mode response:', repeatResponse.status);

      // Then start playback
      console.log('▶️ Starting playback...');
      const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${playerState.device_id}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: trackUris }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      console.log('🎵 Playback API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🎵 Playback API error response:', errorText);
        
        let errorMessage = `Failed to start playback: ${response.status}`;
        
        if (response.status === 403) {
          errorMessage = 'Premium subscription required for playback control';
        } else if (response.status === 404) {
          errorMessage = 'Device not found. Try refreshing the page and reconnecting Spotify';
        } else if (response.status === 400) {
          errorMessage = 'Invalid request. Some tracks might not be available in your region';
        }
        
        throw new Error(errorMessage);
      } else {
        console.log('✅ Playback started successfully with loop enabled');
      }
    } catch (error) {
      console.error('❌ Error starting playback:', error);
      setPlayerState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to start playback' 
      }));
    }
  };

  const togglePlayPause = () => {
    if (playerRef.current) {
      playerRef.current.togglePlay();
    }
  };

  const nextTrack = () => {
    if (playerRef.current) {
      playerRef.current.nextTrack();
    }
  };

  const previousTrack = () => {
    if (playerRef.current) {
      playerRef.current.previousTrack();
    }
  };

  const seek = (positionMs: number) => {
    if (playerRef.current) {
      playerRef.current.seek(positionMs);
    }
  };

  const setVolume = (volume: number) => {
    if (playerRef.current) {
      playerRef.current.setVolume(volume);
    }
  };

  return {
    ...playerState,
    playTracks,
    togglePlayPause,
    nextTrack,
    previousTrack,
    seek,
    setVolume
  };
}; 