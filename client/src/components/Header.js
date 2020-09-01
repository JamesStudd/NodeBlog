import "./css/Header.scss";
import React from "react";
import HeaderCanvas from "./HeaderCanvas/HeaderCubeCanvas";
import P5Test from "./HeaderCanvas/P5Test";

class Header extends React.Component {
	render() {
		return (
			<div className="header">
				<div className="info">
					<h1> {this.props.name} </h1>
					<h2> {this.props.title} </h2>
				</div>
				{/* <HeaderCanvas/> */}
				<P5Test height={500} />
			</div>
		);
	}
}

Header.defaultProps = {
	name: "James Studd",
	title: "Portfolio",
	description: "Maker of things and hunter of elk.",
};

export default Header;
