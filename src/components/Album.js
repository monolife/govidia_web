import React from 'react';
import AppBar from '@mui/material/AppBar';
import MemoryIcon from '@mui/icons-material/Memory';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Amon Ducao
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Album(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <MemoryIcon  />
          <Typography variant="h6" color="inherit" noWrap>
            GPU Status
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div >
          <Container maxWidth="lg">
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Shows curated output of the nvidia-smi.
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              Rollover GPU name for more info, click to toggle visiblity.
            </Typography>
            <button onClick={ () => window.location.reload(false) }>Refresh All</button>
          </Container>
          <p/>
        </div>
        <Container maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={2}>
            {props.children}
          </Grid>
        </Container>
      </main>
      <footer >
        <p/>
        <p/>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Hey, look at you, reading this text down here. I like your style ;-)
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
