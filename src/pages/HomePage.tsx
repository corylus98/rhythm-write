import React from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          mt: { xs: 8, md: 12 }
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            mb: 3,
            letterSpacing: '0.5px',
            color: '#333',
            fontWeight: 400
          }}
        >
          Welcome to Rhythm Write
        </Typography>
        
        <Typography
          variant="h5"
          sx={{
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: { xs: '1rem', md: '1.1rem' },
            color: '#666',
            mb: 8,
            maxWidth: '500px',
            lineHeight: 1.8,
            letterSpacing: '0.3px',
            fontWeight: 300
          }}
        >
          Express your thoughts while listening to mood-matched music. Let your words flow with the perfect soundtrack.
        </Typography>

        <Button
          variant="outlined"
          size="large"
          startIcon={<CreateIcon sx={{ fontSize: '1.2rem' }} />}
          onClick={() => navigate('/journal')}
          sx={{
            color: '#333',
            borderColor: '#333',
            textTransform: 'none',
            fontSize: '1rem',
            padding: '12px 32px',
            letterSpacing: '0.5px',
            mb: 12,
            '&:hover': {
              borderColor: '#666',
              backgroundColor: 'transparent',
              color: '#666'
            }
          }}
        >
          Start Writing
        </Button>

        <Box 
          sx={{ 
            display: 'flex', 
            gap: 6, 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            maxWidth: '800px'
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              backgroundColor: 'transparent',
              maxWidth: '340px',
              borderTop: '1px solid #EAEAEA'
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Instrument Serif", serif',
                mb: 2,
                fontSize: '1.2rem',
                letterSpacing: '0.3px',
                color: '#333'
              }}
            >
              Mood-Based Music
            </Typography>
            <Typography 
              sx={{
                color: '#666',
                lineHeight: 1.8,
                fontSize: '0.95rem',
                fontFamily: '"Noto Sans", sans-serif',
                fontWeight: 300
              }}
            >
              Get personalized playlist suggestions based on your current mood and writing goals.
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 4,
              backgroundColor: 'transparent',
              maxWidth: '340px',
              borderTop: '1px solid #EAEAEA'
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Instrument Serif", serif',
                mb: 2,
                fontSize: '1.2rem',
                letterSpacing: '0.3px',
                color: '#333'
              }}
            >
              Focus Timer
            </Typography>
            <Typography 
              sx={{
                color: '#666',
                lineHeight: 1.8,
                fontSize: '0.95rem',
                fontFamily: '"Noto Sans", sans-serif',
                fontWeight: 300
              }}
            >
              Set your writing duration and stay focused with our built-in timer.
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage; 