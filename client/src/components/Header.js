import "./css/Header.scss";
import React from "react";
import BlurText from "./reactbits/BlurText";

class Header extends React.Component {
	render() {
		return (
			<div className="header">
				<BlurText
					text="James Studd"
					delay={50}
					animateBy="letters"
					direction="top"
					className="text-2xl mb-8 headerTitle"
				/>

				<BlurText
					text="Portfolio"
					delay={200}
					animateBy="letters"
					direction="top"
					className="text-2xl mb-8 headerDesc"
				/>
			</div>
		
		);
	}
}

export default Header;
