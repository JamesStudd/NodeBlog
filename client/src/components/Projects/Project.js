import React from "react";
import "./../css/Project.scss";

class Project extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addedClass: false,
		};
	}

	render() {
		const proj = this.props.project;
		return (
			<div
				className="project"
				onClick={() => this.props.select(this.props.project)}
				onMouseOver={() => {
					if (!this.state.addedClass) {
						this.setState({
							addedClass: true,
						});
					}
				}}
			>
				<div
					id="imageContainer"
					style={{ backgroundImage: `url(${proj.image})` }}
				>
					<div
						className={
							this.state.addedClass
								? "innerContent innerContent-anim"
								: "innerContent"
						}
					>
						<h2> {this.props.project.title} </h2>
						<p> {this.props.project.shortDescription} </p>

						<button
							type="button"
							className="btn btn-primary"
							onClick={() =>
								this.props.select(this.props.project)
							}
						>
							View Project
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Project;
