import React, { useState } from 'react';
import { Box, Typography, IconButton, Menu, MenuItem } from '@mui/material';

const menuItems = [
  'LOG IN',
  'SETTINGS',
  'CALENDER',
];

const NavBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <Box sx={{ width: '100vw', bgcolor: '#FFFDFB', position: 'fixed', top: 0, left: 0, zIndex: 1200 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: '48px', pt: '12px', pb: '12px', maxWidth: 1400, mx: 'auto' }}>
        <Typography sx={{ fontFamily: 'Instrument Serif, serif', fontWeight: 400, fontSize: '32px', color: '#341A00' }}>
          RhythmWrite
        </Typography>
        <Box>
          <IconButton
            onClick={e => setAnchorEl(e.currentTarget)}
            sx={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 0 }}
          >
            <Box sx={{ width: 24, height: 2, bgcolor: '#341A00', mb: 0.7, borderRadius: 1 }} />
            <Box sx={{ width: 24, height: 2, bgcolor: '#341A00', mb: 0.7, borderRadius: 1 }} />
            <Box sx={{ width: 24, height: 2, bgcolor: '#341A00', borderRadius: 1 }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 200,
                bgcolor: '#FFFDFB',
                color: '#341A00',
                fontFamily: 'Instrument Sans, sans-serif',
                borderRadius: 0,
                border: '1px solid #341A00',
                boxShadow: 'none',
                p: 0,
              },
            }}
            MenuListProps={{ sx: { p: 0 } }}
          >
            {menuItems.map(item => (
              <MenuItem
                key={item}
                sx={{
                  fontFamily: 'Instrument Sans, sans-serif',
                  fontSize: 18,
                  color: '#341A00',
                  height: 48,
                  borderBottom: '1px solid #B7AFA3',
                  '&:last-child': { borderBottom: 'none' },
                  '&:hover': { bgcolor: '#F5E9DD' },
                }}
                onClick={() => setAnchorEl(null)}
              >
                {item}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
      {/* 全宽分割线 */}
      <Box sx={{ width: '100vw', position: 'relative', left: '50%', right: '50%', ml: '-50vw', mr: '-50vw', height: '1.5px', bgcolor: '#341A00' }} />
    </Box>
  );
};

export default NavBar; 