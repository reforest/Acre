import React, {Component} from 'react';

class Forest extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	render(){
		return (
			<div id='forest' style={this.props.style}>
				<canvas></canvas>
			</div>
		)
	}

}

export default Forest;

