import "./css/About.scss";
import React from "react";

class About extends React.Component {
	render() {
		return (
			<div className="row justify-content-md-center" id="aboutSection">
				<div className="col-lg-6 col-md-auto col-sm-auto col-xs-auto">
					<h1> About </h1>
					<hr />
					<h2> Myself </h2>
					<p>
						{" "}
						Hello, I am James Studd. I am a Unity developer
						primarily, with Node/JS following closely by as a hobby
						as well as various other languages whenever I can. I
						have been programming since around 2015, starting in
						University as part of a Computer Science course which I
						completed with a First Class Honors in 2019. I like to
						create any sort of project, from Unity games in game
						jams, to websites (such as this one), Arduino
						contraptions, or just mess around with new languages /
						frameworks that I find interesting.{" "}
					</p>
					<hr />
					<h2> This Website </h2>
					<p>
						{" "}
						Every few months or so I come back to this website,
						redesigning it (usually from scratch) using a completely
						different technology. It started as a Jekyll (static
						site generator) project where I could write blog posts
						and project posts. But, I wanted more control over the
						look and feel, so I redesigned it using Pug with an
						Express back-end. The third (and current) iteration is
						using the same back-end, but now using React as the
						front-end, with a ThreeJS/P5.js Canvas as the header.
					</p>
				</div>
			</div>
		);
	}
}

export default About;
