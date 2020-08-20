import React from "react";
import "./../css/HighlightedProject.scss";
import { Parser as HtmlToReactParser } from "html-to-react";

class HighlightedProject extends React.Component {
	constructor(props) {
		super(props);
		this.parser = new HtmlToReactParser();
	}

	render() {
		return (
			<div id="content">
				<h2> {this.props.project.title} </h2>
				<div>{this.parser.parse(this.props.project.parsedHtml)} </div>
			</div>
		);
	}
}

export default HighlightedProject;
