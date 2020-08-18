import React from "react";
import axios from "axios";
import Project from "./project";

class Projects extends React.Component {
	componentDidMount() {
		axios.get("/projects/all").then((res) => {
			const data = res.data;
			this.setState(() => {
				return {
					projects: data,
				};
			});
		});
	}

	render() {
		return (
			<div>
				{this.state &&
					this.state.projects.map((project) => (
						<Project key={project.title} project={project} />
					))}
			</div>
		);
	}
}

export default Projects;
