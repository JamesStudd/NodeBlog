import "./css/Header.scss";
import React from "react";
import P5Test from "./HeaderCanvas/P5Test";
import SuperShapes from "./HeaderCanvas/SuperShapes";
import MouseFollow from "./HeaderCanvas/MouseFollow";

const canvases = [
	<MouseFollow height={500} smallerHeight={300} />,
	<SuperShapes height={500} smallerHeight={300} />,
	<P5Test height={500} smallerHeight={300} />,
];

class Header extends React.Component {
	componentDidMount() {
		this.getNewCanvas = this.getNewCanvas.bind(this);
		this.setState({
			selected: 0,
		});
	}

	getNewCanvas() {
		this.setState((prevState) => {
			return {
				selected: (prevState.selected + 1) % canvases.length,
			};
		});
	}

	render() {
		return (
			<div className="header">
				<div className="changeBtn">
					<button
						type="button"
						className="btn btn-link"
						onClick={this.getNewCanvas}
					>
						Change Canvas
					</button>
				</div>
				<div className="info">
					<h1> James Studd </h1>
					<h2> Portfolio </h2>
				</div>
				<div className="canvasView">
					{this.state && canvases[this.state.selected]}
				</div>
			</div>
		);
	}
}

export default Header;
