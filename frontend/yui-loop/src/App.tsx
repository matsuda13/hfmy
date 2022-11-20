import './App.css';
import BulletinBoardPage from './components/BulletinBoardPage';
import {Grid} from '@material-ui/core'

function App() {

  return (
    <div className="App">
      <h1>HFMY</h1>
      <p>YUI LOOP</p>
      <Grid container>
        <Grid item={true} sm={3}>

        </Grid>
        <Grid item={true} sm={6}>
          <BulletinBoardPage/>
        </Grid>
        <Grid item={true} sm={3}>

        </Grid>
      </Grid>
    </div>
  );
}

export default App;
