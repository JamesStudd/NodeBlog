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
			<div>
				<h2 className="noselect"> {this.props.project.title} </h2>
				<div className="noselect">
					{this.parser.parse(this.props.project.parsedHtml)}{" "}
				</div>
			</div>
		);
	}
}

export default Project;
