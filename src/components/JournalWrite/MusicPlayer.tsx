import React, { useState, useEffect, useCallback } from 'react';
import { Box, IconButton, Typography, Slider, LinearProgress } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useSpotifyPlayer } from '../../hooks/useSpotifyPlayer';

interface PlaylistTrack {
  title: string;
  artist: string;
  duration: number;
  uri: string;
}

interface MusicPlayerProps {
  playlist: PlaylistTrack[];
  isTimerRunning: boolean;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ 
  playlist, 
  isTimerRunning,
  onPlayStateChange 
}) => {
  const [volume, setVolume] = useState(50);
  const [hasStartedPlayback, setHasStartedPlayback] = useState(false);

  const {
    isReady,
    isPlaying,
    currentTrack,
    position,
    duration,
    error,
    playTracks,
    togglePlayPause,
    nextTrack,
    previousTrack,
    seek,
    setVolume: setPlayerVolume
  } = useSpotifyPlayer();

  // Auto-play when timer starts and player is ready
  useEffect(() => {
    if (isTimerRunning && isReady && !hasStartedPlayback && playlist.length > 0) {
      console.log('🎵 Auto-starting music for timer...');
      const trackUris = playlist.map(track => track.uri);
      playTracks(trackUris);
      setHasStartedPlayback(true);
    }
  }, [isTimerRunning, isReady, hasStartedPlayback, playlist.length, playTracks]);

  // Auto-pause when timer stops
  useEffect(() => {
    if (!isTimerRunning && isPlaying && hasStartedPlayback) {
      console.log('🎵 Pausing music as timer stopped');
      togglePlayPause();
    }
  }, [isTimerRunning, isPlaying, hasStartedPlayback, togglePlayPause]);

  // Reset playback state when playlist changes
  useEffect(() => {
    setHasStartedPlayback(false);
  }, [playlist]);

  // Notify parent about play state changes
  useEffect(() => {
    onPlayStateChange?.(isPlaying);
  }, [isPlaying, onPlayStateChange]);

  // Event handlers
  const handleVolumeChange = useCallback((event: Event, newValue: number | number[]) => {
    const vol = Array.isArray(newValue) ? newValue[0] : newValue;
    setVolume(vol);
    setPlayerVolume(vol / 100);
  }, [setPlayerVolume]);

  const handlePositionChange = useCallback((event: Event, newValue: number | number[]) => {
    const pos = Array.isArray(newValue) ? newValue[0] : newValue;
    seek(pos);
  }, [seek]);

  const formatTime = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Error state
  if (error) {
    const isPremiumError = error.toLowerCase().includes('premium') || 
                          error.toLowerCase().includes('restricted') ||
                          error.toLowerCase().includes('account error');
    
    return (
      <Box sx={{ 
        p: 2, 
        bgcolor: isPremiumError ? '#e3f2fd' : '#fff3cd', 
        border: `1px solid ${isPremiumError ? '#90caf9' : '#ffeaa7'}`, 
        borderRadius: 1,
        color: isPremiumError ? '#1565c0' : '#856404'
      }}>
        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
          {isPremiumError ? '🎵 Spotify Premium Required' : 'Music Player Error'}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {isPremiumError 
            ? 'Music playback control requires a Spotify Premium account.' 
            : `Music Player Error: ${error}`
          }
        </Typography>
        
        {isPremiumError ? (
          <Box>
            <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
              <strong>Don't worry!</strong> You can still enjoy your journaling experience:
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
              • Open Spotify in another tab and play music manually
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
              • We'll still show your personalized playlist recommendations
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
              • Consider upgrading to Spotify Premium for full integration
            </Typography>
            <Typography variant="caption" sx={{ color: '#757575' }}>
              This limitation is due to Spotify's API restrictions for free accounts.
            </Typography>
          </Box>
        ) : (
        <Typography variant="caption">
          Make sure you have Spotify Premium and try reconnecting your account.
        </Typography>
        )}
      </Box>
    );
  }

  // Loading state
  if (!isReady) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <LinearProgress sx={{ mb: 1 }} />
        <Typography variant="body2" color="text.secondary">
          Initializing Spotify Player...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      zIndex: 1300,
      bgcolor: '#FFFDFB',
      borderTop: '1.5px solid #E9E4DC',
      boxShadow: '0 -2px 16px 0 rgba(52,26,0,0.04)',
      px: { xs: 2, md: 8 },
      py: 1.5,
      display: 'flex',
      alignItems: 'center',
      gap: 3,
      minHeight: 72,
    }}>
      {/* Track Info */}
      <Box sx={{ minWidth: 0, flex: '0 1 220px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {currentTrack ? (
          <>
            <Typography variant="subtitle2" sx={{ fontWeight: 500, color: '#341A00', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {currentTrack.name}
          </Typography>
            <Typography variant="caption" sx={{ color: '#B7AFA3', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {currentTrack.artists.map((artist: any) => artist.name).join(', ')}
          </Typography>
          </>
        ) : (
          <>
            <Typography variant="subtitle2" sx={{ fontWeight: 500, color: '#341A00' }}>
              Playlist Ready
            </Typography>
            <Typography variant="caption" sx={{ color: '#B7AFA3' }}>
              {playlist.length} tracks • Music will start with your timer
            </Typography>
          </>
        )}
          </Box>
      {/* Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton onClick={previousTrack} disabled={!isReady || !currentTrack} size="small">
          <SkipPreviousIcon fontSize="medium" />
        </IconButton>
        <IconButton 
          onClick={togglePlayPause} 
          disabled={!isReady || !currentTrack}
          sx={{ 
            bgcolor: '#E9E4DC', 
            color: '#341A00',
            mx: 0.5,
            '&:hover': { bgcolor: '#D6CFC2' },
            '&:disabled': { bgcolor: '#F5F3F0' }
          }}
          size="large"
        >
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <IconButton onClick={nextTrack} disabled={!isReady || !currentTrack} size="small">
          <SkipNextIcon fontSize="medium" />
        </IconButton>
      </Box>
      {/* Progress Bar */}
      <Box sx={{ flex: 1, minWidth: 120, px: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="caption" sx={{ color: '#B7AFA3', minWidth: 32 }}>
          {formatTime(position)}
        </Typography>
        <Slider
          value={position}
          max={duration}
          onChange={handlePositionChange}
          sx={{ 
            color: '#B7AFA3',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 10,
              height: 10,
            }
          }}
        />
        <Typography variant="caption" sx={{ color: '#B7AFA3', minWidth: 32 }}>
          {formatTime(duration)}
        </Typography>
      </Box>
      {/* Volume */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 120 }}>
        <VolumeUpIcon sx={{ color: '#B7AFA3', fontSize: 20 }} />
        <Slider
          value={volume}
          onChange={handleVolumeChange}
          sx={{ 
            color: '#B7AFA3',
            width: 80,
            height: 4,
            '& .MuiSlider-thumb': {
              width: 10,
              height: 10,
            }
          }}
        />
      </Box>
      {/* Status message */}
      <Box sx={{ minWidth: 160, textAlign: 'right' }}>
        <Typography variant="caption" sx={{ color: '#B7AFA3' }}>
          {!hasStartedPlayback 
            ? 'Music will start when you begin your timer' 
            : isPlaying 
              ? 'Playing' 
              : 'Paused'
          }
        </Typography>
      </Box>
    </Box>
  );
};

export default MusicPlayer; 