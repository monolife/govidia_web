import React from 'react';
import Paper from '@material-ui/core/Paper';

const GpuInfoCard = (props) => {
	
	return(
			<table>
				<tbody>
				  <tr>
				    <td>Gpu Index</td><td>{props.info.gpuIndex}</td>
				  </tr>
				  <tr>
				    <td>Name</td><td>{props.info.name}</td>
				  </tr>
				  <tr>
				    <td>PCI Bus ID</td><td>{props.info.pciBusId}</td>
				  </tr>
				  <tr>
				    <td>Driver</td><td>v{props.info.driverVersion}</td>
				  </tr>
				  <tr>
				    <td>PState</td><td>{props.info.pstate}</td>
				  </tr>
				  <tr>
				    <td>PCIS Link Gen Current</td><td>{props.info.pcieLinkGenCurrent}</td>
				  </tr>
				  <tr>
				    <td>Total Memory (MB)</td><td>{props.info.memoryTotal}</td>
				  </tr>
				</tbody>
			</table>
	)	
}

export default GpuInfoCard