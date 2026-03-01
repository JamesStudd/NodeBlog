import "./css/Header.scss";
import React from "react";
import BlurText from "./reactbits/BlurText";
import FadeContent from './reactbits/FadeContent'

class Header extends React.Component {
	render() {
		return (
			<div className="header">
				<FadeContent className="icons" blur={true} duration={2000} delay={500} easing="ease-out" initialOpacity={0}>
					<div className="headerIcons">
						<a href="mailto:james.studd[at]live.co.uk?subject=Hello!" className="iconButton" title="Email">
							<img src="/icons/mail.png" alt="Email" />
						</a>
						<a href="https://docs.google.com/document/d/1R_rCErClU-tsclqsES7ij2x9l67OOKUfnsyO57GOwMU/export?format=pdf" className="iconButton" title="Email" download>
							<img src="/icons/downloads.png" alt="Download CV" />
						</a>
						<a href="https://www.linkedin.com/in/james-studd/" className="iconButton" title="LinkedIn" target="_blank" rel="noopener noreferrer">
							<img src="/icons/linkedin.png" alt="LinkedIn" />
						</a>
					</div>
				</FadeContent>


				<BlurText
					text="James Studd"
					delay={50}
					animateBy="letters"
					direction="top"
					className="headerTitle"
				/>
			</div>
		);
	}
}

export default Header;