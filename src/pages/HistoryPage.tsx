import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Card, CardContent, CardActionArea, IconButton } from '@mui/material';
import NavBar from '../components/Home/NavBar';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

interface JournalEntry {
  content: string;
  image?: string;
  title?: string;
  mood?: string;
  gratitude?: string;
}

interface JournalDay {
  date: string;
  entries: JournalEntry[];
}

interface GroupedJournals {
  [year: string]: {
    [month: string]: { date: string; entry: JournalEntry }[];
  };
}

function groupByYearMonth(journals: JournalDay[]): GroupedJournals {
  const grouped: GroupedJournals = {};
  journals.forEach((journal) => {
    const [year, month] = journal.date.split('-');
    if (!grouped[year]) grouped[year] = {};
    if (!grouped[year][month]) grouped[year][month] = [];
    journal.entries.forEach((entry) => {
      grouped[year][month].push({ date: journal.date, entry });
    });
  });
  return grouped;
}

const monthNames = [
  '', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const HistoryPage: React.FC = () => {
  const [journals, setJournals] = useState<JournalDay[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('journals') || '[]');
    setJournals(data);
  }, []);

  const grouped = groupByYearMonth(journals);
  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  const handleDeleteEntry = (date: string, entryIdx: number) => {
    let journals = JSON.parse(localStorage.getItem('journals') || '[]');
    const idx = journals.findIndex((j: any) => j.date === date);
    if (idx !== -1) {
      journals[idx].entries.splice(entryIdx, 1);
      // If all entries for the day are deleted, remove the day
      if (journals[idx].entries.length === 0) {
        journals.splice(idx, 1);
      }
      localStorage.setItem('journals', JSON.stringify(journals));
      setJournals([...journals]);
    }
  };

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
      <Container maxWidth="md" sx={{ pt: { xs: 12, md: 16 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 0 }}>
          <Typography
            variant="h1"
            sx={{
              fontFamily: '"Instrument Serif", serif',
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 3,
              letterSpacing: '0.5px',
              color: '#333',
              fontWeight: 400
            }}
          >
            JOURNAL HISTORY
          </Typography>
          <Box sx={{ width: '100%', maxWidth: 700, mt: 4 }}>
            {journals.length === 0 ? (
              <Typography sx={{ color: '#999', fontStyle: 'italic', textAlign: 'center' }}>
                No journal entries yet.
              </Typography>
            ) : (
              years.map(year => (
                <Box key={year} sx={{ mb: 4 }}>
                  <Typography variant="h5" sx={{ color: '#341A00', mb: 2 }}>{year}</Typography>
                  {Object.keys(grouped[year]).sort((a, b) => b.localeCompare(a)).map(month => (
                    <Box key={month} sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ color: '#341A00', mb: 2 }}>{monthNames[parseInt(month, 10)]} {year}</Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {grouped[year][month]
                          .sort((a, b) => b.date.localeCompare(a.date))
                          .map(({ date, entry }, idx) => {
                            const day = date.split('-')[2];
                            const weekDay = new Date(date).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
                            return (
                              <Card key={date + idx} sx={{ borderRadius: 3, boxShadow: '0 2px 12px #eee', p: 0 }}>
                                <CardActionArea onClick={() => navigate('/journal/write', { state: { date, title: entry.title, content: entry.content, mood: entry.mood, gratitude: entry.gratitude, isHistoryView: true } })}>
                                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                    <Box sx={{ minWidth: 60, textAlign: 'center', mr: 2 }}>
                                      <Box sx={{ bgcolor: '#fafafa', borderRadius: 2, p: 1, mb: 1, border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ fontSize: 13, color: '#888', fontWeight: 600, letterSpacing: 1 }}>{weekDay}</Typography>
                                        <Typography sx={{ fontSize: 28, color: '#341A00', fontWeight: 700 }}>{day}</Typography>
                                      </Box>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                      <Typography sx={{ fontSize: 17, color: '#341A00', fontWeight: 500, mb: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {entry.title ? entry.title : (entry.content || <span style={{ color: '#bbb' }}>(No content)</span>)}
                                      </Typography>
                                      {entry.image && (
                                        <Box sx={{ mt: 1 }}>
                                          <img src={entry.image} alt="journal-img" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, border: '1px solid #e9ecef' }} />
                                        </Box>
                                      )}
                                    </Box>
                                    <IconButton onClick={e => { e.stopPropagation(); handleDeleteEntry(date, idx); }} sx={{ ml: 2 }}>
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </CardContent>
                                </CardActionArea>
                              </Card>
                            );
                          })}
                      </Box>
                    </Box>
                  ))}
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HistoryPage; 