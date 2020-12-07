// import logo from './logo.svg';
import './App.css';
import Computer from './components/Computer';
import { data } from './test/info.js';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 300,
    width: 450,
  },
  control: {
    padding: theme.spacing(2),
  }
}));



function App() {

  const classes = useStyles();
  return (
    <div className="App">
      <header className="App-header">
        <Grid container className={classes.root} spacing={2}>
          {data.map( (d,i) =>{
            return (
              <Grid item className={classes.paper} key={d.hostname}>
                <Paper>
                  <Computer data={d} />
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </header>
    </div>
  );
}

export default App;
