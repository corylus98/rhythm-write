import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Alert,
} from '@mui/material';
import { buildAuthUrl } from '../config/spotify';
import NavBar from '../components/Home/NavBar';

const ProfileSettings: React.FC = () => {
  const [isSpotifyConnected, setIsSpotifyConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if we have a token in localStorage
    const token = localStorage.getItem('spotify_token');
    setIsSpotifyConnected(!!token);

    // Handle the redirect from Spotify
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = urlParams.get('access_token');
    
    if (accessToken) {
      localStorage.setItem('spotify_token', accessToken);
      setIsSpotifyConnected(true);
      // Remove the access token from the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleSpotifyConnect = async () => {
    try {
      const authUrl = await buildAuthUrl();
    window.location.href = authUrl;
    } catch (error) {
      console.error('Error building auth URL:', error);
    }
  };

  const handleSpotifyDisconnect = () => {
    localStorage.removeItem('spotify_token');
    setIsSpotifyConnected(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFDFB', m: 0, p: 0, boxSizing: 'border-box', overflow: 'hidden' }}>
      <NavBar />
      {/* Left vertical line */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 240,
        width: '1px',
        height: '100vh',
        bgcolor: '#341A00',
        zIndex: 1100,
        display: { xs: 'none', md: 'block' },
      }} />
      {/* Right vertical line */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        right: 240,
        width: '1px',
        height: '100vh',
        bgcolor: '#341A00',
        zIndex: 1100,
        display: { xs: 'none', md: 'block' },
      }} />
      <Container maxWidth="md" sx={{ pt: { xs: 12, md: 16 } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
            mt: 0
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: { xs: '2rem', md: '2.5rem' },
            mb: 6,
            letterSpacing: '0.5px',
            color: '#333',
            fontWeight: 400
          }}
        >
            SETTINGS
        </Typography>

        <Box
          sx={{
            width: '100%',
            maxWidth: 480,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 3
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Typography
              sx={{
                fontFamily: '"Instrument Serif", serif',
                fontSize: '1.2rem',
                mb: 2,
                letterSpacing: '0.3px',
                color: '#333'
              }}
            >
              Spotify Connection
            </Typography>
            
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 2,
                  backgroundColor: 'transparent',
                  color: '#d32f2f',
                  border: '1px solid #d32f2f'
                }}
                onClose={() => setError(null)}
              >
                {error}
              </Alert>
            )}

            <Typography
              sx={{
                fontFamily: '"Noto Sans", sans-serif',
                fontSize: '0.95rem',
                color: '#666',
                mb: 3,
                lineHeight: 1.8,
                letterSpacing: '0.3px',
                fontWeight: 300
              }}
            >
              {isSpotifyConnected
                ? 'Your Spotify account is connected. You can now use Spotify playlists while journaling.'
                : 'Connect your Spotify account to get personalized playlists while journaling.'}
            </Typography>

            <Button
              variant="outlined"
              onClick={isSpotifyConnected ? handleSpotifyDisconnect : handleSpotifyConnect}
              sx={{
                color: isSpotifyConnected ? '#666' : '#1DB954',
                borderColor: isSpotifyConnected ? '#666' : '#1DB954',
                textTransform: 'none',
                fontSize: '0.9rem',
                letterSpacing: '0.3px',
                padding: '8px 24px',
                '&:hover': {
                  borderColor: isSpotifyConnected ? '#888' : '#1ed760',
                  backgroundColor: 'transparent',
                  color: isSpotifyConnected ? '#888' : '#1ed760'
                }
              }}
            >
              {isSpotifyConnected ? 'Disconnect Spotify' : 'Connect Spotify'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
    </Box>
  );
};

export default ProfileSettings; 