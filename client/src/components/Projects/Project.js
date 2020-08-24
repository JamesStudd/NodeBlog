import React from "react";
import "./../css/Project.scss";
import { Parser as HtmlToReactParser } from "html-to-react";

class Project extends React.Component {
	constructor(props) {
		super(props);
		this.parser = new HtmlToReactParser();
	}

	render() {
		return (
			<div className="project">
				<img
					src={this.props.project.image}
					alt={this.props.project.title}
				></img>
			</div>
		);
	}
}

export default Project;
