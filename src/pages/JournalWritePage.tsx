import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../components/Home/NavBar';
import { Box, Typography, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const JournalWritePage: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [playing, setPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const rightContent = (
    <>
      <Typography sx={{ fontFamily: 'Instrument Serif, serif', fontSize: 28, color: '#341A00', mr: 1 }}>
        {formatTime(seconds)}
      </Typography>
      <IconButton onClick={() => setPlaying(p => !p)} sx={{ color: '#341A00' }}>
        {playing ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
    </>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFDFB', m: 0, p: 0, boxSizing: 'border-box', overflow: 'hidden' }}>
      <NavBar rightContent={rightContent} />
      {/* 左竖线 */}
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
      {/* 右竖线 */}
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
      {/* 内容区外层，宽度为两竖线之间 */}
      <Box
        sx={{
          width: { xs: '100vw', md: 'calc(100vw - 480px)' },
          minWidth: 0,
          mx: 'auto',
          display: 'flex',
          justifyContent: 'flex-start', // 靠左
          height: 'calc(100vh - 65px)',
        }}
      >
        <Box
          sx={{
            width: 420,
            py: 8,
            position: 'relative',
            zIndex: 1,
            mt: { xs: 10, md: 12 },
            pl: 8,
          }}
        >
          {/* Editable title input styled as heading */}
          <input
            type="text"
            placeholder="Start Journaling..."
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '2.25rem',
              fontWeight: 400,
              fontFamily: 'Instrument Serif, serif',
              background: 'transparent',
              color: '#341A00',
              marginBottom: '2.5rem',
              padding: 0,
              boxSizing: 'border-box',
            }}
          />
          {/* Row: plus icon and textarea */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <IconButton sx={{ border: '2px solid #341A00', color: '#341A00', width: 48, height: 48, flexShrink: 0, mt: 0.5 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#341A00" strokeWidth="2"/><path d="M12 8v8M8 12h8" stroke="#341A00" strokeWidth="2" strokeLinecap="round"/></svg>
            </IconButton>
            <textarea
              placeholder="Tell your story..."
              style={{
                width: '100%',
                minHeight: 120,
                border: 'none',
                outline: 'none',
                fontSize: '1.15rem',
                fontFamily: 'Instrument Sans, sans-serif',
                background: 'transparent',
                color: '#341A00',
                resize: 'none',
                lineHeight: 1.7,
                padding: 0,
                boxSizing: 'border-box',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default JournalWritePage; 