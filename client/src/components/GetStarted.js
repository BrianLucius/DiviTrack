import React from 'react'
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const GetStarted = () => {
  return (
    <Paper
        sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 440,
            justifyContent: 'center',
        }}
    >
        <Typography
          color="inherit"
          variant="h5"
          component="div"
          textAlign={"center"}
        >
        Add Symbols to your portfolio to get started!
        </Typography>
    </Paper>
  )
}

export default GetStarted