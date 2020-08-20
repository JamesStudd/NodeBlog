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
			<div
				onClick={() => {
					this.props.click(this.props.project);
				}}
				className="project"
			>
				<h2 className="noselect"> {this.props.project.title} </h2>
			</div>
		);
	}
}

export default Project;
