import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCreateForm } from '../users/usersSlice';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {

  const dispatch = useDispatch()

  const openForm = () => {
    dispatch(toggleCreateForm())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Users List
          </Typography>
          <Button id="create_user_btn" color="inherit" onClick={openForm}>Create User</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
