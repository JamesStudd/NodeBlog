import React from "react";
import Sketch from "react-p5";

class Circle {
	constructor(x, y, speed, p5) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.p5 = p5;
		this.direction = 1;

		let size = (speed / 10) * 50;
		this.width = size;
		this.height = size;

		this.color = [255, 255, 255];
	}

	Draw() {
		this.p5.ellipse(this.x, this.y, this.width, this.height);
	}

	Move() {
		this.x += this.speed * this.direction;
		if (this.x >= window.innerWidth || this.x <= 0) this.direction *= -1;
	}
}

export default (props) => {
	let height = props.height;
	let smallerHeight = props.smallerHeight;
	let currentHeight;
	let circleColor = [255, 255, 255];

	let circles = [];

	const setup = (p5, canvasParentRef) => {
		let rect = canvasParentRef.getBoundingClientRect();

		currentHeight = height;
		if (rect.width < 550) currentHeight = smallerHeight;

		p5.createCanvas(rect.width, currentHeight).parent(canvasParentRef);

		for (let index = 0; index < 60; index++) {
			circles.push(
				new Circle(
					0,
					25 + Math.random() * (height - 25),
					Math.random() * 10,
					p5
				)
			);
		}

		mouseClicked();
	};

	const draw = (p5) => {
		p5.background(0);
		p5.fill(circleColor);

		circles.forEach((circle) => {
			circle.Draw();
		});

		circles.forEach((circle) => {
			circle.Move();
		});
	};

	const windowResized = (p5) => {
		let width = window.innerWidth;
		currentHeight = height;
		if (width < 550) currentHeight = smallerHeight;
		p5.resizeCanvas(window.innerWidth, currentHeight);
	};

	const mouseClicked = (p5) => {
		circleColor = [
			Math.random() * 255,
			Math.random() * 255,
			Math.random() * 255,
		];
	};

	return (
		<Sketch
			setup={setup}
			draw={draw}
			windowResized={windowResized}
			mouseClicked={mouseClicked}
		/>
	);
};
