import React from "react";
import "./css/Header.scss";

class Header extends React.Component {
	render() {
		return (
			<div className="header">
				<h1> {this.props.name} </h1>
				<h2> {this.props.title} </h2>
				<p> {this.props.description} </p>
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
