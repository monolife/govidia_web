import React from 'react';
import Popover from '@mui/material/Popover';
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

const Computer = (props) => {

  // const classes = useStyles();
  let data = {
  	labels: ['GPU %', 'Mem %', 'Temp (C)'],
  	datasets: props.data.infos.map( (d,index) =>{
  		let rObj = {
  			label: "[" +d.gpu_index+"]" + " " +d.name,
  			data: [d.utilization_gpu, 
          d.utilization_memory, 
          d.temperature_gpu],
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
  	setAnchorEl(event.currentTarget);
  	setinfoElDex(elements.datasetIndex);
  }
  const handlePopoverClose = () => {
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
    }
  };

	return(
		<>
      <span>"{props.data.hostname}"</span>
      <p/>
      {props.data.infos[0].timestamp}
      <Radar data={data} options={options}/>
      <Popover
        id="mouse-over-popover"
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
