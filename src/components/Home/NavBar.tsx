import React, { useState } from 'react';
import { Box, Typography, IconButton, Menu, MenuItem, Avatar, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@mui/material';

interface NavBarProps {
  rightContent?: React.ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ rightContent }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleMenuClick = (item: string) => {
    setAnchorEl(null);
    
    switch (item) {
      case 'LOG IN':
        navigate('/login');
        break;
      case 'SETTINGS':
        navigate('/profile');
        break;
      case 'HISTORY':
        navigate('/history');
        break;
      case 'LOGOUT':
        logout();
        navigate('/');
        break;
      default:
        break;
    }
  };

  const menuItems = isAuthenticated 
    ? ['SETTINGS', 'HISTORY', 'LOGOUT']
    : ['LOG IN', 'SETTINGS', 'HISTORY'];

  const userInitials = user ? user.name.charAt(0).toUpperCase() : '';

  return (
    <Box sx={{ width: '100vw', bgcolor: '#FFFDFB', position: 'fixed', top: 0, left: 0, zIndex: 1200 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: '48px', pt: '12px', pb: '12px', maxWidth: 1400, mx: 'auto' }}>
        <Box
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer', userSelect: 'none' }}
        >
          <Typography sx={{ fontFamily: 'Instrument Serif, serif', fontWeight: 400, fontSize: '32px', color: '#341A00' }}>
            RhythmWrite
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {rightContent}
          
          {/* User avatar (if logged in) */}
          {isAuthenticated && user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2 }}>
              <Box sx={{ width: 40, height: 40, bgcolor: '#341A00', color: '#FFFDFB', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 18, fontFamily: 'Instrument Sans, sans-serif' }}>
                {userInitials}
              </Box>
            </Box>
          )}
          
          <IconButton
            onClick={e => setAnchorEl(e.currentTarget)}
            sx={{ width: 32, height: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 0, gap: 0.5 }}
          >
            <Box sx={{ width: 24, height: 2, bgcolor: '#341A00', borderRadius: 1 }} />
            <Box sx={{ width: 24, height: 2, bgcolor: '#341A00', borderRadius: 1 }} />
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
            {/* User info display (if logged in) */}
            {isAuthenticated && user && (
              <>
                <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #B7AFA3' }}>
                  <Typography
                    sx={{
                      fontFamily: 'Instrument Sans, sans-serif',
                      fontSize: '0.9rem',
                      color: '#666',
                      mb: 0.5
                    }}
                  >
                    SIGNED IN AS
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Instrument Sans, sans-serif',
                      fontSize: '1rem',
                      color: '#341A00',
                      fontWeight: 600
                    }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Instrument Sans, sans-serif',
                      fontSize: '0.8rem',
                      color: '#666'
                    }}
                  >
                    {user.email}
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: '#B7AFA3' }} />
              </>
            )}
            
            {menuItems.map((item, index) => (
              <MenuItem
                key={item}
                sx={{
                  fontFamily: 'Instrument Sans, sans-serif',
                  fontSize: 18,
                  color: item === 'LOGOUT' ? '#d32f2f' : '#341A00',
                  height: 48,
                  borderBottom: index < menuItems.length - 1 ? '1px solid #B7AFA3' : 'none',
                  '&:hover': { 
                    bgcolor: item === 'LOGOUT' ? '#ffebee' : '#F5E9DD' 
                  },
                }}
                onClick={() => handleMenuClick(item)}
              >
                {item === 'LOGOUT' ? 'SIGN OUT' : 
                 item === 'LOG IN' ? 'SIGN IN' :
                 item === 'SETTINGS' ? 'SETTINGS' :
                 item === 'HISTORY' ? 'HISTORY' : item}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
      {/* Full-width divider */}
      <Box sx={{ width: '100vw', position: 'relative', left: '50%', right: '50%', ml: '-50vw', mr: '-50vw', height: '1.5px', bgcolor: '#341A00' }} />
    </Box>
  );
};

export default NavBar; 