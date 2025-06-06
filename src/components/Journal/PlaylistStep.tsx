import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface PlaylistTrack {
  title: string;
  artist: string;
  duration: number;
  uri: string;
}

interface PlaylistStepProps {
  playlist: PlaylistTrack[];
  isLoading: boolean;
  onBack: () => void;
  onStartJournaling: () => void;
}

const PlaylistStep: React.FC<PlaylistStepProps> = ({ playlist, isLoading, onBack, onStartJournaling }) => (
  <Box sx={{ textAlign: 'center', position: 'relative' }}>
    {onBack && (
      <IconButton
        onClick={onBack}
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          color: '#341A00',
        }}
      >
        <ArrowBackIcon sx={{ color: '#341A00', fontSize: 32 }} />
      </IconButton>
    )}
    <Typography sx={{ fontFamily: 'Instrument Serif, serif', fontSize: 40, color: '#341A00', mb: 4, fontStyle: 'italic', fontWeight: 400 }}>
      Your Playlist
    </Typography>
    {isLoading ? (
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: 16, color: '#666' }}>
          Generating your personalized playlist...
        </Typography>
      </Box>
    ) : (
      <Box sx={{ width: 420, mx: 'auto', mb: 4, p: 3, bgcolor: '#FFFDFB', border: '1.5px solid #341A00', borderRadius: 2, maxHeight: 350, overflowY: 'auto' }}>
        {playlist.map((track, idx) => (
          <Box key={idx} sx={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: 18, color: '#341A00', mb: 1, textAlign: 'left' }}>
            {track.title} - {track.artist}
            <span style={{ float: 'right' }}>{track.duration} min</span>
          </Box>
        ))}
        <Box sx={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: 16, color: '#B7AFA3', mt: 2, textAlign: 'right' }}>
          Total: {playlist.reduce((sum, track) => sum + track.duration, 0)} min
        </Box>
        <Box sx={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: 14, color: '#B7AFA3', mt: 2, textAlign: 'center', fontStyle: 'italic' }}>
          🔁 Music will loop automatically for longer writing sessions
        </Box>
      </Box>
    )}
    <Button
      variant="outlined"
      onClick={onStartJournaling}
      disabled={isLoading || playlist.length === 0}
      sx={{
        fontFamily: 'Instrument Sans, sans-serif',
        fontWeight: 500,
        fontSize: '1.2rem',
        px: 4,
        py: 1.2,
        borderRadius: 1.5,
        boxShadow: 'none',
        background: isLoading ? '#f0f0f0' : '#FFFDFB',
        color: isLoading ? '#999' : '#341A00',
        border: '1.5px solid #341A00',
        textTransform: 'none',
        transition: 'background 0.3s',
        mb: 2,
        cursor: isLoading ? 'not-allowed' : 'pointer',
        '&:hover': {
          background: isLoading ? '#f0f0f0' : '#F5E9DD',
          color: isLoading ? '#999' : '#341A00',
          border: '1.5px solid #341A00',
          boxShadow: 'none'
        }
      }}
    >
      {isLoading ? 'Generating Playlist...' : 'Start Journaling'}
    </Button>
  </Box>
);

export default PlaylistStep; 