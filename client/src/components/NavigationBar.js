import "./css/NavigationBar.scss";
import React from "react";

class NavigationBar extends React.Component {
	render() {
		return (
			<nav className="navbar navbar-expand-sm sticky-top navbar-dark">
				<div
					className="collapse navbar-collapse justify-content-center"
					id="navbarNav"
				>
					<ul className="navbar-nav">
						<li className="nav-item active">
							<a className="nav-link" href="#appTop">
								Home <span className="sr-only">(current)</span>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#projectsView">
								Projects
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#aboutSection">
								About
							</a>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default NavigationBar;
