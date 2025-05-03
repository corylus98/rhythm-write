import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';

// SVG 线条风格表情组件
const moods = [
  { label: 'Very Happy', type: 'very-happy' },
  { label: 'Happy', type: 'happy' },
  { label: 'Neutral', type: 'neutral' },
  { label: 'Sad', type: 'sad' },
  { label: 'Very Sad', type: 'very-sad' },
];

const LineMoodIcon = ({ type, selected }: { type: string; selected?: boolean }) => {
  const iconMap: Record<string, React.ReactNode> = {
    'very-happy': <path d="M8 14c2 2 6 2 8 0" stroke="currentColor" strokeWidth="2" fill="none" />, // 上扬大弧
    'happy': <path d="M8 14c2 1 6 1 8 0" stroke="currentColor" strokeWidth="2" fill="none" />, // 上扬小弧
    'neutral': <line x1="8" y1="14" x2="16" y2="14" stroke="currentColor" strokeWidth="2" />, // 横线
    'sad': <path d="M8 16c2-1 6-1 8 0" stroke="currentColor" strokeWidth="2" fill="none" />, // 下弯小弧
    'very-sad': <path d="M8 16c2-2 6-2 8 0" stroke="currentColor" strokeWidth="2" fill="none" />, // 下弯大弧
  };
  return (
    <svg width={40} height={40} viewBox="0 0 24 24">
      <circle
        cx={12}
        cy={12}
        r={10}
        stroke={selected ? "#341A00" : "#B7AFA3"}
        strokeWidth={selected ? 2.5 : 1.5}
        fill={selected ? "#F8EAF3" : "#FFFDFB"}
      />
      {React.cloneElement(iconMap[type] as React.ReactElement, {
        stroke: selected ? "#341A00" : "#B7AFA3",
      })}
    </svg>
  );
};

interface MoodCheckinStepProps {
  value: string | null;
  onChange: (mood: string) => void;
  onNext: () => void;
}

const moodTypeToValue = {
  'very-happy': 'very-happy',
  'happy': 'happy',
  'neutral': 'neutral',
  'sad': 'sad',
  'very-sad': 'very-sad',
};

const MoodCheckinStep: React.FC<MoodCheckinStepProps> = ({ value, onChange, onNext }) => (
  <Box sx={{ textAlign: 'center' }}>
    <Typography
      sx={{
        fontFamily: 'Instrument Serif, serif',
        fontSize: 40,
        color: '#341A00',
        mb: 4,
        fontStyle: 'italic',
        fontWeight: 400,
      }}
    >
      How do you feel today?
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
      {moods.map((mood) => (
        <IconButton
          key={mood.type}
          onClick={() => onChange(mood.type)}
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            p: 0,
            background: 'transparent',
            boxShadow: 'none',
          }}
          disableRipple
        >
          <LineMoodIcon type={mood.type} selected={value === mood.type} />
        </IconButton>
      ))}
    </Box>
    <Button
      variant="outlined"
      onClick={onNext}
      disabled={!value}
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

export default MoodCheckinStep; 