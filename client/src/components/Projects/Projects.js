import "./../css/Projects.scss";
import React from "react";
import axios from "axios";
import Project from "./Project";
import HighlightedProject from "./HighlightedProject";

class Projects extends React.Component {
	componentDidMount() {
		axios.get("/projects/all").then((res) => {
			const data = res.data;
			this.setState(() => {
				return {
					projects: data,
					selected: data[0],
				};
			});
		});
	}

	changeHighlighted = (project) => {
		this.setState(() => {
			return {
				selected: project,
			};
		});
	};

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						{this.state &&
							this.state.projects.map((project) => (
								<Project
									key={project.title}
									project={project}
									click={this.changeHighlighted}
								/>
							))}
					</div>
					<div className="col-md-6">
						{this.state && this.state.selected && (
							<HighlightedProject project={this.state.selected} />
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default Projects;
