import "./css/Header.scss";
import React from "react";
import HeaderCanvas from "./HeaderCanvas/HeaderCubeCanvas";
import P5Test from "./HeaderCanvas/P5Test";
import SuperShapes from "./HeaderCanvas/SuperShapes";

const canvases = [
	<HeaderCanvas />,
	<P5Test height={500} />,
	<SuperShapes height={500} />,
];

class Header extends React.Component {
	componentDidMount() {
		this.getNewCanvas = this.getNewCanvas.bind(this);
		this.randomNumber = this.randomNumber.bind(this);
		this.setState({
			selected: this.randomNumber(),
		});
	}

	getNewCanvas() {
		let newIndex = this.randomNumber();
		while (newIndex === this.state.selected) {
			newIndex = this.randomNumber();
		}
		this.setState({ selected: newIndex });
	}

	randomNumber() {
		return Math.floor(Math.random() * canvases.length);
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
				{this.state && canvases[this.state.selected]}
			</div>
		);
	}
}

export default Header;
