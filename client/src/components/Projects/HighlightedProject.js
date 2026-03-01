import React from "react";
import "./../css/HighlightedProject.scss";
import { Parser as HtmlToReactParser } from "html-to-react";
import { gsap } from "gsap";

class HighlightedProject extends React.Component {
  constructor(props) {
    super(props);
    this.parser = new HtmlToReactParser();
    this.overlayRef = React.createRef();
    this.popupRef = React.createRef();
    this.handleClose = this.handleClose.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
  }

  componentDidMount() {
    const overlay = this.overlayRef.current;
    const popup = this.popupRef.current;

    gsap.set([overlay, popup], { autoAlpha: 0, y: -20 });
    gsap.to(overlay, { autoAlpha: 1, duration: 0.3, ease: "power2.out" });
    gsap.to(popup, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1 });
  }

  handleClose() {
    const overlay = this.overlayRef.current;
    const popup = this.popupRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        this.props.clear();
      },
    });

    tl.to(popup, { autoAlpha: 0, y: -20, duration: 0.4, ease: "power2.in" }, 0);
    tl.to(overlay, { autoAlpha: 0, duration: 0.3, ease: "power2.in" }, 0);
  }

  handleOverlayClick(e) {
    // Only close if the click was on the overlay, not the popup
    if (e.target === this.overlayRef.current) {
      this.handleClose();
    }
  }

  render() {
    const { project } = this.props;
    if (!project) return null;

    return (
      <div
        ref={this.overlayRef}
        className="highlightedOverlay"
        onClick={this.handleOverlayClick}
      >
        <div
          ref={this.popupRef}
          className="highlightedPopup"
          onClick={(e) => e.stopPropagation()} // prevent clicks inside popup from bubbling
        >
          <div className="closeButton">
            <button type="button" className="btn btn-danger" onClick={this.handleClose}>
              X
            </button>
          </div>

          <div className="popupContent">
            <h2 className="projectTitle">{project.title}</h2>

            <div className="imageContainer">
              <img src={project.image} alt={project.title} />
            </div>

            <div className="projectDesc">
              {this.parser.parse(project.parsedHtml)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HighlightedProject;