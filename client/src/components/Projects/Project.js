import React from "react";
import "./../css/Project.scss";

class Project extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hovered: false,
		};
	}

	render() {
		return (
			<div
				className="project"
				onMouseEnter={() =>
					this.setState(() => {
						return { hovered: true };
					})
				}
				onMouseLeave={() =>
					this.setState(() => {
						return { hovered: false };
					})
				}
			>
				<div id="imageContainer">
					<img
						src={this.props.project.image}
						alt={this.props.project.title}
					></img>
				</div>

				<div id="projectInfo">
					<h2> {this.props.project.title} </h2>
					<p> {this.props.project.shortDescription} </p>
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => this.props.select(this.props.project)}
					>
						View Project
					</button>
				</div>
			</div>
		);
	}
}

export default Project;
