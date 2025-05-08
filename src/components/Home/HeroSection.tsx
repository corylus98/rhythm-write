import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import vinylImg from '../../assets/vinyl.png';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 1, md: 3 },
          py: { xs: 10, md: 14 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          minHeight: 500,
        }}
      >
        {/* Left: Title, subtitle, button */}
        <Box sx={{ flex: 1, minWidth: 320, pr: { md: 6 }, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography component="h1" sx={{ fontFamily: 'Instrument Serif, serif', fontWeight: 400, fontSize: { xs: '2.8rem', md: '3.5rem', lg: '4rem' }, color: '#341A00', mb: 3, lineHeight: 1.08 }}>
            <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 400 }}>Write</Box> your thoughts. <Box component="span" sx={{ fontStyle: 'normal', fontWeight: 400, display: 'inline' }}>Let <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 400, display: 'inline' }}>rhythm</Box> carry them.</Box>
          </Typography>
          <Typography sx={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: { xs: '1.1rem', md: '1.2rem' }, color: '#341A00', mb: 4, maxWidth: 480, lineHeight: 1.7 }}>
            RhythmWrite helps you reflect, relax, and reconnect—with AI guidance and a playlist just for you.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate('/journal')}
            sx={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontWeight: 500,
              fontSize: '1.2rem',
              px: 4,
              py: 1.2,
              borderRadius: 1.5,
              boxShadow: 'none',
              background: '#FFFDFB',
              color: '#341A00',
              border: '1.5px solid #341A00',
              textTransform: 'none',
              transition: 'background 0.3s',
              mb: 2,
              '&:hover': {
                background: '#F5E9DD',
                color: '#341A00',
                border: '1.5px solid #341A00',
                boxShadow: 'none',
              },
            }}
          >
            Start Journaling
          </Button>
        </Box>
        {/* Right: Vinyl image */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: { xs: 6, md: 0 }, overflow: 'visible' }}>
          <Box
            component="img"
            src={vinylImg}
            alt="vinyl"
            sx={{ width: { xs: 260, md: 420, lg: 520 }, height: 'auto', display: 'block', mr: { md: '-8vw' } }}
          />
        </Box>
      </Box>
      {/* 全宽分割线 */}
      <Box sx={{ width: '100vw', position: 'relative', left: '50%', right: '50%', ml: '-50vw', mr: '-50vw', height: '1px', bgcolor: '#341A00' }} />
    </>
  );
};

export default HeroSection; 