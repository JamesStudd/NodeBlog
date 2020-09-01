import "./css/SocialMediaLinks.scss";
import React from "react";

class SocialMediaLinks extends React.Component {
	render() {
		return (
			<div className="social-media">
				<hr />
				<div className="row justify-content-md-center">
					<a href="mailto:james.studd@live.co.uk">
						<img
							className="social-media-link"
							src={"icons/icon_mail.png"}
							alt="Mail Icon"
						></img>
					</a>
					<a href="https://www.linkedin.com/in/james-studd-793947112/">
						<img
							className="social-media-link"
							src={"icons/icon_linkedin.png"}
							alt="Linked In Icon"
						></img>
					</a>
					<a href="https://steamcommunity.com/id/VoxFen">
						<img
							className="social-media-link"
							src={"icons/icon_steam.png"}
							alt="Steam Icon"
						></img>
					</a>
					<a href="https://www.instagram.com/james.studd/">
						<img
							className="social-media-link"
							src={"icons/icon_instagram.png"}
							alt="Instagram Icon"
						></img>
					</a>
				</div>
				<div className="row justify-content-md-center">
					<p className="credit">
						{" "}
						<a href="http://doc.huseyincakir.org/">
							Icons by Hüseyin Çakır
						</a>{" "}
					</p>
				</div>
			</div>
		);
	}
}

export default SocialMediaLinks;
