import React from 'react';
// import Paper from '@material-ui/core/Paper';

const GpuInfoCard = (props) => {
	
	return(
			<table>
				<tbody>
				  <tr>
				    <td>Gpu Index</td><td>{props.info.gpu_index}</td>
				  </tr>
				  <tr>
				    <td>Name</td><td>{props.info.name}</td>
				  </tr>
				  <tr>
				    <td>PCI Bus ID</td><td>{props.info.pci_bus_id}</td>
				  </tr>
				  <tr>
				    <td>Driver</td><td>v{props.info.driver_version}</td>
				  </tr>
				  <tr>
				    <td>PState</td><td>{props.info.pstate}</td>
				  </tr>
				  <tr>
				    <td>PCIS Link Gen Current</td><td>{props.info.pcie_link_gen_current}</td>
				  </tr>
				  <tr>
				    <td>Total Memory (MB)</td><td>{props.info.memory_total}</td>
				  </tr>
				</tbody>
			</table>
	)	
}

export default GpuInfoCard