import React from 'react';
import { Box, Typography } from '@mui/material';

const QuoteSection: React.FC = () => (
  <Box sx={{ py: { xs: 7, md: 10 }, px: { xs: 1, md: 3 } }}>
    <Box sx={{ width: '100vw', position: 'relative', left: '50%', right: '50%', ml: '-50vw', mr: '-50vw', height: '1px', bgcolor: '#341A00', mb: 8 }} />
    <Box sx={{ maxWidth: 900, mx: 'auto', textAlign: 'center' }}>
      <Typography sx={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 28, color: '#341A00', mb: 4, lineHeight: 1.7 }}>
        “Some days are hard to explain. RhythmWrite listens.”
      </Typography>
      <Typography sx={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 28, color: '#341A00', mb: 4, lineHeight: 1.7 }}>
        “Not every journal entry needs to be perfect. Just real.”
      </Typography>
    </Box>
  </Box>
);

export default QuoteSection; 