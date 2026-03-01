import "./../css/Projects.scss";
import React from "react";
import Project from "./Project";
import HighlightedProject from "./HighlightedProject";

class Projects extends React.Component {
	componentDidMount() {
		this.setState(() => {
			return {
				loading: true,
				projectsPerRow: 1 // default
			};
		});

		this.setSelected = this.setSelected.bind(this);
		this.clearSelected = this.clearSelected.bind(this);
		this.sortProjectsIntoRows = this.sortProjectsIntoRows.bind(this);
		this.updatePredicate = this.updatePredicate.bind(this);

		fetch("/data/projects.json")
			.then(res => res.json())
			.then(data => {
				let projects = [];
				let categories = [];

				// Sort them
				data.sort((a, b) => {
					let aIndex = this.getPrio(a);
					let bIndex = this.getPrio(b);
					if (aIndex === bIndex) {
						return a.date >= b.date ? -1 : 1;
					} else {
						return aIndex > bIndex ? -1 : 1;
					}
				});

				data.forEach((project) => {
					project.categories.forEach((category) => {
						if (categories.indexOf(category) === -1) {
							categories.push(category);
						}
					});
				});

				let projectsPerRow = 1;
				if (window.innerWidth > 575) projectsPerRow = 2;
				if (window.innerWidth > 992) projectsPerRow = 3;

				projects = this.sortProjectsIntoRows(data, projectsPerRow);

				this.setState(() => {
					return {
						originalData: data,
						highlightedProject: null,
						projects,
						categories,
						loading: false,
						projectsPerRow: projectsPerRow
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

		let projectsPerRow = 1;
		if (window.innerWidth > 575) projectsPerRow = 2;
		if (window.innerWidth > 992) projectsPerRow = 3;

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
    let runningIndex = 0; // global index across all projects

    for (let i = 0; i < data.length; i += projectsPerRow) {
        let row = data.slice(i, i + projectsPerRow);
		
        // Assign fadeDelay to each project in the row
        row.forEach((project) => {
            project.fadeDelay = runningIndex * 200; // adjust 200ms as needed
            runningIndex++;
        });

        projects.push(row);
    }
	

    return projects;
}

	setSelected(project) {
		this.setState({
			highlightedProject: project,
		});
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
				{this.state && this.state.loading && <p>Loading...</p>}
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
												fadeDelay={project.fadeDelay}
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
