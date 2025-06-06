import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/Home/NavBar';
import MusicPlayer from '../components/JournalWrite/MusicPlayer';
import { Box, Typography, IconButton, Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { LineMoodIcon } from '../components/Journal/MoodCheckinStep';

interface PlaylistTrack {
  title: string;
  artist: string;
  duration: number;
  uri: string;
}

interface LocationState {
  mood: string;
  gratitude: string;
  timeGoal: number;
  playlist: PlaylistTrack[];
  title?: string;
  isHistoryView?: boolean;
}

const JournalWritePage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const navigate = useNavigate();
  
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [journalContent, setJournalContent] = useState('');
  const [title, setTitle] = useState(state?.title || '');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Get data from navigation state
  const playlist = state?.playlist || [];
  const timeGoal = state?.timeGoal || 0;
  const targetSeconds = timeGoal * 60;

  const isHistoryView = state?.isHistoryView;

  useEffect(() => {
    if (isTimerRunning && seconds < targetSeconds) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s + 1 >= targetSeconds) {
            setIsTimerRunning(false);
            return targetSeconds;
          }
          return s + 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isTimerRunning, targetSeconds, seconds]);

  // Auto-scroll logic
  useEffect(() => {
    if (!textareaRef.current) return;
    // 判断页面是否已滚动到底部
    const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
    if (atBottom) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [journalContent]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const getTimerDisplay = () => {
    return formatTime(seconds);
  };

  const getTimerProgress = () => {
    if (targetSeconds > 0) {
      return (seconds / targetSeconds) * 100;
    }
    return 0;
  };

  const handleSaveJournal = () => {
    const today = new Date().toISOString().slice(0, 10);
    let journals = JSON.parse(localStorage.getItem('journals') || '[]');
    const idx = journals.findIndex((j: any) => j.date === today);
    const newEntry = {
      title,
      content: journalContent,
      mood: state?.mood,
      gratitude: state?.gratitude,
    };
    if (idx !== -1) {
      journals[idx].entries = journals[idx].entries || [];
      journals[idx].entries.push(newEntry);
    } else {
      journals.push({ date: today, entries: [newEntry] });
    }
    localStorage.setItem('journals', JSON.stringify(journals));
    alert('Journal saved!');
    navigate('/history');
  };

  const rightContent = !isHistoryView ? (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* 移除 Timer Progress Bar */}
        <Typography sx={{ fontFamily: 'Instrument Serif, serif', fontSize: '32px', color: '#341A00', mr: 1 }}>
          {getTimerDisplay()}
        </Typography>
        <IconButton 
          onClick={() => setIsTimerRunning(prev => !prev)} 
          sx={{ color: '#341A00' }}
          disabled={seconds >= targetSeconds && targetSeconds > 0}
        >
          {isTimerRunning ? <PauseIcon sx={{ fontSize: 32 }} /> : <PlayArrowIcon sx={{ fontSize: 32 }} />}
        </IconButton>
      </Box>
      <Button
        variant="contained"
        sx={{
          bgcolor: '#341A00',
          color: '#FFFDFB',
          textTransform: 'none',
          borderRadius: 1.5,
          px: 3,
          py: 1,
          ml: 2
        }}
        onClick={handleSaveJournal}
      >
        Save Journal
      </Button>
    </>
  ) : null;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFDFB', m: 0, p: 0, boxSizing: 'border-box', overflow: 'hidden' }}>
      <NavBar rightContent={rightContent} />
      
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
      
      {/* Outer content area, width is between the two vertical lines */}
      <Box
        sx={{
          width: { xs: '100vw', md: 'calc(100vw - 480px)' },
          minWidth: 0,
          mx: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          height: 'calc(100vh - 65px)',
          gap: 4,
          px: { xs: 2, md: 4 }
        }}
      >
        {/* Main Journal Content */}
        <Box
          sx={{
            flex: 1,
            py: 8,
            position: 'relative',
            zIndex: 1,
            mt: { xs: 10, md: 12 },
            maxWidth: 600,
            paddingBottom: { xs: '90px', md: '90px' }
          }}
        >
          {/* Editable title input styled as heading */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
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
          
          {/* Session info */}
          {state && (
            <Box sx={{
              mb: 3,
              p: 2.5,
              bgcolor: '#FFFDFB',
              borderRadius: 2,
              border: '1.5px solid #E9E4DC',
              boxShadow: '0 2px 8px 0 rgba(52,26,0,0.04)',
              display: 'flex',
              alignItems: 'center',
              minHeight: 64,
              gap: 2
            }}>
              {/* Line mood icon, size 48px, main color #341A00, line style */}
              <Box sx={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LineMoodIcon type={state.mood} selected />
              </Box>
              {/* Gratitude beautification: main color, serif font, font size 1.15rem */}
              <Typography sx={{
                fontFamily: 'Instrument Serif, serif',
                color: '#341A00',
                fontSize: '1.15rem',
                fontStyle: 'italic',
                ml: 2
              }}>
                {state.gratitude ? `"${state.gratitude}"` : ''}
              </Typography>
            </Box>
          )}
          
          {/* Text input area */}
            <textarea
            ref={textareaRef}
              placeholder="Tell your story..."
            value={journalContent}
            onChange={e => setJournalContent(e.target.value)}
              style={{
                width: '100%',
                minHeight: '60vh',
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

        {/* Sidebar with Music Player */}
        {/* Removed original sidebar player */}
        {/* <Box ...> ... </Box> */}
      </Box>
      {/* 新增底部播放器，仅在 playlist 有内容时渲染 */}
      {playlist.length > 0 && (
            <MusicPlayer
              playlist={playlist}
              isTimerRunning={isTimerRunning}
              onPlayStateChange={setIsMusicPlaying}
            />
      )}
    </Box>
  );
};

export default JournalWritePage; 