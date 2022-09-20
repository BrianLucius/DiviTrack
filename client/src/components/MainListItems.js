import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import LogoutIcon from '@mui/icons-material/Logout';

const MainListItems = (props) => {
  const handleClick = (e, action) => {
    props.onNewClick(e, action);
  }

  return (
  <React.Fragment>
    <ListItemButton onClick={(e) => handleClick(e, "portfolio")}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Portfolio" />
    </ListItemButton>
    <ListItemButton onClick={(e) => handleClick(e, "addSymbol")}>
      <ListItemIcon>
        <AutoGraphIcon />
      </ListItemIcon>
      <ListItemText primary="Add Symbol" />
    </ListItemButton>
    <ListItemButton onClick={(e) => handleClick(e, "logout")}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </React.Fragment>
  );
}

export default MainListItems;