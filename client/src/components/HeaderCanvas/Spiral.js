import React from "react";
import Sketch from "react-p5";

export default (props) => {
	let height = props.height;
	let smallerHeight = props.smallerHeight;
	let currentHeight;

	let piStep = Math.PI / 100;
	let points = 100;
	let limit = Math.PI * 10;
	let dir = 1;
	let currPi = 0;

	const setup = (p5, canvasParentRef) => {
		let rect = canvasParentRef.getBoundingClientRect();

		currentHeight = height;

		p5.createCanvas(rect.width, currentHeight).parent(canvasParentRef);
	};

	const draw = (p5) => {
		p5.background(0);
		p5.noFill();

		p5.stroke(255, 0, 0);
		p5.strokeWeight(2);

		p5.translate(window.innerWidth / 2, currentHeight / 2);

		currPi += piStep * dir;
		if (currPi >= limit || currPi < 0) {
			dir *= -1;
		}

		let inc = (Math.PI * 2) / points;
		let size = 10;

		// prettier-ignore
		drawShape(p5, "rgba(255, 0, 0, 0.5)", inc, size, (num) => Math.sin(num));
		// prettier-ignore
		drawShape(p5, "rgba(0, 255, 0, 0.5)", inc, size, (num) => Math.cos(num));
		// prettier-ignore
		drawShape(p5, "rgba(0, 0, 255, 0.5)", inc, size, (num) => -1 * Math.sin(num));
		// prettier-ignore
		drawShape(p5, "rgba(255, 255, 0, 0.5)", inc, size, (num) => -1 * Math.cos(num));

		// p5.stroke("rgb(255, 0, 255)");
		// currSinWave++;
		// p5.beginShape();
		// for (let i = 0; i < Math.PI * 12; i += inc) {
		// 	let y = 75 * Math.sin(i);
		// 	p5.vertex(currSinWave, y);
		// }
		// p5.endShape();
	};

	const drawShape = (p5, color, inc, size, method) => {
		p5.stroke(color);
		p5.beginShape();
		for (let i = 0; i <= currPi; i += inc) {
			let r = i * method(i);
			let x = size * Math.cos(i) * r;
			let y = size * Math.sin(i) * r;
			p5.vertex(x, y);
		}
		p5.endShape();
	};

	const windowResized = (p5) => {
		let width = window.innerWidth;
		currentHeight = height;
		if (width < 550) {
			currentHeight = smallerHeight;
		}
		p5.resizeCanvas(window.innerWidth, currentHeight);
	};

	const mouseClicked = (p5) => {};

	return (
		<Sketch
			setup={setup}
			draw={draw}
			windowResized={windowResized}
			mouseClicked={mouseClicked}
		/>
	);
};
