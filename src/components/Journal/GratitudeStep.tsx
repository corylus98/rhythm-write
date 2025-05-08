import React from 'react';
import { Box, Typography, Button, TextField, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface GratitudeStepProps {
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
  onBack?: () => void;
}

const GratitudeStep: React.FC<GratitudeStepProps> = ({ value, onChange, onNext, onBack }) => (
  <Box sx={{ textAlign: 'center', position: 'relative' }}>
    {onBack && (
      <IconButton onClick={onBack} sx={{ position: 'absolute', left: 0, top: 0 }}>
        <ArrowBackIcon sx={{ color: '#341A00' }} />
      </IconButton>
    )}
    <Typography sx={{ fontFamily: 'Instrument Serif, serif', fontSize: 32, color: '#341A00', mb: 4, fontStyle: 'italic' }}>
      Today, I'm grateful for
    </Typography>
    <TextField
      variant="outlined"
      placeholder="Tell me about your day..."
      fullWidth
      multiline
      minRows={6}
      value={value}
      onChange={e => onChange(e.target.value)}
      sx={{
        mb: 4,
        bgcolor: '#FFFDFB',
        borderRadius: 2,
        '& .MuiOutlinedInput-root': {
          fontFamily: 'Instrument Sans, sans-serif',
          fontSize: 18,
          color: '#341A00',
          borderRadius: 2,
          background: '#FFFDFB',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#341A00',
          borderWidth: '2px',
        },
      }}
    />
    <Button
      variant="outlined"
      onClick={onNext}
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
        '&:hover': {
          background: '#F5E9DD',
          color: '#341A00',
          border: '1.5px solid #341A00',
          boxShadow: 'none',
        },
      }}
    >
      Next
    </Button>
  </Box>
);

export default GratitudeStep; 