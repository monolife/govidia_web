import React from 'react';
import Popper from '@mui/material/Popper';
import ReplayIcon from '@mui/icons-material/Replay';
import IconButton from '@mui/material/IconButton';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2'; //defaults
import colormap from 'colormap'; // See https://github.com/bpostlethwaite/colormap for maps
import GpuInfoCard from './GpuInfoCard';

const fills = colormap({
    colormap: 'portland',
    nshades: 6, //color maps require at least 6
    format: 'rgbaString',
    alpha: 0.3
});
const outlines = colormap({
    colormap: 'portland',
    nshades: 6, //color maps require at least 6
    format: 'rgbaString',
    alpha: 1
});
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const refreshTimeMs=15*1000

const Computer = (props) => {

  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [item, setItem] = React.useState({});

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [infoElDex, setinfoElDex] = React.useState(0);

  const load = () => {
    setIsLoaded(false);
    let uri = window.location.href.split(":")
    let serverUrl = uri[0]+ ":"+uri[1] + ":" + 
      process.env.REACT_APP_SERVER_PORT + "/query/" + props.data;
    fetch(serverUrl,  {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setItem(data);
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
  }

  React.useEffect(() => {
      load()
    }, 
  []) // eslint-disable-line react-hooks/exhaustive-deps

  const open = Boolean(anchorEl);

  var hoverhandler = function(event,legendItem, legend) {
  	setAnchorEl(event.native.toElement);
  	setinfoElDex(legendItem.datasetIndex);
  }
  const handlePopperClose = () => {
  	setAnchorEl(null);
  };

  var options = {
    scales: {
        r: {
            angleLines: {
                display: true
            },
            suggestedMin: 60,
            suggestedMax: 100
        }
    },
    plugins: {
      legend: {
         position: 'bottom',
         onHover: hoverhandler,
         onLeave: handlePopperClose,
      }
    }
  };

  let content = <div/>
  if (error ) {
    content = <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    content = <div>Loading...</div>;
  } else if(Object.keys(item).length === 0){
      content = (
        <>
          <div> Couldn't Load GPU info for {props.data} </div>
          <div> Sorry :-( </div>
        </>
      )
  } else {
    let data = {
      labels: ['GPU %', 'Mem %', 'Temp (C)'],
      datasets: item.infos.map( (d,index) =>{
        let rObj = {
          label: "[" +d.gpu_index+"] " +d.name,
          data: [d.utilization_gpu, 
            d.utilization_memory, 
            d.temperature_gpu],
          backgroundColor: fills[index+1],
          borderColor: outlines[index+1],
        }
        return rObj
      })
    }
  	content = (
  		<>
        <span>"{item.hostname}" 
        </span>
        <p/>
        {item.infos.timestamp}
        <Radar data={data} options={options}/>
        <Popper
          id="mouse-over-Popper"
          open={open}
          anchorEl={anchorEl}
          placement="bottom"
          onClose={handlePopperClose}
        >
          <GpuInfoCard info={item.infos[infoElDex]}/>
        </Popper>
  		</>
  	);
  }

  return(
    <>
      <IconButton aria-label="delete" onClick={load}>
        <ReplayIcon />
      </IconButton>
      {content}
    </>
  )
}

export default Computer;
