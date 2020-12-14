import React from 'react';
import './App.css';
import Computer from './components/Computer';
import Album from './components/Album';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));



function App() {

  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  React.useEffect(() => {
    let serverUrl = process.env.REACT_APP_SERVER_URL + ":" + 
      process.env.REACT_APP_SERVER_PORT;
    fetch(serverUrl,  {
      method: 'GET',
      // mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setItems(data);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          error.message = "Unable to connect to Govidia server"
          setError(error);
        }
      )
  }, [])

  const classes = useStyles();
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <Album>
          {items.map( (d,i) =>{
            return (
              <Grid item className={classes.paper} key={d.hostname}>
                <Paper>
                  <Computer data={d} />
                </Paper>
              </Grid>
            )
          })}
        </Album>
      </div>
    );
  }
}

export default App;
          // <Grid container className={classes.root} spacing={2}>
          //   
          // </Grid>