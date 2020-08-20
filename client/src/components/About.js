import "./css/About.scss";
import React from "react";

class About extends React.Component {
	render() {
		return (
			<div className="row justify-content-md-center">
				<div className="col-md-6">
					<h1> {this.props.title} </h1>
					<p> {this.props.description} </p>
				</div>
			</div>
		);
	}
}

About.defaultProps = {
	title: "About",
	description:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel luctus ligula. Praesent felis augue, fermentum commodo varius ut, congue eu neque. Nullam eget justo ipsum. Suspendisse a vehicula nibh, vitae tincidunt nibh. Nulla vitae laoreet odio, non egestas purus. Nullam pulvinar neque et diam viverra pretium. In ut mollis velit, posuere aliquam augue. Pellentesque nulla nulla, ultricies non viverra et, dictum eget justo. Nam nisl risus, interdum ut mauris at, iaculis rhoncus sem. Suspendisse ut iaculis metus. Ut tempor eros quis tortor pharetra ornare. ",
};

export default About;
