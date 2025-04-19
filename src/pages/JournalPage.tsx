import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  IconButton,
  Button,
  Stack,
  IconButtonProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useSpotifyPlayer } from '../hooks/useSpotifyPlayer';
import Navbar from '../components/Navbar';

interface MoodPlaylist {
  name: string;
  uri: string;
}

interface JournalEntry {
  content: string;
  mood: string;
  journalTimeGoal: number;
  gratitude: string;
}

interface PlaylistSuggestion {
  name: string;
  duration: number;
  trackCount: number;
  spotifyUri?: string;
}

interface MoodIconProps extends IconButtonProps {
  selected?: boolean;
  moodColor?: string;
}

const LeftColumn = styled(Box)({
  width: '280px',
  height: 'calc(100vh - 80px)',
  borderRight: '1px solid #EAEAEA',
  padding: '24px 20px',
  position: 'fixed',
  left: 0,
  top: '80px',
  backgroundColor: 'white',
  overflowY: 'auto',
  overflowX: 'hidden',
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
  },
});

const RightColumn = styled(Box)({
  marginLeft: '280px',
  minHeight: 'calc(100vh - 80px)',
  padding: '40px 60px',
  marginTop: '80px',
  backgroundColor: 'white'
});

const MoodContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '6px',
  marginBottom: '24px',
});

const MoodIcon = styled(IconButton)<MoodIconProps>(({ theme, selected, moodColor }) => ({
  width: '36px',
  height: '36px',
  minWidth: '36px',
  borderRadius: '50%',
  backgroundColor: selected ? moodColor || theme.palette.primary.light : '#F5F5F5',
  transition: 'all 0.2s ease',
  padding: 0,
  '&:hover': {
    backgroundColor: selected ? moodColor || theme.palette.primary.light : '#EAEAEA',
  },
  '& svg': {
    width: '20px',
    height: '20px',
  }
}));

const MoodSvgIcon = styled('svg')({
  width: '24px',
  height: '24px',
});

const EditableTitle = styled(TextField)({
  '& .MuiInputBase-input': {
    fontFamily: '"Instrument Serif", serif',
    fontSize: '2.5rem',
    fontWeight: 400,
    color: '#333',
    padding: '0',
  },
  '& .MuiInput-underline:before': {
    borderBottom: 'none',
  },
  '& .MuiInput-underline:hover:before': {
    borderBottom: 'none',
  },
  '& .MuiInput-underline:after': {
    borderBottom: 'none',
  },
}) as typeof TextField;

const SectionTitle = styled(Typography)({
  fontFamily: '"Instrument Serif", serif',
  fontSize: '1.125rem',
  fontWeight: 400,
  color: '#333',
  marginBottom: '1.5rem',
});

const GratefulInput = styled(TextField)({
  '& .MuiInputBase-input': {
    fontSize: '1rem',
    fontFamily: '"Noto Sans", sans-serif',
    color: '#333',
  },
  '& .MuiInput-underline:before': {
    borderBottom: 'none',
  },
  '& .MuiInput-underline:hover:before': {
    borderBottom: 'none',
  },
  '& .MuiInput-underline:after': {
    borderBottom: 'none',
  },
}) as typeof TextField;

const CustomTimeInput = styled(TextField)({
  '& .MuiInputBase-input': {
    fontSize: '1rem',
    fontFamily: '"Noto Sans", sans-serif',
    color: '#333',
  },
  '& .MuiInput-underline:before': {
    borderBottom: 'none',
  },
  '& .MuiInput-underline:hover:before': {
    borderBottom: 'none',
  },
  '& .MuiInput-underline:after': {
    borderBottom: 'none',
  },
}) as typeof TextField;

const JournalPage: React.FC = () => {
  const [entry, setEntry] = useState<JournalEntry>({
    content: '',
    mood: '',
    journalTimeGoal: 15,
    gratitude: '',
  });
  
  const [suggestedPlaylist, setSuggestedPlaylist] = useState<PlaylistSuggestion | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isConnected, isPlaying, playPlaylist, pausePlayback } = useSpotifyPlayer();

  const [customTime, setCustomTime] = useState<string>('');
  const [journalTitle, setJournalTitle] = useState<string>('Start Journaling');
  
  const moods = [
    { 
      label: 'Very Happy',
      color: '#FFE5E5', // 柔和的粉红色
      icon: (selected: boolean) => (
        <MoodSvgIcon viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="none" stroke={selected ? '#FF9999' : '#666'} strokeWidth="2"/>
          <path d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z" fill={selected ? '#FF9999' : '#666'}/>
          <path d="M28 18C29.1046 18 30 17.1046 30 16C30 14.8954 29.1046 14 28 14C26.8954 14 26 14.8954 26 16C26 17.1046 26.8954 18 28 18Z" fill={selected ? '#FF9999' : '#666'}/>
          <path d="M10 24C10 24 14 28 20 28C26 28 30 24 30 24" stroke={selected ? '#FF9999' : '#666'} strokeWidth="2" strokeLinecap="round"/>
        </MoodSvgIcon>
      )
    },
    { 
      label: 'Happy',
      color: '#FFF2E5', // 柔和的橙色
      icon: (selected: boolean) => (
        <MoodSvgIcon viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="none" stroke={selected ? '#FFB366' : '#666'} strokeWidth="2"/>
          <path d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z" fill={selected ? '#FFB366' : '#666'}/>
          <path d="M28 18C29.1046 18 30 17.1046 30 16C30 14.8954 29.1046 14 28 14C26.8954 14 26 14.8954 26 16C26 17.1046 26.8954 18 28 18Z" fill={selected ? '#FFB366' : '#666'}/>
          <path d="M10 22C10 22 14 26 20 26C26 26 30 22 30 22" stroke={selected ? '#FFB366' : '#666'} strokeWidth="2" strokeLinecap="round"/>
        </MoodSvgIcon>
      )
    },
    { 
      label: 'Neutral',
      color: '#E5F2FF', // 柔和的蓝色
      icon: (selected: boolean) => (
        <MoodSvgIcon viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="none" stroke={selected ? '#99CCFF' : '#666'} strokeWidth="2"/>
          <path d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z" fill={selected ? '#99CCFF' : '#666'}/>
          <path d="M28 18C29.1046 18 30 17.1046 30 16C30 14.8954 29.1046 14 28 14C26.8954 14 26 14.8954 26 16C26 17.1046 26.8954 18 28 18Z" fill={selected ? '#99CCFF' : '#666'}/>
          <line x1="10" y1="24" x2="30" y2="24" stroke={selected ? '#99CCFF' : '#666'} strokeWidth="2" strokeLinecap="round"/>
        </MoodSvgIcon>
      )
    },
    { 
      label: 'Sad',
      color: '#E5E5FF', // 柔和的紫色
      icon: (selected: boolean) => (
        <MoodSvgIcon viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="none" stroke={selected ? '#9999FF' : '#666'} strokeWidth="2"/>
          <path d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z" fill={selected ? '#9999FF' : '#666'}/>
          <path d="M28 18C29.1046 18 30 17.1046 30 16C30 14.8954 29.1046 14 28 14C26.8954 14 26 14.8954 26 16C26 17.1046 26.8954 18 28 18Z" fill={selected ? '#9999FF' : '#666'}/>
          <path d="M30 28C30 28 26 24 20 24C14 24 10 28 10 28" stroke={selected ? '#9999FF' : '#666'} strokeWidth="2" strokeLinecap="round"/>
        </MoodSvgIcon>
      )
    },
    { 
      label: 'Very Sad',
      color: '#E5E5E5', // 柔和的灰色
      icon: (selected: boolean) => (
        <MoodSvgIcon viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="none" stroke={selected ? '#999999' : '#666'} strokeWidth="2"/>
          <path d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z" fill={selected ? '#999999' : '#666'}/>
          <path d="M28 18C29.1046 18 30 17.1046 30 16C30 14.8954 29.1046 14 28 14C26.8954 14 26 14.8954 26 16C26 17.1046 26.8954 18 28 18Z" fill={selected ? '#999999' : '#666'}/>
          <path d="M30 30C30 30 26 26 20 26C14 26 10 30 10 30" stroke={selected ? '#999999' : '#666'} strokeWidth="2" strokeLinecap="round"/>
        </MoodSvgIcon>
      )
    }
  ];

  const handleMoodSelect = (moodLabel: string) => {
    console.log('Selected mood:', moodLabel); // Debug log
    setEntry(prev => ({ ...prev, mood: moodLabel }));
    setSuggestedPlaylist(null); // Reset playlist when mood changes
  };

  const handleTimeGoalChange = (minutes: number | string) => {
    const newTime = typeof minutes === 'string' ? parseInt(minutes, 10) : minutes;
    if (!isNaN(newTime) && newTime > 0 && newTime <= 180) {
      setEntry(prev => ({ ...prev, journalTimeGoal: newTime }));
      if (typeof minutes === 'string') {
        setCustomTime(minutes);
      } else {
        setCustomTime('');
      }
    }
  };

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value, 10) > 0 && parseInt(value, 10) <= 180)) {
      setCustomTime(value);
      if (value && !isNaN(parseInt(value, 10))) {
        handleTimeGoalChange(value);
      }
    }
  };

  const getMoodPlaylist = () => {
    console.log('Getting playlist for mood:', entry.mood); // Debug log
    
    if (!entry.mood) {
      console.log('No mood selected'); // Debug log
      return;
    }

    const moodPlaylists: Record<string, MoodPlaylist> = {
      'Very Happy': { name: "Upbeat Vibes", uri: "spotify:playlist:xxxxx" },
      'Happy': { name: "Happy Vibes", uri: "spotify:playlist:xxxxx" },
      'Neutral': { name: "Chill Beats", uri: "spotify:playlist:xxxxx" },
      'Sad': { name: "Melancholic Melodies", uri: "spotify:playlist:xxxxx" },
      'Very Sad': { name: "Comfort Sounds", uri: "spotify:playlist:xxxxx" }
    };

    const playlist = moodPlaylists[entry.mood];
    console.log('Found playlist:', playlist); // Debug log

    if (!playlist) {
      console.log('No playlist found for mood:', entry.mood); // Debug log
      return;
    }

    setSuggestedPlaylist({
      name: playlist.name,
      duration: entry.journalTimeGoal,
      trackCount: Math.ceil(entry.journalTimeGoal / 3.5),
      spotifyUri: playlist.uri
    });
  };

  const handlePlayback = (uri: string) => {
    if (isPlaying) {
      pausePlayback();
    } else {
      playPlaylist(uri);
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <LeftColumn>
          <SectionTitle>Mood Checkin</SectionTitle>
          <MoodContainer>
            {moods.map((mood) => (
              <MoodIcon
                key={mood.label}
                selected={entry.mood === mood.label}
                moodColor={mood.color}
                onClick={() => handleMoodSelect(mood.label)}
              >
                {mood.icon(entry.mood === mood.label)}
              </MoodIcon>
            ))}
          </MoodContainer>

          <Box sx={{ mb: 3 }}>
            <SectionTitle>Today, I'm Grateful for</SectionTitle>
            <GratefulInput
              multiline
              rows={2}
              value={entry.gratitude}
              onChange={(e) => setEntry(prev => ({ ...prev, gratitude: e.target.value }))}
              placeholder="Write your gratitude..."
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <SectionTitle>Journal Time Goal</SectionTitle>
            <Stack spacing={1}>
              <Stack direction="row" spacing={0.75}>
                {[15, 30, 45].map((minutes) => (
                  <Button
                    key={minutes}
                    variant={entry.journalTimeGoal === minutes ? "contained" : "outlined"}
                    onClick={() => handleTimeGoalChange(minutes)}
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      padding: '6px 0',
                      backgroundColor: entry.journalTimeGoal === minutes ? '#333' : 'transparent',
                      color: entry.journalTimeGoal === minutes ? 'white' : '#333',
                      border: '1px solid #333',
                      '&:hover': {
                        backgroundColor: entry.journalTimeGoal === minutes ? '#444' : '#f5f5f5',
                      }
                    }}
                  >
                    {minutes}m
                  </Button>
                ))}
              </Stack>
              <CustomTimeInput
                type="number"
                placeholder="Custom time (min)"
                value={customTime}
                onChange={handleCustomTimeChange}
                inputProps={{
                  min: 1,
                  max: 180,
                  step: 1
                }}
              />
            </Stack>
          </Box>

          <Button
            fullWidth
            onClick={getMoodPlaylist}
            disabled={!entry.mood}
            sx={{
              backgroundColor: '#F5F5F5',
              color: entry.mood ? '#333' : '#999',
              textTransform: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontFamily: '"Instrument Serif", serif',
              fontSize: '1rem',
              fontStyle: 'italic',
              '&:hover': {
                backgroundColor: entry.mood ? '#EAEAEA' : '#F5F5F5',
              },
              '&.Mui-disabled': {
                backgroundColor: '#F5F5F5',
                color: '#999',
                cursor: 'not-allowed'
              }
            }}
          >
            Get your Playlist
          </Button>

          {suggestedPlaylist && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: '#666' }}>
                {suggestedPlaylist.name}
              </Typography>
              <Button
                variant="text"
                onClick={() => handlePlayback(suggestedPlaylist.spotifyUri || '')}
                startIcon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                sx={{ 
                  color: '#333',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#666',
                  }
                }}
              >
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
            </Box>
          )}
        </LeftColumn>

        <RightColumn>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: '"Instrument Serif", serif',
              fontSize: '0.875rem',
              fontWeight: 400,
              color: '#666',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              mb: 2
            }}
          >
            TODAY
          </Typography>
          <EditableTitle
            variant="standard"
            value={journalTitle}
            onChange={(e) => setJournalTitle(e.target.value)}
            placeholder="Start Journaling"
            fullWidth
            sx={{ mb: 6 }}
          />
          <TextField
            fullWidth
            multiline
            rows={25}
            variant="standard"
            value={entry.content}
            onChange={(e) => setEntry(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Start writing..."
            sx={{ 
              '& .MuiInputBase-root': {
                fontFamily: '"Noto Sans", sans-serif',
                fontSize: '1rem',
                lineHeight: '1.8',
                color: '#333',
                backgroundColor: 'transparent'
              },
              '& .MuiInput-underline:before': {
                borderBottom: 'none'
              },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottom: 'none'
              },
              '& .MuiInput-underline:after': {
                borderBottom: 'none'
              }
            }}
          />
        </RightColumn>
      </Box>
    </>
  );
};

export default JournalPage; 