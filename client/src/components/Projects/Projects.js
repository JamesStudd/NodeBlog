import "./../css/Projects.scss";
import React from "react";
import axios from "axios";
import Project from "./Project";

class Projects extends React.Component {
	componentDidMount() {
		axios.get("/projects/all").then((res) => {
			const data = res.data;
			let projects = [];

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

			for (let index = 0; index < data.length; index++) {
				const element = data[index];
				console.log(element.image);
			}

			this.setState(() => {
				return {
					projects,
				};
			});
		});
	}

	render() {
		return (
			<div className="container">
				{this.state &&
					this.state.projects.map((projectGroup) => {
						return (
							<div className="row justify-content-md-center">
								{projectGroup.map((project) => {
									return (
										<div
											className={
												"col-md-" +
												this.props.columnSize +
												" singleProject p-3"
											}
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
