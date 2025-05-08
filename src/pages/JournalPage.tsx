import React, { useState } from 'react';
import { Box } from '@mui/material';
import NavBar from '../components/Home/NavBar';
import MoodCheckinStep from '../components/Journal/MoodCheckinStep';
import GratitudeStep from '../components/Journal/GratitudeStep';
import TimeGoalStep from '../components/Journal/TimeGoalStep';
import { useNavigate } from 'react-router-dom';

// Define allowed mood types
const moodTypes = ['😊', '🙂', '😐', '🙁', '☹️'] as const;
type MoodType = typeof moodTypes[number];

const moodPlaylists = {
  '😊': [
    { title: 'Happy Vibes', duration: 3 },
    { title: 'Sunshine Walk', duration: 4 },
    { title: 'Upbeat Flow', duration: 3 },
    { title: 'Joyful Beats', duration: 5 },
  ],
  '🙂': [
    { title: 'Chill Mood', duration: 4 },
    { title: 'Easy Days', duration: 5 },
    { title: 'Smooth Ride', duration: 3 },
    { title: 'Gentle Groove', duration: 4 },
  ],
  '😐': [
    { title: 'Lo-fi Focus', duration: 5 },
    { title: 'Steady Stream', duration: 4 },
    { title: 'Neutral Notes', duration: 3 },
    { title: 'Calm Flow', duration: 4 },
  ],
  '🙁': [
    { title: 'Reflective', duration: 4 },
    { title: 'Soft Rain', duration: 5 },
    { title: 'Gentle Piano', duration: 3 },
    { title: 'Mellow Mood', duration: 4 },
  ],
  '☹️': [
    { title: 'Comfort Zone', duration: 5 },
    { title: 'Warm Blanket', duration: 4 },
    { title: 'Slow Down', duration: 3 },
    { title: 'Peaceful Night', duration: 4 },
  ],
} as const;

const PrecheckPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState<MoodType | "">("");
  const [gratitude, setGratitude] = useState('');
  const [timeGoal, setTimeGoal] = useState<number | "">("");
  const navigate = useNavigate();

  // 生成playlist，时长与timeGoal一致，内容由mood决定
  const getPlaylist = () => {
    if (!mood || !timeGoal) return [];
    const tracks = moodPlaylists[mood as MoodType] || [];
    let total = 0;
    let result = [];
    let i = 0;
    while (total < Number(timeGoal) && tracks.length > 0) {
      const track = tracks[i % tracks.length];
      if (total + track.duration > Number(timeGoal)) break;
      result.push(track);
      total += track.duration;
      i++;
    }
    // 最后一首补足时长
    if (total < Number(timeGoal) && tracks.length > 0) {
      const last = { ...tracks[i % tracks.length], duration: Number(timeGoal) - total };
      result.push(last);
    }
    return result;
  };

  // 步骤组件
  const handleMoodChange = (mood: string) => setMood(mood as MoodType);
  const steps = [
    <MoodCheckinStep key="mood" value={mood} onChange={handleMoodChange} onNext={() => mood && setStep(1)} />, 
    <GratitudeStep key="gratitude" value={gratitude} onChange={setGratitude} onNext={() => setStep(2)} />, 
    <TimeGoalStep key="time" value={timeGoal} onChange={setTimeGoal} onNext={() => timeGoal && setStep(3)} />,
    // Playlist Step
    <Box key="playlist" sx={{ textAlign: 'center', mt: 8 }}>
      <Box sx={{ fontFamily: 'Instrument Serif, serif', fontSize: 32, color: '#341A00', fontStyle: 'italic', mb: 4 }}>
        Your Playlist
      </Box>
      <Box sx={{ width: 340, mx: 'auto', mb: 4, p: 3, bgcolor: '#FFFDFB', border: '1.5px solid #341A00', borderRadius: 2 }}>
        {getPlaylist().map((track, idx) => (
          <Box key={idx} sx={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: 18, color: '#341A00', mb: 1, textAlign: 'left' }}>
            {track.title} <span style={{ float: 'right' }}>{track.duration} min</span>
          </Box>
        ))}
        <Box sx={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: 16, color: '#B7AFA3', mt: 2, textAlign: 'right' }}>
          Total: {timeGoal} min
        </Box>
          </Box>
      <Box>
        <Box
          component="button"
          onClick={() => navigate('/journal/write')}
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
            cursor: 'pointer',
              '&:hover': {
              background: '#F5E9DD',
              color: '#341A00',
              border: '1.5px solid #341A00',
              boxShadow: 'none',
            },
          }}
        >
          Start Journaling
        </Box>
      </Box>
    </Box>
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFDFB', m: 0, p: 0, boxSizing: 'border-box', overflow: 'hidden' }}>
      <NavBar />
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
          justifyContent: 'center',
          height: 'calc(100vh - 65px)',
        }}
      >
        <Box
            sx={{
            width: 420,
            py: 8,
            position: 'relative',
            zIndex: 1,
            mx: 'auto',
            mt: { xs: 10, md: 12 },
          }}
        >
          {steps[step]}
        </Box>
      </Box>
    </Box>
  );
};

export default PrecheckPage; 