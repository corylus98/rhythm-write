import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';
import { exchangeCodeForToken } from '../config/spotify';

const CallbackHandler: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleSpotifyCallback = async () => {
      // Check for authorization code flow first (new method)
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      const error = urlParams.get('error');

      if (error) {
        // Handle authorization error
        console.error('Spotify authorization error:', error);
        navigate(`/login?error=${error}`, { replace: true });
        return;
      }

      if (code && state) {
        // Handle authorization code flow (new method)
        try {
          console.log('🔄 Starting token exchange...');
          console.log('📋 Authorization code received, cleaning URL...');
          
          // Immediately clear the URL to prevent code reuse
          window.history.replaceState({}, document.title, window.location.pathname);
          
          const tokenData = await exchangeCodeForToken(code, state);
          console.log('✅ Token exchange successful');
          
          // Store the access token
          localStorage.setItem('spotify_token', tokenData.access_token);
          localStorage.setItem('spotify_access_token', tokenData.access_token);
          localStorage.setItem('spotify_token_expires_at', 
            (Date.now() + tokenData.expires_in * 1000).toString()
          );
          
          if (tokenData.refresh_token) {
            localStorage.setItem('spotify_refresh_token', tokenData.refresh_token);
          }

          // Continue with user setup
          await setupSpotifyUser(tokenData.access_token);
          
        } catch (error) {
          console.error('❌ Error exchanging code for token:', error);
          navigate('/login?error=spotify_auth_failed', { replace: true });
        }
        return;
      }

      // Fall back to legacy implicit flow (hash-based) for backward compatibility
    const hash = window.location.hash.substring(1);
      if (hash) {
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');

    if (accessToken) {
          console.log('📱 Using legacy implicit flow token');
      localStorage.setItem('spotify_token', accessToken);
          localStorage.setItem('spotify_access_token', accessToken);
          await setupSpotifyUser(accessToken);
        } else {
          console.log('❌ No access token found in hash');
          navigate('/login', { replace: true });
        }
      } else {
        // No code, state, or hash - redirect to login
        console.log('❌ No authorization data found');
        navigate('/login', { replace: true });
      }
    };

    const setupSpotifyUser = async (accessToken: string) => {
      try {
        console.log('🔄 Fetching Spotify user info...');
        
        // Fetch Spotify user info
        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('📡 Spotify API response status:', response.status);
        
        if (response.ok) {
          const spotifyUser = await response.json();
          console.log('✅ Spotify user data received:', { 
            id: spotifyUser.id, 
            email: spotifyUser.email, 
            display_name: spotifyUser.display_name 
          });
          
          // Use Spotify info to create user session
          const success = await login(spotifyUser.email || `${spotifyUser.id}@spotify.user`, 'spotify_auth_token');
          
          if (success) {
            console.log('✅ User login successful');
            // Update user info with Spotify data
            const userData = {
              id: spotifyUser.id,
              email: spotifyUser.email || `${spotifyUser.id}@spotify.user`,
              name: spotifyUser.display_name || spotifyUser.id,
              avatar: spotifyUser.images?.[0]?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(spotifyUser.display_name || spotifyUser.id)}&background=1DB954&color=fff`,
              isSpotifyUser: true
            };
            localStorage.setItem('user', JSON.stringify(userData));
            
            // Get the previously saved redirect path
            const redirectPath = localStorage.getItem('login_redirect') || '/journal';
            localStorage.removeItem('login_redirect');
            console.log('🎯 Redirecting to:', redirectPath);
            navigate(redirectPath, { replace: true });
          } else {
            console.error('❌ User login failed');
            navigate('/login?error=user_login_failed', { replace: true });
          }
        } else {
          const errorText = await response.text();
          console.error('❌ Failed to fetch Spotify user info:', {
            status: response.status,
            statusText: response.statusText,
            error: errorText
          });
          
          // Provide more detailed error info
          if (response.status === 401) {
            navigate('/login?error=spotify_token_invalid', { replace: true });
          } else if (response.status === 403) {
            navigate('/login?error=spotify_permission_denied', { replace: true });
          } else if (response.status === 429) {
            navigate('/login?error=spotify_rate_limit', { replace: true });
          } else {
            navigate('/login?error=spotify_user_fetch_failed', { replace: true });
          }
        }
      } catch (error) {
        console.error('❌ Error processing Spotify login:', error);
        navigate('/login?error=spotify_network_error', { replace: true });
    }
    };

    handleSpotifyCallback();
  }, [navigate, login]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: '#FFFDFB',
        gap: 3
      }}
    >
      <CircularProgress 
        sx={{ 
          color: '#1DB954',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          }
        }} 
      />
      <Typography
        sx={{
          fontFamily: '"Noto Sans", sans-serif',
          fontSize: '1.1rem',
          color: '#341A00',
          letterSpacing: '0.3px',
          textAlign: 'center'
        }}
      >
        Connecting to Spotify...
      </Typography>
      <Typography
        sx={{
          fontFamily: '"Noto Sans", sans-serif',
          fontSize: '0.9rem',
          color: '#666',
          letterSpacing: '0.3px',
          textAlign: 'center'
        }}
      >
        Please wait while we set up your account
      </Typography>
    </Box>
  );
};

export default CallbackHandler;