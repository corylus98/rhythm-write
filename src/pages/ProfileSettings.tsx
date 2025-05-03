import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Alert,
} from '@mui/material';

const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || window.location.origin + '/profile';

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

  const handleSpotifyConnect = () => {
    if (!SPOTIFY_CLIENT_ID) {
      setError('Spotify client ID is not configured');
      return;
    }

    const scope = 'streaming user-read-email user-read-private user-modify-playback-state';
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scope)}`;
    
    window.location.href = authUrl;
  };

  const handleSpotifyDisconnect = () => {
    localStorage.removeItem('spotify_token');
    setIsSpotifyConnected(false);
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: { xs: 8, md: 12 }
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
          Settings
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
  );
};

export default ProfileSettings; 