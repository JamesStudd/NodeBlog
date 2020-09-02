import React from "react";
import "./../css/Project.scss";

class Project extends React.Component {
	constructor(props) {
		super(props);
		this.getClassName = this.getClassName.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.isTouchDevice = this.isTouchDevice.bind(this);
		this.mobileSelectorRef = React.createRef();
		this.state = {
			addedClass: false,
			mobileSelected: false,
		};
	}

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
	}

	isTouchDevice() {
		return !!(
			("ontouchstart" in window || navigator.maxTouchPoints) // works on most browsers
		); // works on IE10/11 and Surface
	}

	/**
	 * Alert if clicked on outside of element
	 */
	handleClickOutside(event) {
		if (
			this.mobileSelectorRef &&
			!this.mobileSelectorRef.current.contains(event.target) &&
			this.state.mobileSelected
		) {
			this.setState({ mobileSelected: false });
		}
	}

	getClassName() {
		let ret = "innerContent";
		if (this.state.addedClass) ret += " innerContent-anim";
		if (this.state.mobileSelected && this.isTouchDevice())
			ret += " mobileSelected";
		return ret;
	}

	render() {
		const proj = this.props.project;
		return (
			<div
				className="project"
				onClick={() => {
					if (window.innerWidth < 575 && this.isTouchDevice()) {
						this.setState({ mobileSelected: true });
					} else {
						this.props.select(proj, this.props.projRef);
					}
				}}
				onMouseOver={() => {
					if (!this.state.addedClass) {
						this.setState({
							addedClass: true,
						});
					}
				}}
			>
				<div
					id="imageContainer"
					style={{ backgroundImage: `url(${proj.image})` }}
				>
					<div
						ref={this.mobileSelectorRef}
						className={this.getClassName()}
					>
						<h2> {this.props.project.title} </h2>
						<p> {this.props.project.shortDescription} </p>

						<button
							type="button"
							className="btn btn-primary"
							onClick={() => {
								if (
									!this.isTouchDevice() ||
									(this.isTouchDevice() &&
										this.state.mobileSelected)
								) {
									this.props.select(this.props.project);
								}
							}}
						>
							View Project
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Project;
