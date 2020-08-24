import "./../css/Projects.scss";
import React from "react";
import axios from "axios";
import Project from "./Project";

class Projects extends React.Component {
	componentDidMount() {
		this.setState(() => {
			return {
				loading: true,
			};
		});

		axios.get("/projects/all").then((res) => {
			const data = res.data;
			let projects = [];
			let categories = [];
			const priorities = ["high", "medium", "low"];

			// Sort them
			data.sort((a, b) => {
				let aIndex = priorities.indexOf(this.getPrio(a));
				let bIndex = priorities.indexOf(this.getPrio(b));
				return aIndex === bIndex ? a.date >= b.date : aIndex > bIndex;
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
					loading: false,
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
			<div className="container" id="projectsView">
				{this.state && this.state.loading && <p>TODO BETTER LOADING</p>}
				{this.state &&
					this.state.projects &&
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
