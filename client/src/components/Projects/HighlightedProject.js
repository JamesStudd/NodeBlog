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
			<div id="highlightedProject">
				<div id="closeButton">
					<button
						type="button"
						class="btn btn-danger"
						onClick={this.props.clear}
					>
						X
					</button>
				</div>

				<div id="projectInfo">
					<h2> {this.props.project.title} </h2>
					<p> {this.props.project.shortDescription} </p>
				</div>

				<div id="imageContainer">
					<img
						src={this.props.project.image}
						alt={this.props.project.title}
					></img>
				</div>

				<div id="projectDesc">
					{this.parser.parse(this.props.project.parsedHtml)}
				</div>
			</div>
		);
	}
}

export default HighlightedProject;
