import React from 'react';
import { Box, Typography, Button, TextField, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface TimeGoalStepProps {
  value: number | '';
  onChange: (val: number | '') => void;
  onNext: () => void;
  onBack?: () => void;
}

const TimeGoalStep: React.FC<TimeGoalStepProps> = ({ value, onChange, onNext, onBack }) => (
  <Box sx={{ textAlign: 'center', position: 'relative' }}>
    {onBack && (
      <IconButton onClick={onBack} sx={{ position: 'absolute', left: 0, top: 0 }}>
        <ArrowBackIcon sx={{ color: '#341A00' }} />
      </IconButton>
    )}
    <Typography sx={{ fontFamily: 'Instrument Serif, serif', fontSize: 32, color: '#341A00', mb: 4, fontStyle: 'italic' }}>
      My journal time goal today
    </Typography>
    <TextField
      variant="outlined"
      placeholder="e.g. 10 minutes"
      fullWidth
      type="number"
      value={value}
      onChange={e => {
        const val = e.target.value;
        onChange(val === '' ? '' : Number(val));
      }}
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
      disabled={!value || value <= 0}
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

export default TimeGoalStep; 