import "./../css/Projects.scss";
import React from "react";
import axios from "axios";
import Project from "./Project";

class Projects extends React.Component {
	componentDidMount() {
		axios.get("/projects/all").then((res) => {
			const data = res.data;
			let projects = [];
			let categories = [];
			const priorities = ["high", "medium", "low"];

			// Sort them
			data.sort((a, b) => {
				let aPrio = this.getPrio(a);
				let bPrio = this.getPrio(b);
				return priorities.indexOf(aPrio) >= priorities.indexOf(bPrio);
			});

			data.forEach((project) => {
				project.categories.forEach((category) => {
					if (categories.indexOf(category) === -1) {
						categories.push(category);
					}
				});
			});

			for (
				let i = 0;
				i < data.length;
				i = i + this.props.maxProjectsInRow
			) {
				projects.push(
					data.slice(
						i,
						Math.min(data.length, i + this.props.maxProjectsInRow)
					)
				);
			}

			this.setState(() => {
				return {
					projects,
					categories,
				};
			});
		});
	}

	getPrio(project) {
		if (typeof project.priority === "object") {
			return project.priority[0];
		} else {
			return project.priority;
		}
	}

	render() {
		return (
			<div className="container">
				{this.state &&
					this.state.projects.map((projectGroup, index) => {
						return (
							<div
								key={"projectGroup" + index}
								className="row justify-content-md-center"
							>
								{projectGroup.map((project) => {
									return (
										<div
											className={
												"col-md-" +
												this.props.columnSize +
												" singleProject p-3"
											}
											key={project.title}
										>
											<Project project={project} />
										</div>
									);
								})}
							</div>
						);
					})}
			</div>
		);
	}
}

Projects.defaultProps = {
	maxProjectsInRow: 3,
	columnSize: 4,
};

export default Projects;
