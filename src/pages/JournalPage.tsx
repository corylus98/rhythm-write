import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button
} from '@mui/material';
import NavBar from '../components/Home/NavBar';
import MoodCheckinStep from '../components/Journal/MoodCheckinStep';
import GratitudeStep from '../components/Journal/GratitudeStep';
import TimeGoalStep from '../components/Journal/TimeGoalStep';
import PlaylistStep from '../components/Journal/PlaylistStep';
import { useNavigate } from 'react-router-dom';
import { SpotifyService } from '../services/SpotifyService';

// Define allowed mood types
const moodTypes = ['😊', '🙂', '😐', '🙁', '☹️'] as const;
type MoodType = typeof moodTypes[number];

interface PlaylistTrack {
  title: string;
  artist: string;
  duration: number;
  uri: string;
}

const PrecheckPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState<MoodType | "">("");
  const [gratitude, setGratitude] = useState('');
  const [timeGoal, setTimeGoal] = useState<number | "">("");
  const [playlist, setPlaylist] = useState<PlaylistTrack[]>([]);
  const [isLoadingPlaylist, setIsLoadingPlaylist] = useState(false);
  const navigate = useNavigate();

  // Generate playlist based on mood and time goal
  const generatePlaylist = async () => {
    if (!mood || !timeGoal) return;
    
    setIsLoadingPlaylist(true);
    try {
      const tracks = await SpotifyService.searchTracksByMood(mood as MoodType, Number(timeGoal));
      setPlaylist(tracks);
    } catch (error) {
      console.error('Error generating playlist:', error);
      // Use fallback mock data if API fails
      setPlaylist(getMockPlaylist(mood as MoodType, Number(timeGoal)));
    } finally {
      setIsLoadingPlaylist(false);
    }
  };

  // Fallback mock playlist (keeping the original logic as backup)
  const getMockPlaylist = (mood: MoodType, targetDuration: number): PlaylistTrack[] => {
    const mockPlaylists: Record<string, PlaylistTrack[]> = {
      '😊': [
        { title: 'Good as Hell', artist: 'Lizzo', duration: 3, uri: 'spotify:track:1TC5jKJhL9Y6fVSG0OoBBS' },
        { title: 'Happy', artist: 'Pharrell Williams', duration: 4, uri: 'spotify:track:60nZcImufyMA1MKQY3dcCH' },
        { title: 'Good Vibes', artist: 'Chris Janson', duration: 3, uri: 'spotify:track:0BKmvVnaaDODXoNt8E0TJg' },
        { title: 'Walking on Sunshine', artist: 'Katrina and the Waves', duration: 4, uri: 'spotify:track:05wIrZSwuaVWhcv5FfqeH0' },
      ],
      '🙂': [
        { title: 'Chill Bill', artist: 'Rob $tone', duration: 4, uri: 'spotify:track:0zEFOOAiO6tFrKn0pT3CpS' },
        { title: 'Easy', artist: 'Mac Miller', duration: 5, uri: 'spotify:track:4VkC6xTK8SzN2YxE4qKTRG' },
        { title: 'Smooth', artist: 'Santana ft. Rob Thomas', duration: 5, uri: 'spotify:track:6Adj8uh4X4hOAdOG5J6chU' },
        { title: 'Sunday Morning', artist: 'Maroon 5', duration: 4, uri: 'spotify:track:3tOmVEOOJWqEhKAWJoPEJ6' },
      ],
      '😐': [
        { title: 'Focus', artist: 'Ariana Grande', duration: 4, uri: 'spotify:track:6lYLLGO7ISqbIfBhEbgT0B' },
        { title: 'Weightless', artist: 'Marconi Union', duration: 8, uri: 'spotify:track:7L6O8GMC1A5NaDIGEz8iBK' },
        { title: 'Study Music', artist: 'Brain.fm', duration: 5, uri: 'spotify:track:1g7d8w62H6EECqnnyuwq0x' },
        { title: 'Ambient 1', artist: 'Brian Eno', duration: 6, uri: 'spotify:track:7GrLa6fPBTuQCAtCoHfh6h' },
      ],
      '🙁': [
        { title: 'Mad World', artist: 'Gary Jules', duration: 4, uri: 'spotify:track:3JOVTQ5h8HGFnDdp4VT3MP' },
        { title: 'Hurt', artist: 'Johnny Cash', duration: 5, uri: 'spotify:track:4gMWNWbSX2A2Tx1NMr5nM1' },
        { title: 'Black', artist: 'Pearl Jam', duration: 6, uri: 'spotify:track:1Yk0cQdMLx5FpvJOaOOa-W' },
        { title: 'Snuff', artist: 'Slipknot', duration: 5, uri: 'spotify:track:2Z2O7d3XkZS9TG0bdsGh8A' },
      ],
      '☹️': [
        { title: 'Hurt', artist: 'Nine Inch Nails', duration: 6, uri: 'spotify:track:4PRGxHpCPp4xp3YUrkvzGz' },
        { title: 'Mad World', artist: 'Tears for Fears', duration: 4, uri: 'spotify:track:2UwJSrLO5y3ksIU5LWQ4dS' },
        { title: 'Skinny Love', artist: 'Bon Iver', duration: 4, uri: 'spotify:track:7G7gI0LGYY8FW3fvJ9B0rw' },
        { title: 'The Sound of Silence', artist: 'Disturbed', duration: 4, uri: 'spotify:track:0b3dCkMphBSWahcZd3oDYJ' },
      ]
    };

    const baseTracks = mockPlaylists[mood] || mockPlaylists['😐'];
    const result: PlaylistTrack[] = [];
    let currentDuration = 0;

    while (currentDuration < targetDuration) {
      for (const track of baseTracks) {
        if (currentDuration >= targetDuration) break;
        result.push({ ...track });
        currentDuration += track.duration;
      }
    }

    return result;
  };

  // Navigate to journal write page with playlist data
  const startJournaling = () => {
    navigate('/journal/write', { 
      state: { 
        mood, 
        gratitude, 
        timeGoal, 
        playlist 
      } 
    });
  };

  // Auto-generate playlist when both mood and time are set
  React.useEffect(() => {
    if (mood && timeGoal && step === 3) {
      generatePlaylist();
    }
  }, [mood, timeGoal, step]);

  const handleMoodChange = (mood: string) => setMood(mood as MoodType);
  
  const steps = [
    <MoodCheckinStep key="mood" value={mood} onChange={handleMoodChange} onNext={() => mood && setStep(1)} onBack={step > 0 ? () => setStep(step - 1) : undefined} />, 
    <GratitudeStep key="gratitude" value={gratitude} onChange={setGratitude} onNext={() => setStep(2)} onBack={() => setStep(0)} />, 
    <TimeGoalStep key="time" value={timeGoal} onChange={setTimeGoal} onNext={() => timeGoal && setStep(3)} onBack={() => setStep(1)} />,
    <PlaylistStep
      key="playlist"
      playlist={playlist}
      isLoading={isLoadingPlaylist}
      onBack={() => setStep(2)}
      onStartJournaling={startJournaling}
    />
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFDFB', m: 0, p: 0, boxSizing: 'border-box', overflow: 'hidden' }}>
      <NavBar />
      
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

      {/* Content area between the two vertical lines */}
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
            mt: { xs: 10, md: 12 }
          }}
        >
          {steps[step]}
        </Box>
      </Box>
    </Box>
  );
};

export default PrecheckPage; 