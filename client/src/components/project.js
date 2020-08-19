import React from "react";
import "./css/Project.scss";
import { Parser as HtmlToReactParser } from "html-to-react";

class Project extends React.Component {
	constructor(props) {
		super(props);
		this.parser = new HtmlToReactParser();
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
						{this.parser.parse(this.props.project.parsedHtml)}{" "}
					</p>
				)}
			</div>
		);
	}
}

export default Project;
