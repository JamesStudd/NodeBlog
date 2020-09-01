import "./css/About.scss";
import React from "react";
import SocialMediaLinks from "./SocialMediaLinks";

class About extends React.Component {
	render() {
		return (
			<div>
				<div
					className="row justify-content-md-center"
					id="aboutSection"
				>
					<div className="col-lg-6 col-md-auto col-sm-auto col-xs-auto">
						<h1> About </h1>
						<hr />
						<h2> Myself </h2>
						<p>
							{" "}
							Hello, I am James Studd. I am a Unity developer by
							trade but I also love to do Node / Fullstack
							development and any language/framework I find
							interesting (Python, Arduino, C++). I have been
							programming since ~2015, starting in University as
							part of a Computer Science course which I completed
							in 2019. I like to create any sort of project, from
							Unity games in game jams, websites (such as this
							one), Arduino contraptions, or the odd random
							project in new languages / frameworks that I want to
							learn.{" "}
						</p>
						<hr />
						<h2> This Website </h2>
						<p>
							{" "}
							Every few months or so I come back to this website,
							redesigning it (usually from scratch) using a
							completely different technology. It started as a
							Jekyll (static site generator) project where I could
							write blog posts and project posts. But, I wanted
							more control over the look and feel, so I redesigned
							it using Pug with an Express back-end. The third
							(and current) iteration is using the same back-end,
							but now using React as the front-end, with a
							ThreeJS/P5.js Canvas as the header.
						</p>
					</div>
				</div>
				<SocialMediaLinks />
			</div>
		);
	}
}

export default About;
