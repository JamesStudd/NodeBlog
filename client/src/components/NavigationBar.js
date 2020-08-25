import "./css/NavigationBar.scss";
import React from "react";

class NavigationBar extends React.Component {
	render() {
		return (
			<nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
				<div
					class="collapse navbar-collapse justify-content-center"
					id="navbarNav"
				>
					<ul class="navbar-nav">
						<li class="nav-item active">
							<a class="nav-link" href="#appTop">
								Home <span class="sr-only">(current)</span>
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#projectsView">
								Projects
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#aboutSection">
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
