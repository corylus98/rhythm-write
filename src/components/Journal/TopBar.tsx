import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';

const TopBar: React.FC = () => {
  return (
    <Box sx={{ width: '100vw', bgcolor: '#FFFDFB', position: 'fixed', top: 0, left: 0, zIndex: 1200 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: '48px', pt: '20px', pb: '12px', maxWidth: 1400, mx: 'auto' }}>
        <Typography sx={{ fontFamily: 'Instrument Serif, serif', fontWeight: 400, fontSize: '32px', color: '#341A00' }}>
          RhythmWrite
        </Typography>
        <Box>
          <IconButton
            sx={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 0 }}
            disableRipple
            aria-label="menu"
          >
            <Box sx={{ width: 24, height: 2, bgcolor: '#341A00', mb: 0.7, borderRadius: 1 }} />
            <Box sx={{ width: 24, height: 2, bgcolor: '#341A00', mb: 0.7, borderRadius: 1 }} />
            <Box sx={{ width: 24, height: 2, bgcolor: '#341A00', borderRadius: 1 }} />
          </IconButton>
        </Box>
      </Box>
      {/* 全宽分割线 */}
      <Box sx={{ width: '100vw', position: 'relative', left: '50%', right: '50%', ml: '-50vw', mr: '-50vw', height: '1px', bgcolor: '#341A00' }} />
    </Box>
  );
};

export default TopBar; 