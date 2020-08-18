import React from "react";
import "./css/Project.css";

class Project extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clicked: false,
		};
		this.changeClicked = this.changeClicked.bind(this);
	}

	changeClicked() {
		this.setState((prevState) => {
			return {
				clicked: !prevState.clicked,
			};
		});
	}

	render() {
		return (
			<div onClick={this.changeClicked}>
				<h2 className="noselect"> {this.props.project.title} </h2>
				{this.state.clicked && (
					<p className="noselect">
						{" "}
						{this.props.project.longDescription}{" "}
					</p>
				)}
			</div>
		);
	}
}

export default Project;
