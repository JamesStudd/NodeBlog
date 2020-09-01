import "./../css/Projects.scss";
import React from "react";
import axios from "axios";
import Project from "./Project";
import HighlightedProject from "./HighlightedProject";

class Projects extends React.Component {
	componentDidMount() {
		this.setState(() => {
			return {
				loading: true,
			};
		});

		this.setSelected = this.setSelected.bind(this);
		this.clearSelected = this.clearSelected.bind(this);
		this.sortProjectsIntoRows = this.sortProjectsIntoRows.bind(this);
		this.updatePredicate = this.updatePredicate.bind(this);

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

			let projectsPerRow = window.innerWidth > 992 ? 3 : 2;

			projects = this.sortProjectsIntoRows(data, projectsPerRow);

			this.setState(() => {
				return {
					originalData: data,
					highlightedProject: null,
					projects,
					categories,
					loading: false,
				};
			});

			window.addEventListener("resize", this.updatePredicate);
		});
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updatePredicate);
	}

	updatePredicate() {
		if (!this.state || !this.state.originalData) return;

		let projectsPerRow = window.innerWidth > 992 ? 3 : 2;
		this.setState((prevState) => {
			return {
				projects: this.sortProjectsIntoRows(
					prevState.originalData,
					projectsPerRow
				),
			};
		});
	}

	sortProjectsIntoRows(data, projectsPerRow) {
		let projects = [];
		for (let i = 0; i < data.length; i = i + projectsPerRow) {
			projects.push(
				data.slice(i, Math.min(data.length, i + projectsPerRow))
			);
		}
		return projects;
	}

	setSelected(project) {
		this.setState({
			highlightedProject: project,
		});
		window.scrollTo(0, 300);
	}

	clearSelected() {
		this.setState({
			highlightedProject: null,
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
					this.state.highlightedProject && (
						<HighlightedProject
							project={this.state.highlightedProject}
							clear={this.clearSelected}
						/>
					)}
				{this.state &&
					this.state.projects &&
					this.state.projects.map((projectGroup, index) => {
						return (
							<div
								key={"projectGroup" + index}
								className="row justify-content-md-center rowOfProjects"
							>
								{projectGroup.map((project) => {
									return (
										<div
											className={
												"col-lg-4 col-md-6 col-sm-6 singleProject p-3"
											}
											key={project.title}
										>
											<Project
												project={project}
												select={this.setSelected}
											/>
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

export default Projects;
