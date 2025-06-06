import React from 'react';
import { Box, Typography } from '@mui/material';

const QuoteSection: React.FC = () => (
  <Box sx={{
    minHeight: { xs: 260, md: 340 },
    py: { xs: 7, md: 10 },
    px: { xs: 1, md: 3 },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  }}>
    <Box sx={{ width: '100vw', position: 'absolute', top: 0, left: '50%', right: '50%', ml: '-50vw', mr: '-50vw', height: '1px', bgcolor: '#341A00' }} />
    <Box sx={{ maxWidth: 900, mx: 'auto', textAlign: 'center', zIndex: 1, position: 'relative' }}>
      <Typography sx={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 28, color: '#341A00', mb: 4, lineHeight: 1.7 }}>
        “Some days are hard to explain. RhythmWrite listens.”
      </Typography>
      <Typography sx={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 28, color: '#341A00', mb: 4, lineHeight: 1.7 }}>
        “Not every journal entry needs to be perfect. Just real.”
      </Typography>
    </Box>
    <Box sx={{ width: '100vw', position: 'absolute', bottom: 0, left: '50%', right: '50%', ml: '-50vw', mr: '-50vw', height: '1px', bgcolor: '#341A00' }} />
  </Box>
);

export default QuoteSection; 