import React from 'react';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Popover from '@material-ui/core/Popover';
import { Radar } from 'react-chartjs-2'; //defaults
import colormap from 'colormap'; // See https://github.com/bpostlethwaite/colormap for maps
import GpuInfoCard from './GpuInfoCard';
import { makeStyles } from '@material-ui/core/styles';

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
const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));


const Computer = (props) => {

  const classes = useStyles();
  let data = {
  	labels: ['GPU %', 'Mem %', 'Temp (C)'],
  	datasets: props.data.infos.map( (d,index) =>{
  		let rObj = {
  			label: d.gpuIndex + " " +d.name,
  			data: [d.utilizationGpu, d.utilizationMemory, d.temperatureGpu],
  			backgroundColor: fills[index+1],
  			borderColor: outlines[index+1],
  		}
  		return rObj
  	})
  }


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [infoElDex, setinfoElDex] = React.useState(0);

  const open = Boolean(anchorEl);

  var hoverhandler = function(event,elements) {
  	console.log(event)
  	setAnchorEl(event.currentTarget);
  	setinfoElDex(elements.datasetIndex);
  }
  const handlePopoverClose = () => {
  	setAnchorEl(null);
  };

  const options = {
	  scale: {
	    ticks: { 
	    	beginAtZero: true,
	    	// suggestedMin: 10,
	    	suggestedMax: 100 
	    },
	  },
	  legend: {
	  	position: 'bottom',
	    onHover: hoverhandler,
	    onLeave: handlePopoverClose,
	  }
	}
	return(
		<>
      <span>"{props.data.hostname}"</span>
      <p/>
      {props.data.infos[0].timestamp}
      <Radar data={data} options={options} />
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <GpuInfoCard info={props.data.infos[infoElDex]}/>
      </Popover>
		</>
	)
}

export default Computer;
