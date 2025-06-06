import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Container,
  Link,
  InputAdornment,
  IconButton,
  Divider
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../components/Home/NavBar';
import { buildAuthUrl, exchangeCodeForToken } from '../config/spotify';

const LoginPage: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { login, register, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    // Check for error messages in URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const urlError = urlParams.get('error');
    
    if (urlError) {
      // Map error codes to user-friendly messages
      const errorMessages: Record<string, string> = {
        'spotify_user_fetch_failed': 'Failed to fetch your Spotify profile. Please try again.',
        'spotify_token_invalid': 'Spotify authentication expired. Please sign in again.',
        'spotify_permission_denied': 'Spotify access was denied. Please check your account permissions.',
        'spotify_rate_limit': 'Too many requests to Spotify. Please wait a moment and try again.',
        'spotify_network_error': 'Network error while connecting to Spotify. Please check your connection.',
        'spotify_auth_failed': 'Spotify authentication failed. Please try again.',
        'user_login_failed': 'Failed to create user session. Please try again.',
        'access_denied': 'Access was denied. Please try again.',
        'invalid_client': 'Invalid Spotify application configuration. Please contact support.',
        'invalid_grant': 'Invalid authorization grant. Please try signing in again.',
        'unsupported_response_type': 'Unsupported response type. Please contact support.'
      };
      
      const friendlyMessage = errorMessages[urlError] || `Authentication error: ${urlError}`;
      setError(friendlyMessage);
      
      // Clear the error from URL
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    // Check if this is a callback from Spotify (should be handled by CallbackHandler, but just in case)
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state) {
      // Handle the authorization code
      handleAuthorizationCode(code, state);
      return;
    }

    // Check if user is already logged in
    const token = localStorage.getItem('spotify_access_token');
    if (token) {
      navigate('/journal');
    }
  }, [navigate]);

  const handleAuthorizationCode = async (code: string, state: string) => {
    try {
      const tokenData = await exchangeCodeForToken(code, state);
      
      // Store the access token
      localStorage.setItem('spotify_access_token', tokenData.access_token);
      localStorage.setItem('spotify_token_expires_at', 
        (Date.now() + tokenData.expires_in * 1000).toString()
      );
      
      if (tokenData.refresh_token) {
        localStorage.setItem('spotify_refresh_token', tokenData.refresh_token);
      }

      console.log('Spotify login successful!');
      navigate('/journal');
    } catch (error) {
      console.error('Error exchanging code for token:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLoginMode) {
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }
      
      const success = await login(email, password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Login failed. Please check your email and password');
      }
    } else {
      if (!name || !email || !password) {
        setError('Please fill in all fields');
        return;
      }
      
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      
      const success = await register(name, email, password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Registration failed. Please try again');
      }
    }
  };

  const handleSpotifyLogin = async () => {
    // Clear any existing Spotify data before starting new auth flow
    localStorage.removeItem('spotify_token');
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_token_expires_at');
    localStorage.removeItem('spotify_code_verifier');
    localStorage.removeItem('spotify_state');
    
    console.log('🔄 Starting fresh Spotify authentication...');
    const authUrl = await buildAuthUrl();
    window.location.href = authUrl;
  };

  const switchMode = () => {
    setIsLoginMode(!isLoginMode);
    setError('');
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFDFB', m: 0, p: 0, boxSizing: 'border-box' }}>
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

      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: { xs: 12, md: 16 },
            pb: 8,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: '"Instrument Serif", serif',
              fontSize: { xs: '2.5rem', md: '3rem' },
              mb: 2,
              color: '#341A00',
              fontWeight: 400,
              textAlign: 'center',
              fontStyle: 'italic'
            }}
          >
            {isLoginMode ? 'Welcome Back' : 'Join RhythmWrite'}
          </Typography>

          <Typography
            sx={{
              fontFamily: '"Noto Sans", sans-serif',
              fontSize: '1rem',
              color: '#666',
              mb: 4,
              textAlign: 'center',
              letterSpacing: '0.3px',
              lineHeight: 1.6
            }}
          >
            {isLoginMode 
              ? 'Sign in to continue your journaling journey'
              : 'Create an account to start writing with rhythm'
            }
          </Typography>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                width: '100%',
                backgroundColor: 'transparent',
                color: '#d32f2f',
                border: '1px solid #d32f2f',
                borderRadius: 1
              }}
            >
              {error}
            </Alert>
          )}

          <Box sx={{ width: '100%', maxWidth: 400 }}>
            {/* Spotify Login Button */}
            <Button
              fullWidth
              variant="outlined"
              onClick={handleSpotifyLogin}
              sx={{
                mb: 3,
                py: 1.5,
                fontSize: '1.1rem',
                fontFamily: '"Instrument Sans", sans-serif',
                fontWeight: 500,
                textTransform: 'none',
                backgroundColor: '#1DB954',
                color: '#FFFFFF',
                border: '2px solid #1DB954',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                '&:hover': {
                  backgroundColor: '#1ed760',
                  borderColor: '#1ed760',
                },
              }}
            >
              <Box
                component="img"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40NzcgMiAyIDYuNDc3IDIgMTJTNi40NzcgMjIgMTIgMjJTMjIgMTcuNTIzIDIyIDEyUzE3LjUyMyAyIDEyIDJaTTE3LjA0IDE0LjI4NEMxNi43NDUgMTQuMjg0IDE2LjYzNCAxNC4yNzEgMTYuNTM0IDE0LjI1OEMxNC42NDggMTMuNzgzIDEyLjMyNSAxMy42IDEwLjEyNSAxNC4yNzFDOS44MzkgMTQuMzU3IDkuNTM5IDE0LjQ4NCA5LjI3OCAxNC41MThDOC45OTIgMTQuNTUxIDguNzA2IDE0LjQzOCA4LjUzMyAxNC4xNzNDOC4zNiAxMy45MDggOC4zMjcgMTMuNTU0IDguNDM5IDEzLjI2OEM4LjU1MiAxMi45ODMgOC44NTggMTIuNjc3IDkuMTEgMTIuNjQ0QzEwLjM1IDEyLjI2OCAxMS45NTMgMTIuMTQ4IDEzLjc5MyAxMi40M0MxNC43MzMgMTIuNTgyIDE1LjY5NSAxMi43ODggMTYuNTcxIDEzLjE2NEMxNi44OTEgMTMuMjk3IDE3LjE0MyAxMy42MDcgMTcuMTQzIDEzLjk4QzE3LjE0MyAxNC4xMyAxNy4wODggMTQuMjg0IDE3LjA0IDE0LjI4NFpNMTguMTAzIDExLjY0OEMxNy43ODMgMTEuNjQ4IDE3LjY0OSAxMS42MzUgMTcuNTM3IDExLjYwMkMxNS4yNDUgMTEuMDUgMTIuNzAzIDEwLjgzMyAxMC4yODEgMTEuNTdDOS45NjIgMTEuNjcgOS42MSAxMS44MjMgOS4zMjEgMTEuODU2Qzg5IDExLjg5IDguNjU5IDExLjc2MiA4LjQ2OCAxMS40N0M4LjI3NyAxMS4xNzggOC4yNDQgMTAuODAwIDguMzc3IDEwLjQ3NEM4LjUxIDEwLjE0OCA4Ljg2MyA5LjgwOSA5LjE0NSA5Ljc3NkMxMC42ODIgOS4zMTYgMTIuNjM3IDkuMTU3IDE0Ljc5MSA5LjQ5OEMxNS45NSA5LjY4NSAxNy4xMjggOS45MzQgMTguMTY5IDEwLjM3M0MxOC41MjMgMTAuNTM5IDE4LjgwNyAxMC44ODkgMTguODA3IDExLjMxNEMxOC44MDcgMTEuNDY0IDE4Ljc0NSAxMS42NDggMTguNjQxIDExLjY0OEgxOC4xMDNaTTE5LjQ0NSA4LjY5M0MxOS4wNzEgOC42OTMgMTguOTE5IDguNjggMTguNzc4IDguNjM5QzE2LjE1MyA3Ljk2OCAxMy4xNjggNy43MzQgMTAuNDE5IDguNzE2QzEwLjAzOSA4LjgzNiA5LjYwMyA5LjAyMyA5LjI2NCA5LjA1QzguODY5IDkuMDg3IDguNDc0IDguOTIxIDguMjY1IDguNTczQzguMDU1IDguMjI1IDguMDIyIDcuNzc1IDguMTggNy4zODdDOC4zMzggNi45OTkgOC43NDggNi41OTMgOS4wOTEgNi41NTZDMTAuOTkyIDYuMDAzIDEzLjM4MSA1LjgyNyAxNi4xODMgNi42MTJDMTcuNTQ4IDYuOTg1IDE4Ljk1MyA3LjQ1OSAyMC4xOCA4LjA2NEMyMC41OCA4LjI1MyAyMC45MSA4LjY3MyAyMC45MSA5LjE1OEMyMC45MSA5LjMyOCAyMC44NCA5LjQ5OCAyMC43NDYgOS42MjJDMjAuNDg0IDkuNzQyIDIwLjIyNSA5LjgyIDIwLjAwNCA5LjgyTDE5LjQ0NSA4LjY5M1oiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo="
                alt="Spotify"
                sx={{ width: 24, height: 24 }}
              />
              CONTINUE WITH SPOTIFY
            </Button>

            {/* Divider */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Divider sx={{ flex: 1, borderColor: '#B7AFA3' }} />
              <Typography
                sx={{
                  px: 2,
                  fontFamily: '"Noto Sans", sans-serif',
                  fontSize: '0.9rem',
                  color: '#666'
                }}
              >
                or
              </Typography>
              <Divider sx={{ flex: 1, borderColor: '#B7AFA3' }} />
            </Box>

            {/* Traditional Login Form */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 3
              }}
            >
              {!isLoginMode && (
                <TextField
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontFamily: '"Noto Sans", sans-serif',
                      backgroundColor: 'transparent',
                      '& fieldset': {
                        borderColor: '#B7AFA3',
                      },
                      '&:hover fieldset': {
                        borderColor: '#341A00',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#341A00',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      fontFamily: '"Noto Sans", sans-serif',
                      color: '#666',
                      '&.Mui-focused': {
                        color: '#341A00',
                      },
                    },
                  }}
                />
              )}

              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontFamily: '"Noto Sans", sans-serif',
                    backgroundColor: 'transparent',
                    '& fieldset': {
                      borderColor: '#B7AFA3',
                    },
                    '&:hover fieldset': {
                      borderColor: '#341A00',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#341A00',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontFamily: '"Noto Sans", sans-serif',
                    color: '#666',
                    '&.Mui-focused': {
                      color: '#341A00',
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: '#666' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontFamily: '"Noto Sans", sans-serif',
                    backgroundColor: 'transparent',
                    '& fieldset': {
                      borderColor: '#B7AFA3',
                    },
                    '&:hover fieldset': {
                      borderColor: '#341A00',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#341A00',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontFamily: '"Noto Sans", sans-serif',
                    color: '#666',
                    '&.Mui-focused': {
                      color: '#341A00',
                    },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontFamily: '"Instrument Sans", sans-serif',
                  fontWeight: 500,
                  textTransform: 'none',
                  backgroundColor: '#341A00',
                  color: '#FFFDFB',
                  border: '2px solid #341A00',
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: '#FFFDFB',
                    color: '#341A00',
                    border: '2px solid #341A00',
                  },
                  '&:disabled': {
                    backgroundColor: '#B7AFA3',
                    color: '#666',
                    border: '2px solid #B7AFA3',
                  },
                }}
              >
                {isLoading 
                  ? (isLoginMode ? 'SIGNING IN...' : 'CREATING ACCOUNT...') 
                  : (isLoginMode ? 'SIGN IN' : 'CREATE ACCOUNT')
                }
              </Button>

              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography
                  sx={{
                    fontFamily: '"Noto Sans", sans-serif',
                    fontSize: '0.9rem',
                    color: '#666',
                    mb: 1
                  }}
                >
                  {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
                </Typography>
                <Link
                  component="button"
                  type="button"
                  onClick={switchMode}
                  sx={{
                    fontFamily: '"Noto Sans", sans-serif',
                    fontSize: '0.9rem',
                    color: '#341A00',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    border: 'none',
                    backgroundColor: 'transparent',
                    '&:hover': {
                      color: '#555',
                    },
                  }}
                >
                  {isLoginMode ? 'SIGN UP NOW' : 'SIGN IN INSTEAD'}
                </Link>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography
              sx={{
                fontFamily: '"Noto Sans", sans-serif',
                fontSize: '0.8rem',
                color: '#999',
                lineHeight: 1.5,
                mb: 1
              }}
            >
              <strong>Recommended:</strong> Use Spotify login for the full music experience
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Noto Sans", sans-serif',
                fontSize: '0.8rem',
                color: '#999',
                lineHeight: 1.5
              }}
            >
              Demo version: Use any email and 6+ character password for regular login
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage; 