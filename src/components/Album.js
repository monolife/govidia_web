import React from 'react';
import AppBar from '@mui/material/AppBar';
import MemoryIcon from '@mui/icons-material/Memory';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import { makeStyles } from '@mui/material/styles';
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
  // const classes = useStyles();

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
          <Container maxWidth="sm">
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Shows curated output of the nvidia-smi from connected computers.
              Rollover GPU for more info, click to hide in graph.
            </Typography>
          </Container>
        </div>
        <Container maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={2}>
            {props.children}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer >
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
